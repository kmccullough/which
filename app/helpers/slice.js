import { helper } from '@ember/component/helper';

export default helper(function slice([ array, ...args ]) {
  return array?.slice(...args);
});
