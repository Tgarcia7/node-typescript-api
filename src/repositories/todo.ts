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

  public getTodo(id: string): Todo | null {
    return this.todos.find(todo => todo.getId === id) || null
  }

  public deleteTodo(id: string): boolean {
    const idx = this.todos.findIndex(todo => todo.getId === id)
    if (idx < 0) return false
    this.todos.splice(idx, 1)
    return true
  }

  public updateTodo(id: string, task: Todo): Todo | null {
    const idx = this.todos.findIndex(todo => todo.getId === id)
    if (idx < 0) return null
    this.todos[idx] = task
    return this.todos[idx]
  }

  public getTotal(): number {
    return this.todos.length || 0
  }
}
