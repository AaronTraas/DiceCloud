// Load commonly used dialogs immediately
import AddCreaturePropertyDialog from '/imports/client/ui/creature/creatureProperties/AddCreaturePropertyDialog.vue';
import CharacterCreationDialog from '/imports/client/ui/creature/character/CharacterCreationDialog.vue';
import CastSpellWithSlotDialog from '/imports/client/ui/properties/components/spells/CastSpellWithSlotDialog.vue';
import CreatureFormDialog from '/imports/client/ui/creature/CreatureFormDialog.vue';
import CreaturePropertyCreationDialog from '/imports/client/ui/creature/creatureProperties/CreaturePropertyCreationDialog.vue';
import CreaturePropertyDialog from '/imports/client/ui/creature/creatureProperties/CreaturePropertyDialog.vue';
import CreaturePropertyFromLibraryDialog from '/imports/client/ui/creature/creatureProperties/CreaturePropertyFromLibraryDialog.vue';
import CreatureRootDialog from '/imports/client/ui/creature/character/CreatureRootDialog.vue';
import DeleteConfirmationDialog from '/imports/client/ui/dialogStack/DeleteConfirmationDialog.vue';
import ExperienceInsertDialog from  '/imports/client/ui/creature/experiences/ExperienceInsertDialog.vue';
import ExperienceListDialog from  '/imports/client/ui/creature/experiences/ExperienceListDialog.vue';
import HelpDialog from  '/imports/client/ui/dialogStack/HelpDialog.vue';
import LevelUpDialog from '/imports/client/ui/creature/slots/LevelUpDialog.vue';
import SelectLibraryNodeDialog from '/imports/client/ui/library/SelectLibraryNodeDialog.vue';
import SlotFillDialog from '/imports/client/ui/creature/slots/SlotFillDialog.vue';
import TierTooLowDialog from '/imports/client/ui/user/TierTooLowDialog.vue';
import TransferOwnershipDialog from '/imports/client/ui/sharing/TransferOwnershipDialog.vue';

// Lazily load less common dialogs
const ArchiveDialog = () => import('/imports/client/ui/creature/archive/ArchiveDialog.vue');
const DeleteUserAccountDialog = () => import('/imports/client/ui/user/DeleteUserAccountDialog.vue');
const InviteDialog = () => import('/imports/client/ui/user/InviteDialog.vue');
const LibraryCollectionCreationDialog = () => import('/imports/client/ui/library/LibraryCollectionCreationDialog.vue');
const LibraryCollectionEditDialog = () => import('/imports/client/ui/library/LibraryCollectionEditDialog.vue');
const LibraryCreationDialog = () => import('/imports/client/ui/library/LibraryCreationDialog.vue');
const LibraryEditDialog = () => import('/imports/client/ui/library/LibraryEditDialog.vue');
const LibraryNodeCreationDialog = () => import('/imports/client/ui/library/LibraryNodeCreationDialog.vue');
const LibraryNodeDialog = () => import('/imports/client/ui/library/LibraryNodeDialog.vue');
const MoveLibraryNodeDialog = () => import('/imports/client/ui/library/MoveLibraryNodeDialog.vue');
const SelectCreaturesDialog = () => import('/imports/client/ui/tabletop/SelectCreaturesDialog.vue');
const ShareDialog = () => import('/imports/client/ui/sharing/ShareDialog.vue');
const UsernameDialog = () => import('/imports/client/ui/user/UsernameDialog.vue');

export default {
  AddCreaturePropertyDialog,
  ArchiveDialog,
  CastSpellWithSlotDialog,
  CharacterCreationDialog,
  CreatureFormDialog,
  CreaturePropertyCreationDialog,
  CreaturePropertyDialog,
  CreaturePropertyFromLibraryDialog,
  CreatureRootDialog,
  DeleteConfirmationDialog,
  DeleteUserAccountDialog,
  ExperienceInsertDialog,
  ExperienceListDialog,
  HelpDialog,
  InviteDialog,
  LevelUpDialog,
  LibraryCollectionCreationDialog,
  LibraryCollectionEditDialog,
  LibraryCreationDialog,
  LibraryEditDialog,
  LibraryNodeCreationDialog,
  LibraryNodeDialog,
  MoveLibraryNodeDialog,
  SelectCreaturesDialog,
  SelectLibraryNodeDialog,
  ShareDialog,
  SlotFillDialog,
  TierTooLowDialog,
  TransferOwnershipDialog,
  UsernameDialog,
};
