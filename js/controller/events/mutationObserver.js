import { DOMReader } from "../getFromDom.js";

export class Observer {
  constructor({ model, view }) {
    this.view = view;
    this.model = model;
  }

  observerOptions = {
    attributes: false,
    childList: true,
    subtree: true,
    characterData: false,
    attributeOldValue: false,
    characterDataOldValue: false,
  };

  reorderItems() {
    let newData = [];

    const indicators = Array.from(DOMReader.getMany("todos-item")).map((item) =>
      item.querySelector(".indicator")
    );
    const deleteButtons = Array.from(DOMReader.getMany("todos-delete-btn"));

    indicators.forEach((item, index) => {
      if (item) {
        item.dataset.id = index;
        newData.push({
          id: index,
          itemText: item.nextElementSibling.textContent,
          isCompleted: item.classList.contains("indicator-active")
            ? true
            : false,
        });
      }
      if (deleteButtons[index]) {
        deleteButtons[index].dataset.id = index;
      }
    });
    this.model.setLocalStorageData("todoData",newData);
    this.view.printItemsNumber(newData);
  }
  
  observer = new MutationObserver((mutationList) => {
    mutationList.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        
        const data = this.model.readData("todoData");
        this.view.printItemsNumber(data);
        this.reorderItems();
        
      }
    });
  });
  listen() {
    this.observer.observe(
      DOMReader.get(".todos-container"),
      this.observerOptions
    );
  }
}
