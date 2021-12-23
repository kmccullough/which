import Route from '@ember/routing/route';

import { inject } from '@ember/service';

export default class ChoiceRoute extends Route {

  @inject choice;

  model() {
    return {
      choices: this.choice.choices,
    };
  }

}
