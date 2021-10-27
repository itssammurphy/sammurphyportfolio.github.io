import KanbanAPI from "../api/KanbanAPI.js";
export default class DropArea {
  static createDropArea() {
    const range = document.createRange();

    range.selectNode(document.body);

    const dropArea = range.createContextualFragment(`
      <div class="kanban__drop-area"></div>
    `).children[0];

    dropArea.addEventListener("dragover", e => {
      e.preventDefault();
      dropArea.classList.add("kanban__drop-area--active");
    });

    dropArea.addEventListener("dragleave", () => {
      dropArea.classList.remove("kanban__drop-area--active");
    });

    dropArea.addEventListener("drop", e => {
      e.preventDefault();
      dropArea.classList.remove("kanban__drop-area--active");

      const colElement = dropArea.closest(".kanban__column");
      const colID = Number(colElement.dataset.id);
      const dropAreasInCol = Array.from(colElement.querySelectorAll(".kanban__drop-area"));
      const droppedIndex = dropAreasInCol.indexOf(dropArea);
      const itemId = Number(e.dataTransfer.getData("text/plain"));
      const droppedElement = document.querySelector(`[data-id="${itemId}"]`);

      if (colID == 2 && colElement.children[1].children.length-1 >= 5) {
        //TOO MANY IN PROGRESS ITEMS
        alert('Hold up! You already have the maximum number of tasks in progress at the moment. Focus on those first, or move some others to expedite this task.');
      } else {

        const insertAfter = dropArea.parentElement.classList.contains("kanban__item") ? dropArea.parentElement : dropArea;

        if (droppedElement.contains(dropArea)) {
          return;
        }

        insertAfter.after(droppedElement);

        KanbanAPI.updateItem(itemId, {
          colID,
          pos: droppedIndex
        });
      }
      document.querySelector('[data-id="2"]').children[0].textContent = 'In Progress (' + (document.querySelector('[data-id="2"]').children[1].children.length-1) + '/5)';
    });

    return dropArea;
  }
}
