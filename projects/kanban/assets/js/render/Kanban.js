import Column from "./Column.js";

export default class Kanban {
  constructor(root) {
    this.root = root;

    Kanban.columns().forEach(col => {
      const colView = new Column(col.id, col.title);

      this.root.appendChild(colView.elements.root);
    });
  }

  static columns() {
    return [
      {
        id: 1,
        title: "Not Started"
      },
      {
        id: 2,
        title: "In Progress"
      },
      {
        id: 3,
        title: "Completed"
      }
    ];
  }
}
