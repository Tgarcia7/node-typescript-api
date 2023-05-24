export enum STATUS_OPS { ACTIVE = 'active', INACTIVE = 'inactive', ARCHIVED = 'archived' }

export class Todo {
  private readonly creationDate: Date

  constructor(
    private id: string,
    private text: string,
    private completed: boolean = false,
    private status: STATUS_OPS = STATUS_OPS.ACTIVE,
  ) {
    this.creationDate = new Date()
  }

  get getId(): string {
    return this.id
  }

  public set setId(id: string) {
    this.id = id
  }

  public get getText(): string {
    return this.text
  }

  public set setText(text: string) {
    this.text = text
  }

  public get getCompleted(): boolean {
    return this.completed
  }

  public set setCompleted(completed: boolean) {
    this.completed = completed
  }

  public get getCreationDate(): Date | undefined {
    return this.creationDate
  }

  public get getStatus(): string | undefined {
    return this.status
  }
  
  public set setStatus(status: STATUS_OPS) {
    this.status = status
  }

  public toString(): string {
    return JSON.stringify(this)
  }

  static isValidStatus(status: string): boolean {
    const allowedStatus = Object.values(STATUS_OPS)
    return !status || allowedStatus.includes(status as STATUS_OPS)
  }

  static fromJSON(json: JsonTodo): Todo {
    const id = json.id
    const text = json.text
    const completed = json.completed
    const status = json.status

    if (status && !this.isValidStatus(status)) throw new Error('Not allowed status')

    return new Todo(id, text, completed, status)
  }

  static toJSON(todo: Todo): JsonTodo {
    return {
      id: todo.id,
      text: todo.text,
      completed: todo.completed,
      status: todo.status,
      creationDate: todo.creationDate
    }
  }
}

interface JsonTodo {
  id: string,
  text: string,
  completed?: boolean,
  status?: STATUS_OPS,
  creationDate?: Date
}
