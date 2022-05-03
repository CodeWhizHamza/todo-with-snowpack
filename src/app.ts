import Todo from './todoInterface'
import { getFilterBy, renderTodos } from './utils'
import { makeModalFunctional } from './modal'
import { makeFormFunctional, handleAddButtonClick } from './handleAddTodo'
import handleTodoAction from './todoActions'
import handleChecked from './handleCheck'
import viewTodo from './viewTodo'
import handleFilter from './handleFilter'
import { get } from './handleLocalStorage'

const todos: Todo[] = get() || []

function app() {
  const filterBy = getFilterBy()
  renderTodos(todos, filterBy)
  makeModalFunctional()
  makeFormFunctional(todos)
  handleAddButtonClick()
  handleChecked(todos)
  handleTodoAction(todos)
  viewTodo(todos)
  handleFilter(todos)
}
app()
