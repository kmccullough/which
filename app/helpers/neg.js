import { helper } from '@ember/component/helper';

export default helper(function negHelper([ value ]) {
  return -value;
});
