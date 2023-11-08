import { classHandle } from "../classModifier.js";

export class clickEvent {
  constructor({ controller, model, view }) {
    this.controller = controller;
    this.model = model;
    this.view = view;
  }

  listen() {
    document.addEventListener("click", (e) => {
      if (e.target.className === "toggle-theme") {
        const classes = {
          class_1: "dark-theme",
          class_2: "light-theme",
        };
        this.model.updateData(
          0,
          {
            theme: classHandle.changeClass("body", classes, this.model),
          },
          "todoTheme"
        );
      }

      if (e.target.classList.contains("indicator")) {
        classHandle.toggleClass(e.target, "indicator-active");
        classHandle.toggleClass(
          e.target.nextElementSibling,
          "todos-item-text-completed"
        );
        this.controller.updateItem(e.target, this.model);
      }

      if (e.target.classList.contains("todos-delete-btn")) {
        const data = this.controller.deleteItem(e.target, this.model);
        this.view.removeItem(e.target.parentElement);
        this.view.printItemsNumber(data);
      }

      if (e.target.id === "allItems") {
        this.view.printItemsNumber(this.view.showAllItems());
      }

      if (e.target.id === "activeItems") {
        this.view.printItemsNumber(
          this.view.showActive(this.model.readData("todoData"))
        );
      }

      if (e.target.id === "completedItems") {
        this.view.printItemsNumber(
          this.view.showCompleted(this.model.readData("todoData"))
        );
      }

      if (e.target.id === "clearCompletedItems") {
        this.view.clearCompleted(this.controller.clearCompleted(this.model));
      }
    });
  }
}
