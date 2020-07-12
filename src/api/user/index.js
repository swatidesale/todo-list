let usersDetails = []

module.exports = {
  get: function() {
    usersDetails = JSON.parse(localStorage.getItem("usersDetails"))
    if(usersDetails == null)
      usersDetails = []

    return usersDetails
  },

  create: function(users) {
    var client = { 
      name : users.name,
      email : users.email
    }
    usersDetails.push(client)

    localStorage.setItem("usersDetails",JSON.stringify(usersDetails))
    return true
  },

  put: function(oldData, newData) {
    this.delete(oldData)
    this.create(newData)
  },

  delete: function(user) {
    let itemIndex = 1
    usersDetails.forEach((userData, index) => {
      if(userData.name === user.name && userData.email === user.email) {
        itemIndex = index
      }
    })

    usersDetails.splice(itemIndex, 1)
    localStorage.setItem("usersDetails", JSON.stringify(usersDetails))
  }
}

