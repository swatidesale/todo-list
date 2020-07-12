
export function user(state = {}, action) {
  switch (action.type) {
    case 'CREATE_USER':
      return {
        ...state,
        promiseState: 'fulfilled',
      }

    case 'GET_USER':
      return {
        users: action.payload, 
        promiseState: 'fulfilled',
      }

    case 'UPDATE_USER':
      return {
        ...state,
        promiseState: 'fulfilled',
        error: action.payload,
      }

    case 'DELETE_USER':
      return {
        ...state,
        promiseState: 'fulfilled',
        error: action.payload,
      }

    default:
      return state
  }
}
