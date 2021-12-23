import { helper } from '@ember/component/helper';

export default helper(function sliceHelper([ array, ...args ]) {
  return array?.slice(...args);
});
