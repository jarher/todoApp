import { data } from "../../data.js";
import { classHandle } from "../classModifier.js";
import { DOMReader } from "../getFromDom.js";

export class loadedEvent {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
  }
  listen() {
    document.addEventListener("DOMContentLoaded", () => {
      if (this.model.getLocalStorageData("todoData") === null) {
        this.view.printItems(data);
        this.model.setLocalStorageData("todoData", data);
        this.model.setLocalStorageData("todoTheme", [{ theme: "dark-theme" }]);
      } else {
        this.view.printItems(this.model.readData("todoData"));

        DOMReader.get("body").setAttribute(
          "class",
          this.model.readData("todoTheme")[0].theme
        );
      }

      let dragSrcEl = null;
      function dragStart(e) {
        dragSrcEl = e.target;
        dragSrcEl.classList.add("hide");
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.innerHTML);
        e.target.innerHTML = "";
      }

      function dragOver(e) {
        e.preventDefault();
        dragSrcEl = e.target;
        return false;
      }

      function dragEnter(e) {
        if (dragSrcEl !== e.target) {
          dragSrcEl.innerHTML = e.target.innerHTML;
          dragSrcEl.classList.remove("hide");
          e.target.innerHTML = "";
        }
      }

      function dragLeave(e) {
        dragSrcEl.classList.remove("hide");
        dragSrcEl = e.target;
      }

      function dragEnd(e) {
        e.preventDefault();
      }

      function drop(e) {
        e.stopPropagation();
        e.target.innerHTML = e.dataTransfer.getData("text/html");
        return false;
      }

      function addDragAndDropListeners(element) {
        element.addEventListener("dragstart", dragStart);
        element.addEventListener("dragover", dragOver);
        element.addEventListener("dragenter", dragEnter);
        element.addEventListener("dragleave", dragLeave);
        element.addEventListener("dragend", dragEnd);
        element.addEventListener("drop", drop);
      }
      Array.from(DOMReader.getMany("todos-item")).forEach((item) => {
        addDragAndDropListeners(item);
      });
    });
  }
}
