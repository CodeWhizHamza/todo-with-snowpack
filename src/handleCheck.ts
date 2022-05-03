import Todo from './todoInterface'
import { getFilterBy, renderTodos } from './utils'

export default function handleChecked(todos: Todo[]): void {
  const listEl = document.querySelector('.todo-list')
  if (!listEl) return

  listEl.addEventListener('click', e => {
    const target = e.target as HTMLInputElement
    if (
      !target.classList.contains('todo-item__checkbox-input') &&
      !target.classList.contains('custom')
    )
      return
    checkItem(e, todos)

    // TODO Fix the filterby later!
    // const filterBy = getFilterBy()
    // renderTodos(todos, filterBy)
    // console.log(filterBy)
  })
}

export function checkItem(e: Event, todos: Todo[]) {
  const target = e.target as HTMLInputElement

  const targetId = target.dataset.id
  const targetState = target.checked
  const targetTodo = todos.find(todo => todo.id === targetId)
  if (!targetTodo) return

  targetTodo.isDone = targetState
}
