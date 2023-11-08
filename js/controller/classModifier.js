import { DOMReader } from "./getFromDom.js";

export class classHandle {
  static addClass = (element, className) =>
    DOMReader.get(element).classList.add(className);

  static removeClass = (element, className) =>
    DOMReader.get(element).classList.remove(className);

  static changeClass(element, { class_1, class_2 }) {
    if (DOMReader.get(element).className === class_1) {
      this.removeClass(element, DOMReader.get(element).className);
      this.addClass(element, class_2);
      return class_2;
    }
    this.removeClass(element, class_2);
    this.addClass(element, class_1);
    return class_1
  }

  static toggleClass = (element, className) =>
    element.classList.toggle(className);
}
