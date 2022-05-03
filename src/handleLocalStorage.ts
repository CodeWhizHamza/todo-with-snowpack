import Todo from './todoInterface'

export function save(todos: Todo[]): void {
  const todosString = JSON.stringify(todos)
  localStorage.setItem('todos', todosString)
}
export function get(): Todo[] | null {
  const todosString = localStorage.getItem('todos')
  if (!todosString) return null
  return JSON.parse(todosString)
}
