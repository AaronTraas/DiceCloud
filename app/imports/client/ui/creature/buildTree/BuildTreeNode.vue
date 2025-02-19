<template lang="html">
  <v-sheet
    class="tree-node"
    :class="{
      'empty': !hasChildren,
    }"
    :data-id="`tree-node-${node._id}`"
  >
    <div
      class="layout align-center justify-start tree-node-title"
      style="cursor: pointer;"
      @click.stop="$emit('selected', node._id)"
    >
      <v-btn
        small
        icon
        class="expand-button"
        :class="{
          'rotate-90': showExpanded,
          'accent--text': node._descendantCanFill || canFillWithMany
        }"
        :disabled="!canExpand"
        @click.stop="expanded = !expanded"
      >
        <v-icon v-if="canExpand">
          mdi-chevron-right
        </v-icon>
      </v-btn>
      <div
        class="layout align-center justify-start pr-1"
      >
        <!--{{node && node.order}}-->
        <div
          v-if="isSlot"
          class="text-truncate"
        >
          <span
            :class="{
              'text--secondary': !canFill,
              'accent--text': canFill,
            }"
          >
            {{ node.name }}
          </span>
          <fill-slot-button
            v-if="(node.quantityExpected && node.quantityExpected.value === 1) && node.spaceLeft === 1"
            :model="node"
          />
        </div>
        <template
          v-else
        >
          <tree-node-view
            :model="node"
          />
          <v-spacer />
          <v-btn
            v-if="node.parent.id === parentSlotId"
            icon
            :disabled="context.editPermission === false"
            @click.stop="remove(node)"
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
        <template v-if="condenseChild">
          <span class="mr-4">:</span>
          <tree-node-view
            :model="children[0].node"
          />
          <v-spacer />
          <v-btn
            icon
            :disabled="context.editPermission === false"
            @click.stop="remove(children[0].node)"
          >
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </template>
      </div>
    </div>
    <v-expand-transition>
      <div
        v-show="showExpanded"
        class="ml-3 expand-area"
      >
        <v-fade-transition hide-on-leave>
          <build-tree-node-list
            v-if="showExpanded"
            :children="computedChildren"
            :parent-slot-id="computedSlotId"
            @selected="e => $emit('selected', e)"
          />
          <div v-else>
            <div
              v-for="i in computedChildren.length"
              :key="i"
              class="dummy-node"
            />
          </div>
        </v-fade-transition>
        <div
          v-if="canFillWithMany"
        >
          <fill-slot-button
            class="ml-5"
            :model="node"
          />
        </div>
      </div>
    </v-expand-transition>
  </v-sheet>
</template>

<script lang="js">
/**
* TreeNode's are list item views of character properties. Every property which
* can belong to the character is shown in the tree view of the character
* the tree view shows off the full character structure, and where each part of
* character comes from.
**/
import TreeNodeView from '/imports/client/ui/properties/treeNodeViews/TreeNodeView.vue';
import FillSlotButton from '/imports/client/ui/creature/buildTree/FillSlotButton.vue';
import { some } from 'lodash';
import { snackbar } from '/imports/client/ui/components/snackbars/SnackbarQueue.js';
import softRemoveProperty from '/imports/api/creature/creatureProperties/methods/softRemoveProperty.js';
import restoreProperty from '/imports/api/creature/creatureProperties/methods/restoreProperty.js';
import getPropertyTitle from '/imports/client/ui/properties/shared/getPropertyTitle.js';

export default {
  name: 'BuildTreeNode',
  components: {
    TreeNodeView,
    FillSlotButton,
  },
  inject: {
    context: { default: {} }
  },
  props: {
    node: {
      type: Object,
      required: true,
    },
    children: {
      type: Array,
      default: () => [],
    },
    parentSlotId: {
      type: String,
      default: undefined,
    },
  },
  data(){return {
    expanded: false,
    /* expand if there's a slot needing attention:
      this.node._descendantCanFill || (
        this.node.type === 'propertySlot' &&
        this. node.quantityExpected?.value === 0 ||
        (this.node.quantityExpected?.value > 1 && this.node.spaceLeft > 0)
      )
    */
  }},
  computed: {
    condenseChild(){
      return this.node.type === 'propertySlot' &&
      this.children.length === 1 &&
      this.children[0].node.type !== 'propertySlot' &&
      this.node.quantityExpected &&
      this.node.quantityExpected.value === 1;
    },
    isSlot(){
      return this.node.type === 'propertySlot';
    },
    canFill(){
      return !!this.node._canFill;
    },
    canFillWithOne(){
      return this.isSlot &&
        this.node.quantityExpected && 
        this.node.quantityExpected.value === 1 &&
        this.node.spaceLeft === 1
    },
    canFillWithMany(){
      return this.isSlot && (
        !this.node.quantityExpected ||
        this.node.quantityExpected.value === 0 ||
        (this.node.quantityExpected.value > 1 && this.node.spaceLeft > 0)
      );
    },
    hasChildren(){
      return !!this.children && !!this.computedChildren.length || this.lazy && !this.expanded;
    },
    showExpanded(){
      return this.canExpand && this.expanded;
    },
    computedChildren(){
      if (this.condenseChild){
        return this.children[0].children;
      }
      return this.children;
    },
    computedSlotId() {
      if (this.condenseChild) {
        if (this.children[0].node.type === 'propertySlot') {
          return this.children[0].node._id;
        } else {
          return undefined;
        }
      } else {
        if (this.node.type === 'propertySlot') {
          return this.node._id;
        } else {
          return undefined;
        }
      }
    },
    canExpand(){
      return !!this.computedChildren.length || this.canFillWithMany;
    },
  },
  watch: {
    'node._ancestorOfMatchedDocument'(value){
      this.expanded = !!value ||
        some(this.selectedNode?.ancestors, ref => ref.id === this.node._id);
    },
    'selectedNode.ancestors'(value){
      this.expanded = !!some(value, ref => ref.id === this.node._id) || this.expanded;
    },
  },
  beforeCreate() {
    this.$options.components.BuildTreeNodeList = require('./BuildTreeNodeList.vue').default
  },
  methods: {
    remove(model) {
      const _id = model._id;
      softRemoveProperty.call({_id});
      snackbar({
        text: `Deleted ${getPropertyTitle(model)}`,
        callbackName: 'undo',
        callback(){
          restoreProperty.call({_id});
        },
      });
    }
  },
};
</script>

<style lang="css" scoped>
  .rotate-90 {
    transform: rotate(90deg) translateZ(0);
  }
  .expand-area {
    box-shadow: -2px 0px 0px 0px #808080;
    margin-left: 0;
  }
  .handle {
    cursor: move;
  }
  .empty .drag-area {
    box-shadow: -2px 0px 0px 0px rgb(128, 128, 128, 0.4);
  }
  .empty .expand-button {
    opacity: 0.4;
  }
  .found {
    background: rgba(200, 0, 0, 0.1) !important;
  }
  .ghost {
    opacity: 0.5;
    background: rgba(251, 0, 0, 0.3);
  }
  .v-icon.v-icon--disabled {
    opacity: 0;
  }
  .v-icon {
    transition: none !important;
  }
  .theme--light .tree-node-title:hover {
    background-color: rgba(0,0,0,.04);
  }
  .theme--dark .tree-node-title:hover {
    background-color: rgba(255,255,255,.04);
  }
  .tree-node-title{
    transition: background ease 0.3s, color ease 0.15s;
  }
  .tree-node-title, .dummy-node {
    height: 40px;
  }
</style>
