import { closeModal } from './modal'
import Todo from './todoInterface'
import {
  focusInput,
  generateRandomId,
  getFilterBy,
  renderTodos,
  resetAddForm,
} from './utils'

export function makeFormFunctional(todos: Todo[]): void {
  const form = document.querySelector('.add-form')
  if (!form) return

  form.addEventListener('submit', (e: Event): void => {
    handleFormSubmit(e, todos)
  })
}
export function handleAddButtonClick(): void {
  const addTodoButton = document.querySelector('.add-todo-button')
  addTodoButton?.addEventListener('click', () => {
    focusInput('.todo-form__input')
    resetAddForm()
  })
}

function handleFormSubmit(e: Event, todos: Todo[]): void {
  e.preventDefault()
  const target = e.target as HTMLFormElement
  const inputField = target.querySelector(
    '.todo-form__input',
  ) as HTMLInputElement
  const message = target.querySelector('.todo-form__message')
  const todoText = inputField.value

  if (todoText === '' && message) message.innerHTML = '* Todo cannot be empty.'
  else {
    addTodo(todos, todoText)
    resetModal(todos)
  }
}
function addTodo(todos: Todo[], todoText: string) {
  const todo: Todo = {
    id: generateRandomId(),
    text: todoText,
    isDone: false,
  }
  todos.push(todo)
}
function resetModal(todos: Todo[]) {
  const targetId = document
    .querySelector('.todo-form__button')
    ?.getAttribute('data-target')
  if (!targetId) return
  const targetEl = document.querySelector(targetId)
  if (!targetEl) return
  closeModal(targetEl)
  const filterBy = getFilterBy()
  renderTodos(todos, filterBy)
  resetAddForm()
  document.querySelector('.todo-item:last-child')?.scrollIntoView()
}
