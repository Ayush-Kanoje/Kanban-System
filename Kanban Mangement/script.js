// Function to add a task
function addTask(containerId, taskText, taskTime) {
  const taskList = document.getElementById(containerId);
  const li = document.createElement("li");
  li.draggable = true;
  li.innerHTML = `
      <div>
        <span>${taskText}</span>
        <div class="task-time">Reminder: ${new Date(
          taskTime
        ).toLocaleString()}</div>
      </div>
      <button onclick="removeTask(this)">Delete</button>
    `;
  taskList.appendChild(li);
  addDragAndDrop(li);

  // Set a reminder for the task
  setReminder(taskText, taskTime);
}

// Function to remove a task
function removeTask(button) {
  const li = button.parentElement;
  li.remove();
}

// Function to set a reminder
function setReminder(taskText, taskTime) {
  const now = new Date().getTime();
  const reminderTime = new Date(taskTime).getTime();

  if (isNaN(reminderTime)) {
    alert("Invalid date or time. Please enter a valid future time.");
    return;
  }

  const timeUntilReminder = reminderTime - now;

  if (timeUntilReminder > 0) {
    setTimeout(() => {
      alert(`Reminder: It's time to "${taskText}"!`);
    }, timeUntilReminder);
  } else {
    alert("The selected time is in the past. Please choose a future time.");
  }
}

// Drag and Drop functionality
function addDragAndDrop(item) {
  item.addEventListener("dragstart", () => {
    item.classList.add("dragging");
  });

  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
  });
}

// Add event listeners for drag and drop
document.querySelectorAll(".taskList").forEach((list) => {
  list.addEventListener("dragover", (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(list, e.clientY);
    if (afterElement == null) {
      list.appendChild(draggingItem);
    } else {
      list.insertBefore(draggingItem, afterElement);
    }
  });
});

// Helper function for drag and drop
function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll("li:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

// Add task buttons
document.querySelectorAll(".addTaskBtn").forEach((button, index) => {
  button.addEventListener("click", () => {
    const taskInput = button.previousElementSibling.previousElementSibling;
    const taskTime = button.previousElementSibling;
    const taskText = taskInput.value.trim();
    const taskDateTime = taskTime.value;

    if (taskText !== "" && taskDateTime !== "") {
      const containerId = ["inProgress", "toDoRightNow", "scheduledForLater"][
        index
      ];
      addTask(containerId, taskText, taskDateTime);
      taskInput.value = "";
      taskTime.value = "";
    } else {
      alert("Please enter both a task and a reminder time.");
    }
  });
});

// Search functionality
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  document.querySelectorAll(".taskList li").forEach((task) => {
    const taskText = task.querySelector("span").textContent.toLowerCase();
    if (taskText.includes(searchTerm)) {
      task.style.display = "flex";
    } else {
      task.style.display = "none";
    }
  });
});

// Function to add a task
function addTask(containerId, taskText, taskTime) {
  const taskList = document.getElementById(containerId);
  const li = document.createElement("li");
  li.draggable = true;
  li.innerHTML = `
      <div>
        <span>${taskText}</span>
        <div class="task-time">Reminder: ${new Date(
          taskTime
        ).toLocaleString()}</div>
      </div>
      <button class="done-btn" onclick="moveToDone(this)">Done</button>
      <button class="delete-btn" onclick="removeTask(this)">Delete</button>
    `;
  taskList.appendChild(li);
  addDragAndDrop(li);

  // Set a reminder for the task
  setReminder(taskText, taskTime);
}

// Function to move a task to the "Done" container
function moveToDone(button) {
  const li = button.parentElement;
  const doneContainer = document.getElementById("done");

  // Remove the "Done" button
  li.querySelector(".done-btn").remove();

  // Move the task to the "Done" container
  doneContainer.appendChild(li);
}

// Function to remove a task
function removeTask(button) {
  const li = button.parentElement;
  li.remove();
}

// Rest of your JavaScript code (setReminder, addDragAndDrop, etc.) remains the same