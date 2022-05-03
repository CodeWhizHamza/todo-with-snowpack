import Todo from './todoInterface'
import { handleDelete } from './delete'
import { handleEdit } from './edit'
import { closeModal } from './modal'

export default function handleTodoAction(todos: Todo[]): void {
  const listEl = document.querySelector('.todo-list')
  if (!listEl) return

  listEl.addEventListener('click', e => {
    handleActions(e, todos)
  })
}

export function handleItemActions(todos: Todo[], itemModal: HTMLElement): void {
  itemModal.addEventListener('click', e => {
    if (handleActions(e, todos)) closeModal(itemModal)
  })
}

export function handleActions(e: Event, todos: Todo[]): boolean {
  const target = e.target as Element
  const targetEl = target.closest('.todo-item__button') as HTMLButtonElement

  if (!targetEl) return false

  const isDeleteButton: boolean =
    targetEl.classList.contains('todo-item__button') &&
    targetEl.dataset.type === 'delete'
  const isEditButton: boolean =
    targetEl.classList.contains('todo-item__button') &&
    targetEl.dataset.type === 'edit'

  if (isDeleteButton) {
    handleDelete(targetEl, todos)
    return true
  } else if (isEditButton) {
    handleEdit(targetEl, todos)
    return true
  } else return false
}
