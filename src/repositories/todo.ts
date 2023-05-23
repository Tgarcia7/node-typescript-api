import { Todo } from '../models/todo.js'

export class TodoRepository {
  private todos: Array<Todo>

  constructor() {
    this.todos = []
  }

  public addTodo(todo: Todo): void {
    this.todos.push(todo)
  }

  public getTodos(): Array<Todo> {
    return this.todos
  }

  public getTodo(id: string): Todo | undefined {
    return this.todos.find(todo => todo.id === id)
  }

  public deleteTodo(id: string): boolean {
    const idx = this.todos.findIndex(todo => todo.id === id)
    if (idx < 0) return false
    this.todos.splice(idx, 1)
    return true
  }

  public updateTodo(id: string, task: Todo): boolean {
    const idx = this.todos.findIndex(todo => todo.id === id)
    if (idx < 0) return false
    this.todos[idx] = task
    return true
  }
}
