const inputText = document.querySelector("#taskList");
const buttonAdd = document.querySelector("#buttonAdd");
const classList = document.querySelector(".class-list");
const resetBtn = document.querySelector("#resetBtn");
const subtitle = document.querySelector("h3");
resetBtn.disabled = true;

const createCheckbox = (id) => {
   const checkbox = document.createElement("input");
   checkbox.type = "checkbox";
   const checkboxId = id;
   checkbox.id = checkboxId;
   return checkbox;
};

const createLabel = (forId, text) => {
   const label = document.createElement("label");
   label.classList.add("checkbox-label");
   label.setAttribute("for", forId);
   label.textContent = text;
   return label;
};

const createLi = (box, label) => {
   const elemLi = document.createElement("li");
   elemLi.appendChild(box);
   elemLi.appendChild(label);
   return elemLi;
};

const saveTask = (task) => {
   const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
   tasks.push(task);
   localStorage.setItem("tasks", JSON.stringify(tasks));
};

let checkboxCounter = 0;

const addTasks = () => {
   checkboxCounter++;
   if (!inputText.value.trim()) return;
   const checkboxId = `checkbox_${checkboxCounter}`;
   const checkbox = createCheckbox(checkboxId);
   const label = createLabel(checkboxId, inputText.value);
   const li = createLi(checkbox, label);
   classList.appendChild(li);
   resetBtn.disabled = false;
   subtitle.style.display = "none";
   saveTask(inputText.value);
   inputText.value = "";
};

let checkboxState = {};

const saveCheckbox = () => {
   const checkboxes = document.querySelectorAll('input[type="checkbox"]');
   checkboxes.forEach((checkbox) => {
      checkboxState[checkbox.id] = checkbox.checked;
   });
   localStorage.setItem("checkboxState", JSON.stringify(checkboxState));
};

classList.addEventListener("change", saveCheckbox);

const loadCheckboxes = () => {
   const checkboxState = JSON.parse(localStorage.getItem("checkboxState"));
   for (let checkboxId in checkboxState) {
    const checkbox = document.getElementById(checkboxId);
        if (checkbox){
            checkbox.checked = checkboxState[checkboxId];
        }
    }
};

const loadTasklist = () => {
   let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
   savedTasks.forEach((task) => {
      checkboxCounter++;
      const checkboxId = `checkbox_${checkboxCounter}`;
      const checkbox = createCheckbox(checkboxId);
      const label = createLabel(checkboxId, task);
      const li = createLi(checkbox, label);
      classList.appendChild(li);
   });
   if (classList.children){
      subtitle.style.display = "none";
   }
   if (classList.children){
      resetBtn.disabled = false;
   }
};

window.addEventListener('load', () => {
    loadTasklist();
    loadCheckboxes();
})

buttonAdd.addEventListener("click", addTasks);

resetBtn.addEventListener("click", function () {
   localStorage.removeItem("tasks");
   localStorage.removeItem("checkboxState");
   subtitle.style.display = "block";
   classList.innerHTML = "";
   resetBtn.disabled = true;
});
