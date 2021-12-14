import Service from '@ember/service';

export default class NamedElementService extends Service {

  elements = new Map();
  children = new Map();

  get(name) {
    return this.elements.get(name);
  }

  set(name, element) {
    this.elements.set(name, element);
    this.update(name);
  }

  delete(name) {
    const element = this.elements.get(name);
    if (!element) {
      return;
    }
    (this.children.get(name) || []).forEach(el => {
      if (el.parentElement === element) {
        el.remove();
      }
    });
    delete this.elements.delete(name);
  }

  appendChild(name, element) {
    this.children.set(name, [ ...(this.children.get(name) || []), element ]);
    this.update(name);
  }

  removeChild(name, element) {
    const children = (this.children.get(name) || []).filter(el => el !== element);
    if (children?.length) {
      this.children.set(name, children);
    } else {
      this.children.delete(name);
    }
    if (element.parentElement === this.elements.get(name)) {
      element.remove();
    }
  }

  update(name) {
    const element = this.elements.get(name);
    if (!element) {
      return;
    }
    (this.children.get(name) || []).forEach(el => {
      if (el.parentElement !== element) {
        element.appendChild(el);
      }
    });
  }

}
