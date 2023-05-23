import { RequestHandler } from 'express'
import { Todo } from '../models/todo.js'
import { getRandomInt } from '../utilities/utils.js'

const TODOS: Todo[] = []

export const createTodo: RequestHandler = (req, res) => {
  const text = (req.body as { text: string }).text
  const task = new Todo(getRandomInt().toString(), text)

  TODOS.push(task)

  res.status(201).json({ message: 'task created', task: task })
}

export const getTodo: RequestHandler = (req, res) => {
  res.json({ todos: TODOS })
}

export const updateTodo: RequestHandler<{ id: string }> = (req, res) => {
  const id = req.params.id
  const text = (req.body as { text: string }).text
  
  const idx = TODOS.findIndex(todo => todo.id === id)
  if (idx < 0) return res.status(404).send({ message: 'task not found' })
  TODOS[idx] = new Todo(TODOS[idx].id, text)

  res.json({ message: 'task updated', todo: TODOS[idx] })
}

export const deleteTodo: RequestHandler<{ id: string }> = (req, res) => {
  const id = req.params.id

  const idx = TODOS.findIndex(todo => todo.id === id)
  if (idx < 0) return res.status(404).send({ message: 'task not found' })
  TODOS.splice(idx, 1)

  res.json({ message: 'task deleted' })
}
