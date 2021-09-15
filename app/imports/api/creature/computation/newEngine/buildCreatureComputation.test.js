import { buildComputationFromProps } from './buildCreatureComputation.js';
import { assert } from 'chai';
import CreatureProperties from '/imports/api/creature/creatureProperties/CreatureProperties.js';

describe('buildComputation', function(){
  it('Builds something at all', function(){
    let computation = buildComputationFromProps(testProperties);
    assert.exists(computation);
  });
});

var testProperties = [
  clean({
    _id: 'attributeId123',
    type: 'attribute',
    variableName: 'strength',
    attributeType: 'ability',
    baseValue: {
      calculation: '1 + 2 + 3',
    },
    description: {
      text: 'strength is {strength}'
    }
  }),
];

function clean(prop){
  let schema = CreatureProperties.simpleSchema(prop);
  return schema.clean(prop);
}
