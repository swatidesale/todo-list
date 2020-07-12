import React, { Component } from 'react'
import { Button, Table } from 'antd'
import { connect } from 'react-redux'

import { getTodoList, deleteTodo } from '../../actions'
import CreateModal from '../CreateModal'

class TodoList extends Component {
  state = {
    addTodo: false,
    todo: {},
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getTodoList())
  }

  handleAddTodo = () => {
    this.setState({ addTodo: true })
  }

  handleAddTodoClose = () => {
    const { dispatch } = this.props

    this.setState({ addTodo: false })
    dispatch(getTodoList())
  }

  handleDeleteTodo = (record) => {
    const { dispatch } = this.props
    dispatch(deleteTodo(record))
    dispatch(getTodoList())
  }

  handelEditTodo = (record) => {
    this.setState({ addTodo: true })
    this.setState({ todo: record })
  }

  render() {
    const { todoList } = this.props
    const { addTodo, todo } = this.state

    const columns = [
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
      },
      {
        title: 'Date Added',
        dataIndex: 'date_added',
        key: 'date_added',
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, record) => (
          <Button.Group>
            <Button onClick={() => { this.handelEditTodo(record) }}>Edit</Button>
            <Button
              danger
              onClick={ () => { this.handleDeleteTodo(record) }}
            >
              Delete
            </Button>
          </Button.Group>
        ),
      },
    ]

    return(
      <section>
        <Button size='large' onClick={ this.handleAddTodo }>
          Add Todo
        </Button>
        <CreateModal 
          title="Add New Todo"
          isAddTodo={ addTodo }
          onCancel={ this.handleAddTodoClose }
          todo={ todo }
        />
        <Table columns={columns} dataSource={ todoList.todos } />
      </section>
    )
  }
}

const connectedTodoList = connect(state => ({
  todoList: state.todo,
}))(TodoList)

export default connectedTodoList
