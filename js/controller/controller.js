import { DOMReader } from "./getFromDom.js";

export class Controller {

  getCompleted = (data) => data.filter((el) => el.isCompleted);

  createItem(model) {
    const id = model.getLastIndex();
    const itemText = DOMReader.getText("input");
    const newItem = {
      id,
      itemText,
      isCompleted: false,
    };
    model.createData('todoData', newItem);
    return newItem;
  }

  updateItem(item, model) {
    const id = Number.parseInt(item.dataset.id);
    const itemFromModel = model.getItem(id)[0];
    const isCompleted = model.getItem(id)[0].isCompleted;

    isCompleted
      ? (itemFromModel.isCompleted = false)
      : (itemFromModel.isCompleted = true);

    model.updateData(id, itemFromModel, "todoData");
  }

  deleteItem(item, model) {
    const id = Number.parseInt(item.dataset.id);
    return model.deleteData(id);
  }

  clearCompleted = (model) => model.deleteCompleted();
}
