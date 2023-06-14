import {TasksAssocType} from "../App";
import {v1} from "uuid";
import {addToDoListACType} from "./todolists-reducer";

type ActionTypes = AddTaskACType | RemoveTaskACType | UpdateTaskACType | addToDoListACType

export const TaskReducer = (state: TasksAssocType, action: ActionTypes): TasksAssocType => {
  switch (action.type) {
    case 'ADD-TASK':
      const newTask = {id: v1(), title: action.payload.text, isDone: false}
      return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
    case "REMOVE-TASK":
      return {
        ...state, [action.payload.todolistID]: state[action.payload.todolistID]
          .filter((item => item.id !== action.payload.taskID))
      }
    case "UPDATE-TASK":
      return {
        ...state, [action.payload.todolistID]: state[action.payload.todolistID]
          .map(element => element.id === action.payload.taskID
            ? {...element, title: action.payload.updatedTitle}
            : element)
      }
    case "ADD-TODOLIST":
      return {...state, [action.payload.todolistId]: []}
    default:
      return state
  }
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, text: string) => {
  return {
    type: 'ADD-TASK',
    payload: {text, todolistID}
  } as const
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, taskID: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {todolistID, taskID}
  } as const
}

type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistID: string, taskID: string, updatedTitle: string) => {
  return {
    type: 'UPDATE-TASK',
    payload: {todolistID, taskID, updatedTitle}
  } as const
}