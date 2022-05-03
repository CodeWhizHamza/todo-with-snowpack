import Todo from './todoInterface'
import { save } from './handleLocalStorage'

function getTodoMarkupFrom(todo: Todo): string {
  const { text, isDone, id } = todo
  return `<article data-id="${id}" class="todo-item"><div class="todo-item__checkbox"><input data-id="${id}" type="checkbox" id="${id}" ${
    isDone ? 'checked=checked' : ''
  }class="todo-item__checkbox-input"/><label for="${id}" class="custom"></label></div><p data-id="${id}" class="todo-item__text">${text}</p><div class="todo-item__buttons"><button data-id="${id}" class="todo-item__button" data-type="edit"><img src="/img/edit.svg" alt="Edit"/></button><button data-id="${id}" class="todo-item__button" data-type="delete"><img src="/img/delete.svg" alt="Delete" /></button></div></article>`
}
function handleEmptyTodoList(todoContainer: Element): void {
  todoContainer.innerHTML = ''
  todoContainer.innerHTML = `<figure class="empty"><img src="/img/empty.svg" class="empty__img" alt="Empty, no data found" /><figcaption class="empty__caption">No data found!</figcaption></figure>`
}
function render(todos: Todo[], todoContainer: Element): void {
  todoContainer.innerHTML = ''
  todos.forEach((todo: Todo): void => {
    todoContainer.innerHTML += getTodoMarkupFrom(todo)
  })
}
function getFiltered(todos: Todo[], filterBy: string): Todo[] {
  if (filterBy === 'all') return todos
  else if (filterBy === 'completed') return todos.filter(todo => todo.isDone)
  else return todos.filter(todo => !todo.isDone)
}
export function renderTodos(todos: Todo[], filterBy: string): void {
  save(todos)
  const todoContainer = document.querySelector('.todo-list')
  if (!todoContainer) return

  const filterdTodos = getFiltered(todos, filterBy)
  if (filterdTodos.length === 0) handleEmptyTodoList(todoContainer)
  else render(filterdTodos, todoContainer)
}
export function resetAddForm(): void {
  const inputField = document.querySelector(
    '.todo-form__input',
  ) as HTMLInputElement
  const message = document.querySelector('.todo-form__message') as Element

  inputField.value = ''
  message.innerHTML = ''
}
export function generateRandomId(): string {
  return Math.random().toString(16).slice(2)
}
export function focusInput(selector: string) {
  const inputField = document.querySelector(selector) as HTMLInputElement
  inputField.focus()
}
export function makeAllUnactive(buttons: Element[]): void {
  buttons.forEach(button => {
    button.classList.remove('menu__item--active')
  })
}
export function makeThisActive(button: Element): void {
  button.classList.add('menu__item--active')
}
export function getFilterBy(): string {
  const current = Array.from(document.querySelectorAll('[data-filter]')).find(
    todo => todo.classList.contains('menu__item--active'),
  ) as HTMLElement
  const filterBy = current.dataset.filter
  if (!filterBy) return 'all'
  return filterBy
}
