export default class KanbanAPI {
  static getItems(colID) {
    const col = read().find(column => column.id == colID);

    if (!col) {
      return [];
    }
    return col.items;
  }

  static insertItem(colID, content) {
    const data = read();
    const col = data.find(column => column.id == colID);

    const item = {
      id: Math.floor(Math.random()*1000),
      content
    };

    if (!col) {
      throw new Error("This column doesn't exist.");
    }

    col.items.push(item);
    save(data);

    return item;
  }

  static updateItem(itemID, newProperties) {
    const data = read();
    const [item, currColumn] = (() => {
      for (const col of data) {
        const item = col.items.find(item => item.id == itemID);

        if (item) {
          return [item, col];
        }
      }
    })();

    if (!item) {
      throw new Error("No item was found!");
    }

    item.content = newProperties.content === undefined ? item.content : newProperties.content;

    //UPDATE COLUMN AND ITEM POSITION
    if (newProperties.colID !== undefined && newProperties.pos !== undefined) {
      const targetCol = data.find(column => column.id == newProperties.colID);

      if (!targetCol) {
        throw new Error("No defined target column!");
      }

      //DELETE ITEM FROM CURRENT COLUMN
      currColumn.items.splice(currColumn.items.indexOf(item), 1);

      //MOVE ITEM TO NEW COLUMN
      targetCol.items.splice(newProperties.pos, 0, item);
    }

    save(data);
  }

  static delItem(itemID) {
    const data = read();

    for (const col of data) {
      const item = col.items.find(item => item.id == itemID);

      if (item) {
        col.items.splice(col.items.indexOf(item), 1);
      }
    }

    save(data);
  }
}

function read() {
  const json = localStorage.getItem('kanban-items');

  if (!json) {
    return [
      {
        id: 1,
        items: []
      },
      {
        id: 2,
        items: []
      },
      {
        id: 3,
        items: []
      }
    ];
  }

  return JSON.parse(json);
}

function save(d) {
  localStorage.setItem('kanban-items', JSON.stringify(d));
}
