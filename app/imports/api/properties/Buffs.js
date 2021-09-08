import SimpleSchema from 'simpl-schema';
import STORAGE_LIMITS from '/imports/constants/STORAGE_LIMITS.js';
import createPropertySchema from '/imports/api/properties/subSchemas/createPropertySchema.js';

let BuffSchema = createPropertySchema({
  name: {
		type: String,
		optional: true,
    max: STORAGE_LIMITS.name,
	},
	description: {
		type: 'inlineCalculationFieldToCompute',
		optional: true,
	},
  // How many rounds this buff lasts
	duration: {
		type: 'fieldToCompute',
		optional: true,
	},
  applied: {
    type: Boolean,
    defaultValue: false,
    index: 1,
  },
  target: {
		type: String,
		allowedValues: [
      'self',  // the character who took the buff
      'each',  // rolled once for `each` target
      'every', // rolled once and applied to `every` target
    ],
		defaultValue: 'every',
	},
});

let ComputedOnlyBuffSchema = createPropertySchema({
	description: {
		type: 'inlineCalculationFieldToCompute',
		optional: true,
    max: STORAGE_LIMITS.description,
	},
	duration: {
		type: 'computedOnlyField',
		optional: true,
	},
	durationSpent: {
		type: Number,
		optional: true,
		min: 0,
	},
	appliedBy: {
		type: Object,
    optional: true,
	},
	'appliedBy.name': {
		type: String,
    max: STORAGE_LIMITS.name,
	},
	'appliedBy.id': {
		type: String,
		regEx: SimpleSchema.RegEx.Id,
	},
	'appliedBy.collection': {
		type: String,
    max: STORAGE_LIMITS.collectionName,
	},
})

const ComputedBuffSchema = new SimpleSchema()
  .extend(BuffSchema)
  .extend(ComputedOnlyBuffSchema);

export { BuffSchema, ComputedOnlyBuffSchema, ComputedBuffSchema };
