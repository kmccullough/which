import { helper } from '@ember/component/helper';

import { set } from '@ember/object';

export default helper(function setHelper(args) {
  return (...moreArgs) => set(...args, ...moreArgs);
});
