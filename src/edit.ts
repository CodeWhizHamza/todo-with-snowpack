import { closeModal, openModal } from './modal'
import Todo from './todoInterface'
import { getFilterBy, renderTodos } from './utils'

export function handleEdit(target: HTMLButtonElement, todos: Todo[]): void {
  const todoId = target.dataset.id
  const editForm = document.querySelector('.edit-form')
  if (!todoId || !editForm) return

  feedEditForm(todoId, todos)
  displayEditForm('#editModal')
  editForm.addEventListener('submit', (e: Event) => {
    updateTodo(e, todoId, todos)
    resetModal(todos)
  })
}
function feedEditForm(todoId: string, todos: Todo[]): void {
  const editModal = document.querySelector('#editModal')
  const targetTodo = todos.find(todo => todo.id === todoId)
  const editForm = document.querySelector('.edit-form')

  if (!editModal) return
  if (!targetTodo) return
  if (!editForm) return

  const inputEl = editForm.querySelector('textarea')
  if (!inputEl) return
  inputEl.value = targetTodo.text
  inputEl.dataset.id = todoId
}
function displayEditForm(id: string): void {
  const editModal = document.querySelector(id)
  if (editModal) openModal(editModal)
}
function updateTodo(e: Event, targetId: string, todos: Todo[]) {
  e.preventDefault()
  const target = e.target as HTMLFormElement
  const targetTodo = todos.find(todo => todo.id === targetId)

  const textarea = target.querySelector('textarea') as HTMLTextAreaElement
  const message = target?.querySelector('.todo-form__message')

  if (!textarea || !targetTodo) return

  const todoText = textarea.value
  if (todoText === '' && message) message.innerHTML = '* Todo cannot be empty.'
  else targetTodo.text = todoText
}
function resetModal(todos: Todo[]) {
  const target = document.querySelector('.edit-form')
  if (!target) return

  const modal = target.closest('.modal')
  if (!modal) return

  closeModal(modal)
  const filterBy = getFilterBy()
  renderTodos(todos, filterBy)
}
