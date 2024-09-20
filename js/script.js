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

    return container;
  }

  document.addEventListener(RENDER_EVENT, function() {
    const uncompletedTODOList = document.getElementById('todos');
    uncompletedTODOList.innerHTML = '';

    for(const todoItem of todos) {
      const todoElement = makeTodo(todoItem);
      uncompletedTODOList.append(todoElement);
    }

    
  });
  
});