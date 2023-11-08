export const template = ({ id, itemText, isCompleted }) => `
    <span class="indicator ${
      isCompleted ? "indicator-active" : ""
    }" data-id=${id}></span>
    <span class="todos-item-text ${
      isCompleted ? "todos-item-text-completed" : ""
    }">${itemText}</span>
    <button class="todos-delete-btn" data-id=${id}></button>
`;
