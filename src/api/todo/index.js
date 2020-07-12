let todoList = []

module.exports = {
  get: function() {
    todoList = JSON.parse(localStorage.getItem("todoList"))
    if(todoList == null)
      todoList = []

    return todoList
  },

  create: function(todo) {
    var todos = { 
      action : todo.action,
      date_added : todo.date_added
    }
    todoList.push(todos)

    localStorage.setItem("todoList",JSON.stringify(todoList))
    return true
  },

  put: function(oldTodo, newTodo) {
    this.delete(oldTodo)
    this.create(newTodo)
  },

  delete: function(todo) {
    let itemIndex = 1
    todoList.forEach((todoData, index) => {
      if(todoData.action === todo.action && todoData.date_added === todo.date_added) {
        itemIndex = index
      }
    })

    todoList.splice(itemIndex, 1)
    localStorage.setItem("todoList", JSON.stringify(todoList))
  }
}
