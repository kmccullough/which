import Modifier from 'ember-modifier';

import { inject } from '@ember/service';

export default class OnModifier extends Modifier {

  @inject namedElement;

  name = null;

  didReceiveArguments() {
    this.namedElement.set(
      this.name = this.args.positional[0],
      this.element
    );
  }

  willDestroy() {
    this.namedElement.delete(this.name);
  }
}
