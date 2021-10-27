import KanbanAPI from "../api/KanbanAPI.js";
import Item from "./Item.js";
import DropArea from "./DropArea.js";

export default class Column {
  constructor(id, name) {
    const topDropArea = DropArea.createDropArea();

    this.elements = {};
    this.elements.root = Column.createRoot();
    this.elements.title = this.elements.root.querySelector('.kanban__column-title');
    this.elements.items = this.elements.root.querySelector('.kanban__column-items');
    this.elements.addItem = this.elements.root.querySelector('.kanban__add-item');

    this.elements.root.dataset.id = id;
    this.elements.items.appendChild(topDropArea);

    this.elements.addItem.addEventListener("click", () => {
      const newItem = KanbanAPI.insertItem(id, "");

      this.renderItem(newItem);
    });

    KanbanAPI.getItems(id).forEach(item => {
      this.renderItem(item);
    });

    if (id == 2) {
      //IF IT IS THE IN PROGRESS COLUMN
      //LIMIT TASKS TO 4
      this.elements.title.textContent = name + ' (' + (this.elements.items.children.length-1) + '/5)';
    } else {
      this.elements.title.textContent = name;
    }
  }

  static createRoot() {
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(`
      <div class="kanban__column">
        <div class="kanban__column-title"></div>
        <div class="kanban__column-items"></div>
        <button class="kanban__add-item" type="button">+ Add</button>
      </div>
    `).children[0];
  }

  renderItem(data) {
    const item = new Item(data.id, data.content);
    this.elements.items.appendChild(item.elements.root);
  }
}
