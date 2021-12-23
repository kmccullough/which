export function chainCallback(instance, key, fn) {
  if (!instance) {
    return;
  }
  let proto = instance;
  do {
    if (Object.prototype.hasOwnProperty.call(proto, key)) {
      fn(proto[key]);
    }
    const mixin = proto.constructor.PrototypeMixin
    if (mixin && mixin.mixins) {
      mixin.mixins.forEach(({ properties }) => {
        if (properties && Object.prototype.hasOwnProperty.call(properties, key)) {
          fn(properties[key]);
        }
      });
    }
    proto = Object.getPrototypeOf(proto);
  } while (proto);
}

export function chainHash(instance, key) {
  if (!instance) {
    return;
  }
  let hash;
  chainCallback(instance, key, value => {
    if (value && typeof value === 'object') {
      hash = { ...value, ...(hash || {}) };
    }
  });
  return hash;
}
