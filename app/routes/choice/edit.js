import Route from '@ember/routing/route';

import { inject } from '@ember/service';

export default class ChoiceEditRoute extends Route {

  @inject choice;

  model() {
    let { index, choice } = this.modelFor('choice');
    choice = this.choice.createChoice(choice);
    return {
      choice,
      onRemoveOption: index => {
        choice.options.removeAt(index);
      },
      onAddOption:() => {
        choice.options.pushObject('');
      },
      onSaveChoice: () => {
        this.choice.update(index, choice);
        this.transitionTo('choice');
      },
    };
  }

}
