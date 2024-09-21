const todos = [];
const RENDER_EVENT = 'render-todo';



document.addEventListener('DOMContentLoaded', function() {
  const submitForm = document.getElementById('form');
  submitForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo();
  });

  function addTodo() {
    const textTodo = document.getElementById('title').value;
    const timestamp = document.getElementById('date').value;

    const generatedID = generatedId();
    const todoObJect = generatTodoObject(generatedID, textTodo, timestamp, false);
    todos.push(todoObJect);

    document.dispatchEvent(new Event(RENDER_EVENT));
  }


  function generatedId() {
    return +new Date();
  }

  function generatTodoObject(id, task, timestamp, isCompleted) {
    return {
      id,
      task,
      timestamp,
      isCompleted
    }
  }

  function makeTodo(todoObJect) {
    const textTitle = document.createElement('h2');
    textTitle.innerText = todoObJect.task;

    const textTimestamp = document.createElement('p');
    textTimestamp.innerText = todoObJect.timestamp;

    const textContainer = document.createElement('div');
    textContainer.append(textTitle, textTimestamp);

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `todo-${todoObJect.id}`);

    if(todoObJect.isCompleted) {
      const undoButton = document.createElement('button');
      undoButton.classList.add('undo-butoon');

      undoButton.addEventListener('click', function() {
        undoTaskFromCompleted(todoObJect.id);
      });

      const trashButton = document.createElement('button');
      trashButton.classList.add('trash-button');

      trashButton.addEventListener('click', function() {
        removeTaskFromCompleted(todoObJect.id);
      });

      container.append(undoButton, trashButton);
    } else {
      const checkButton = document.createElement('button');
      checkButton.classList.add('check-button');

      checkButton.addEventListener('click', function() {
        addTaskToCompleted(todoObJect.id);
      });

      container.append(checkButton);
    }

    function addTaskToCompleted(todoId) {
      const todoTarget = findTodo(todoId);

      if(todoTarget === null) return;

      todoTarget.isCompleted = true;
      document.dispatchEvent(new Event(RENDER_EVENT));
    }

    function findTodo(todoId) {
      for(const todoItem of todos) {
        if(todoItem.id === todoId) {
          return todoItem;
        }
      }

      return null;
    }

    return container;
  }

  document.addEventListener(RENDER_EVENT, function() {
    const uncompletedTODOList = document.getElementById('todos');
    uncompletedTODOList.innerHTML = '';

    for(const todoItem of todos) {
      const todoElement = makeTodo(todoItem);
      if(!todoItem.isCompleted) {
        uncompletedTODOList.append(todoElement);
      }
    }
  });
  
});