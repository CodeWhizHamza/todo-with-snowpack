import Todo from './todoInterface'
import { getFilterBy, renderTodos } from './utils'

const confirmDelete = (): boolean => confirm('Are you sure?')
export function handleDelete(target: HTMLButtonElement, todos: Todo[]) {
  const targetId = target.dataset.id
  const targetTodoIndex = todos.findIndex(todo => todo.id === targetId)

  if (!confirmDelete()) return
  todos.splice(targetTodoIndex, 1)
  const filterBy = getFilterBy()
  renderTodos(todos, filterBy)
}
