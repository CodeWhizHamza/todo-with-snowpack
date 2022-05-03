import Todo from './todoInterface'
import { openModal } from './modal'
import { checkItem } from './handleCheck'
import { getFilterBy, renderTodos } from './utils'
import { handleItemActions } from './todoActions'

export default function viewTodo(todos: Todo[]) {
  const todoList = document.querySelector('.todo-list')
  const itemModal = document.querySelector('#itemModal') as HTMLElement

  todoList?.addEventListener('click', e => {
    displayTodo(e, itemModal, todos)
  })
  handleItemActions(todos, itemModal)
}

function displayTodo(e: Event, itemModal: HTMLElement, todos: Todo[]): void {
  const target = e.target as Element

  const isTodoEl =
    target.classList.contains('todo-item__text') ||
    target.classList.contains('todo-item')

  if (!isTodoEl) return

  const todoEl = target.closest('.todo-item') as HTMLElement
  const todoId = todoEl?.dataset.id
  if (!todoId) return

  displayItem(todoId, todos)
  handleCheck(itemModal, todos)
}
function displayItem(todoId: string, todos: Todo[]): void {
  const todo = todos.find(todo => todo.id === todoId)
  if (!todo) return

  const itemModal = document.querySelector('#itemModal') as HTMLElement

  if (!itemModal) return
  const itemModalText = itemModal.querySelector('.item__text') as HTMLElement
  const itemDeleteButton = itemModal.querySelector(
    '[data-type="delete"]',
  ) as HTMLElement
  const itemEditButton = itemModal.querySelector(
    '[data-type="edit"]',
  ) as HTMLElement
  const itemCheckbox = itemModal.querySelector(
    '.todo-item__checkbox-input',
  ) as HTMLInputElement
  const checkboxLabel = itemModal.querySelector('.custom') as HTMLElement

  itemModalText.innerHTML = todo.text
  itemDeleteButton.dataset.id = todoId
  itemEditButton.dataset.id = todoId
  itemCheckbox.dataset.id = todoId
  itemCheckbox.id = todoId + '-1'
  itemCheckbox.checked = todo.isDone
  checkboxLabel.setAttribute('for', todoId + '-1')

  openModal(itemModal)
}
function handleCheck(itemModal: HTMLElement, todos: Todo[]) {
  itemModal.addEventListener('click', (e: Event) => {
    const filterBy = getFilterBy()
    checkItem(e, todos)
    renderTodos(todos, filterBy)
  })
}
