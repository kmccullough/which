import Route from '@ember/routing/route';

import { A } from '@ember/array';
import { inject } from '@ember/service';

export default class ChoiceAddRoute extends Route {

  @inject turn;

  model() {
    const choice = { name: '', options: A() };
    return {
      choice,
      onRemoveOption: index => {
        choice.options.removeAt(index);
      },
      onAddOption:() => {
        choice.options.pushObject('');
      },
      onSaveChoice: () => {
        this.turn.add(choice);
        this.transitionTo('application');
      },
    };
  }

}
