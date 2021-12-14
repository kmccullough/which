import Route from '@ember/routing/route';

import { storageFor } from 'ember-local-storage';

export default class ChoiceRoute extends Route {

  @storageFor('turns') turns;

  model() {
    return {
      turns: this.turns,
    };
  }

}
