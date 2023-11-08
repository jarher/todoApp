import { DOMHandle } from "../controller/createToDom.js";
import { DOMReader } from "../controller/getFromDom.js";
import { template } from "./template.js";

export class DOMRender {
  todosItem = DOMReader.getMany("todos-item");

  show = (condition, index) =>
    condition
      ? (this.todosItem[index].style.display = "flex")
      : (this.todosItem[index].style.display = "none");

  appendContent = (parent, child) => DOMHandle.appendToParent(parent, child);

  showAllItems = () => {
    const items = Array.from(this.todosItem); 
    items.forEach((item) => (item.style.display = "flex"));
    return items;
  };

  showActive = (items) => {
    items.forEach((item) => this.show(!item.isCompleted, item.id));
    return items.filter((item) => !item.isCompleted);
  };

  showCompleted = (items) => {
    items.forEach((item) => this.show(item.isCompleted, item.id));
    return items.filter((item) => item.isCompleted);
  };

  printItems(data) {
    data.forEach((el) => {
      const elementAttributes = {
        class: "todos-item",
        draggable: true,
      };
      const parent = DOMHandle.create("div", elementAttributes);
      const child = template(el);
      this.appendContent(parent, child);
      this.appendContent(DOMReader.get(".todos-container"), parent);
    });
  }

  clearCompleted(items) {
    DOMHandle.appendToParent(DOMReader.get(".todos-container"), "");
    this.printItems(items);
  }
  sortElement() {}

  printItemsNumber(data) {
    let count = 0;
    data.forEach((el) => count++);
    DOMHandle.writeText(".itemsNumber", count);
  }

  removeItem = (element) => DOMHandle.remove(element);
}
