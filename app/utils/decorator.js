export function isClassDecoratorArgs(Target) {
  return arguments.length === 1 && arguments[0] instanceof Function;
}

export function isMemberDecoratorArgs(target, propertyKey, descriptor) {
  return arguments.length === 3 && target instanceof Object
    && typeof propertyKey === 'string' && descriptor instanceof Object;
}

export function isDecoratorArgs() {
  return isClassDecoratorArgs(...arguments) || isMemberDecoratorArgs(...arguments);
}

export function isMethodDecoratorArgs(target, propertyKey, descriptor) {
  return isMemberDecoratorArgs(...arguments)
    && descriptor.value instanceof Function;
}

export function isAccessorDecoratorArgs(target, propertyKey, descriptor) {
  return isMemberDecoratorArgs(...arguments)
    && (descriptor.get instanceof Function || descriptor.set instanceof Function);
}

export function isGetAccessorDecoratorArgs(target, propertyKey, descriptor) {
  return isMemberDecoratorArgs(...arguments)
    && descriptor.get instanceof Function;
}

export function isSetAccessorDecoratorArgs(target, propertyKey, descriptor) {
  return isMemberDecoratorArgs(...arguments)
    && descriptor.set instanceof Function;
}

export function isPropertyDecoratorArgs(target, propertyKey, descriptor) {
  return isMemberDecoratorArgs(...arguments)
    && descriptor.initializer instanceof Function;
}

export function isPropertyOrGetAccessorDecoratorArgs(target, propertyKey, descriptor) {
  return isMemberDecoratorArgs(...arguments)
    && (descriptor.initializer instanceof Function || descriptor.get instanceof Function);
}

export function getDescriptorValue(target, propertyKey, descriptor) {
  return descriptor ? (
    descriptor.get ? descriptor.get()
      : descriptor.initializer ? descriptor.initializer()
        : undefined
  ) : undefined;
}

export function getDecoratorDescriptorValue(target, propertyKey, descriptor) {
  return getDescriptorValue(descriptor);
}
