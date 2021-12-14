import Route from '@ember/routing/route';

import { A } from '@ember/array';
import { inject } from '@ember/service';

export default class ChoiceAddRoute extends Route {

  @inject turn;

  model() {
    const { index, turn } = this.modelFor('choice');
    const choice = { name: turn.name, options: A(turn.options) };
    return {
      choice,
      onRemoveOption: index => {
        choice.options.removeAt(index);
      },
      onAddOption:() => {
        choice.options.pushObject('');
      },
      onSaveChoice: () => {
        this.turn.update(index, choice);
        this.transitionTo('choice');
      },
    };
  }

}
