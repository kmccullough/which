import Route from '@ember/routing/route';

import { inject } from '@ember/service';

export default class ChoiceAddRoute extends Route {

  @inject choice;

  model() {
    const choice = this.choice.createChoice();
    return {
      choice,
      onRemoveOption: index => {
        choice.options.removeAt(index);
      },
      onAddOption:() => {
        choice.options.pushObject('');
      },
      onSaveChoice: () => {
        this.choice.add(choice);
        this.transitionTo('application');
      },
    };
  }

}
