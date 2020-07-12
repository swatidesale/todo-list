import usersAPI from '../api/user'
import todosAPI from '../api/todo'

export function createUser(user) {
  return {
    type: 'CREATE_USER',
    payload: usersAPI.create(user),
  }
}

export function updateUser(oldData, newData) {
  return {
    type: 'UPDATE_USER',
    payload: usersAPI.put(oldData, newData),
  }
}

export function getUsers() {
  return {
    type: 'GET_USER',
    payload: usersAPI.get(),
  }
}

export function deleteUser(user) {
  return {
    type: 'DELETE_USER',
    payload: usersAPI.delete(user),
  }
}

export function addTodo(todo) {
  return {
    type: 'ADD_TODO',
    payload: todosAPI.create(todo),
  }
}

export function getTodoList() {
  return {
    type: 'GET_TODO_LIST',
    payload: todosAPI.get(),
  }
}

export function updateTodo(oldTodo, newTodo) {
  return {
    type: 'UPDATE_TODO',
    payload: todosAPI.put(oldTodo, newTodo),
  }
}

export function deleteTodo(todo) {
  return {
    type: 'DELETE_TODO',
    payload: todosAPI.delete(todo),
  }
}



