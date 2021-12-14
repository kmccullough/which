import { modifier } from 'ember-modifier';

/**
 * Temporarily disables button to prevent overuse and indicate activity
 */
export default modifier(function pauseClick(element, [ timeout = 300 ] /*, named*/) {
  let originalDisabled;
  const listenerArgs = [ 'click', () => {
    originalDisabled = element.disabled;
    element.disabled = true;
    setTimeout(()  => element.disabled = originalDisabled, timeout);
  } ];
  element.addEventListener(...listenerArgs);
  return () => element.removeEventListener(...listenerArgs);
});
