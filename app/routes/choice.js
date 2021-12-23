import Route from '@ember/routing/route';

import { inject } from '@ember/service';

import { routeModel } from 'which/services/route-model';

export default class ChoiceRoute extends Route {

  @inject choice;

  @routeModel('choice')
  model({ id: index }) {
    return {
      index,
      choices: this.choice.choices,
      choice: this.choice.choices.content[index],
      onChoose: () => {
        this.choice.choose(index);
      },
      onDelete: () => {
        this.transitionTo('index');
        this.choice.remove(index);
      },
    };
  }

}
