import { DOMReader } from "./getFromDom";

export class DOMHandle {
  static writeText = (className, text) =>
    (DOMReader.get(className).textContent = text);

  static create(element, attributes) {
    const newElement = document.createElement(element);
    Object.keys(attributes).forEach(attributeName => {
      newElement.setAttribute(attributeName, attributes[attributeName])
    });
    return newElement;
  }
  static appendToParent = (parent, child) =>
    typeof child === "string"
      ? (parent.innerHTML = child)
      : parent.append(child);

  static remove = (element) => element.remove();
}