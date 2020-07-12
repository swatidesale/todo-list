
export function todo(state = {}, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        promiseState: 'fulfilled',
      }

    case 'GET_TODO_LIST':
      return {
        todos: action.payload, 
        promiseState: 'fulfilled',
      }

    case 'UPDATE_TODO':
      return {
        ...state,
        promiseState: 'fulfilled',
        error: action.payload,
      }

    case 'DELETE_TODO':
      return {
        ...state,
        promiseState: 'fulfilled',
        error: action.payload,
      }

    default:
      return state
  }
}
