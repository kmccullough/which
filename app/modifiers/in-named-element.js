import Modifier from 'ember-modifier';

import { inject } from '@ember/service';

export default class OnModifier extends Modifier {

  @inject namedElement;

  didReceiveArguments() {
    this.namedElement.appendChild(this.args.positional[0], this.element);
  }

  willDestroy() {
    this.namedElement.removeChild(this.args.positional[0], this.element);
  }
}
