export class Model {
  getLocalStorageData = (itemName) =>
    JSON.parse(localStorage.getItem(itemName));

  setLocalStorageData = (itemName, data) =>
    localStorage.setItem(itemName, JSON.stringify(data));

  readData = (itemName) => this.getLocalStorageData(itemName);

  createData(itemName, data) {
    const todoData = this.readData(itemName);
    todoData.push(data);
    this.setLocalStorageData(itemName, todoData);
    return todoData;
  }

  updateData = (index, item, itemName) => {
    const data = this.readData(itemName);
    data.splice(index, 1, item);
    this.setLocalStorageData(itemName, data);
  };

  getLastIndex = () => this.readData("todoData").length;

  getItem = (id) =>
    this.readData("todoData").filter((object) => object.id === id);

  deleteData(index) {
    const data = this.readData("todoData");
    data.splice(index, 1);
    this.setLocalStorageData("todoData", data);
    return data;
  }

  deleteCompleted() {
    let notCompleted = this.readData("todoData").filter(
      (object) => object.isCompleted === false
    );
    notCompleted = notCompleted.map((el, index) => {
      return { id: index, itemText: el.itemText, isCompleted: el.isCompleted };
    });

    this.setLocalStorageData("todoData", notCompleted);
    return notCompleted;
  }
}
