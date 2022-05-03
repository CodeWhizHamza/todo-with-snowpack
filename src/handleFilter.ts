import Todo from './todoInterface'
import {
  getFilterBy,
  makeAllUnactive,
  makeThisActive,
  renderTodos,
} from './utils'
export default function handleFilter(todos: Todo[]) {
  const filterButtons = Array.from(
    document.querySelectorAll('[data-filter]'),
  ).map(button => button as HTMLButtonElement)

  filterButtons.forEach(button => {
    button.addEventListener('click', e => {
      makeAllUnactive(filterButtons)
      makeThisActive(button)

      const filterBy = getFilterBy()
      renderTodos(todos, filterBy)
    })
  })
}
