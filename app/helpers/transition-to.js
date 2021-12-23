import Helper from '@ember/component/helper';

import { inject } from '@ember/service';

export default class TransitionToHelper extends Helper {

  @inject router;

  compute(args) {
    return () => this.router.transitionTo(...args);
  }

}
