import { template } from "../../view/template.js";
import { DOMHandle } from "../createToDom.js";
import { DOMReader } from "../getFromDom.js";

export class keyEvent {
  constructor({ controller, model, view }) {
    this.controller = controller;
    this.model = model;
    this.view = view;
  }

  listen() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const newItem = this.controller.createItem(this.model);
        const parent = DOMHandle.create("div", {
          class: "todos-item",
          draggable: true,
        });
        const child = template(newItem);
        this.view.appendContent(parent, child);
        this.view.appendContent(DOMReader.get(".todos-container"), parent);
        location.reload();
      }
    });
  }
}
