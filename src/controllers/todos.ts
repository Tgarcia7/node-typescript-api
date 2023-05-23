import { RequestHandler } from 'express'
import { Todo } from '../models/todo.js'
import { getRandomInt } from '../utilities/utils.js'
import { TodoRepository } from '../repositories/todo.js'

export class TodoController {

  constructor(private readonly todoRepository: TodoRepository) {}

  public createTodo: RequestHandler = (req, res) => {
    const text = (req.body as { text: string }).text
    const completed = (req.body as { completed: boolean }).completed
    const todo = new Todo(getRandomInt().toString(), text, completed)

    this.todoRepository.addTodo(todo)

    res.status(201).json({ message: 'todo created', todo })
  }

  public getTodo: RequestHandler = (req, res) => {
    const id: string = req.params.id
    const todo: Todo | undefined = this.todoRepository.getTodo(id)

    if (!todo) return res.status(404).send({ message: 'todo not found' })
    res.json({ todo })
  }

  public getTodos: RequestHandler = (req, res) => {
    res.json({ todos: this.todoRepository.getTodos() })
  }

  public updateTodo: RequestHandler<{ id: string }> = (req, res) => {
    const id: string = req.params.id
    const text = (req.body as { text: string }).text
    const completed = (req.body as { completed: boolean }).completed
    const todo = new Todo(id, text, completed)
    
    const updated: boolean = this.todoRepository.updateTodo(id, todo)
    if (!updated) return res.status(404).send({ message: 'todo not found' })

    res.json({ message: 'todo updated', todo: this.todoRepository.getTodo(id) })
  }

  public deleteTodo: RequestHandler<{ id: string }> = (req, res) => {
    const id: string = req.params.id

    const updated: boolean = this.todoRepository.deleteTodo(id)
    if (!updated) return res.status(404).send({ message: 'todo not found' })

    res.json({ message: 'todo deleted' })
  }
}
