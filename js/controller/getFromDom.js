export class DOMReader {
  static get = (value) => document.querySelector(value);

  static getMany = (value) => document.getElementsByClassName(value);

  static getText = (element) =>
    element === "input"
      ? this.get(element).value
      : this.get(element).textContent;

  static getAttribute = (element, type) => this.get(element).getAttribute(type);
}