import { Router } from 'express'
import { TodoController } from '../controllers/todos.js'
import { TodoRepository } from '../repositories/todo.js'

const todoRepository = new TodoRepository()
const todoController = new TodoController(todoRepository)
const router = Router()

router.post('/', todoController.createTodo)
router.get('/', todoController.getTodos)
router.get('/:id', todoController.getTodo)
router.patch('/:id', todoController.updateTodo)
router.delete('/:id', todoController.deleteTodo)

export default router
