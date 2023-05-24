import { RequestHandler } from 'express'
import { Todo, STATUS_OPS } from '../models/todo.js'
import { getRandomInt } from '../utilities/utils.js'
import { TodoRepository } from '../repositories/todo.js'

export class TodoController {
  constructor(private readonly todoRepository: TodoRepository) {}

  public createTodo: RequestHandler = (req, res) => {
    const randomId = getRandomInt().toString()
    const text = (req.body as { text: string }).text
    const completed = (req.body as { completed: boolean }).completed
    const status = (req.body as { status: STATUS_OPS }).status

    if (!Todo.isValidStatus(status)) {
      return res
        .status(400)
        .json({ message: 'status must be one of these: ' + Object.values(STATUS_OPS) })
    }

    const todo = new Todo(randomId, text, completed, status)

    this.todoRepository.addTodo(todo)

    res.status(201).json({ message: 'todo created', todo })
  }

  public getTodo: RequestHandler = (req, res) => {
    const id = req.params.id
    const todo = this.todoRepository.getTodo(id)

    if (!todo) return res.status(404).json({ message: 'todo not found' })
    res.json({ todo })
  }

  public getTodos: RequestHandler = (req, res) => {
    res.json({ 
      total: this.todoRepository.getTotal(),
      todos: this.todoRepository.getTodos() 
    })
  }

  public updateTodo: RequestHandler<{ id: string }> = (req, res) => {
    const id = req.params.id
    const text = (req.body as { text: string }).text
    const completed = (req.body as { completed: boolean }).completed
    const todo = new Todo(id, text, completed)
    
    const updatedTodo = this.todoRepository.updateTodo(id, todo)
    if (!updatedTodo) return res.status(404).json({ message: 'todo not found' })

    res.json({ message: 'todo updated', todo: updatedTodo })
  }

  public deleteTodo: RequestHandler<{ id: string }> = (req, res) => {
    const id = req.params.id

    const updated = this.todoRepository.deleteTodo(id)
    if (!updated) return res.status(404).json({ message: 'todo not found' })

    res.json({ message: 'todo deleted' })
  }
}
