const updateClick = (task_id, index) => {
    const taskInput = document.getElementById(task_id);
    const sendButton = document.getElementById(index);
    taskInput.readOnly = taskInput.readOnly ? false : true; 

    changeValue(index, taskInput, sendButton);
    changeButton(taskInput, sendButton);
}

const changeButton = (input, button) => {
        if (input.readOnly) {
            button.type = "submit"
        } else {
            button.type = "button"
        }
}

const changeValue = (index, input, button) => {
    const updateInput = document.getElementsByClassName('updateTaskValue')[index];
    input.setAttribute('value', input.value);
    updateInput.setAttribute('value', input.value);
}

// input text를 가져올 데이터
const getRaw = (taskInput) => {
    const raw = {taskId: taskInput.id , taskDesc: taskInput.value}
    return raw;
}