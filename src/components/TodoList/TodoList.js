import React, { Component } from 'react'
import { Button, Table, Popconfirm } from 'antd'
import { connect } from 'react-redux'

import { getTodoList, deleteTodo } from '../../actions'
import CreateModal from '../CreateModal'

class TodoList extends Component {
  state = {
    addTodo: false,
    todo: {},
    buttonText: '',
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getTodoList())
  }

  handleAddTodo = () => {
    this.setState({ addTodo: true })
    this.setState({ buttonText: 'Create' })
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
    this.setState({ buttonText: 'Edit' })
    this.setState({ todo: record })
  }

  render() {
    const { todoList } = this.props
    const { addTodo, todo, buttonText } = this.state

    const columns = [
      {
        title: 'Action',
        dataIndex: 'action',
      },
      {
        title: 'Date Added',
        dataIndex: 'date_added',
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        render: (text, record) => (
          <Button.Group>
            <Button onClick={() => { this.handelEditTodo(record) }}>Edit</Button>
            <Popconfirm
              placement="topRight"
              title='Are you sure want to delete this todo?'
              okText="Yes"
              cancelText="No"
              onConfirm={ () => { this.handleDeleteTodo(record) } }
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </Button.Group>
        ),
      },
    ]

    return(
      <section>
        <Button type="primary" size='large' onClick={ this.handleAddTodo } style={{ marginBottom: '10px' }}>
          Add Todo
        </Button>
        <CreateModal 
          title="Add New Todo"
          isAddTodo={ addTodo }
          onCancel={ this.handleAddTodoClose }
          todo={ todo }
          buttonText={ buttonText }
        />
        <Table 
          columns={columns} 
          dataSource={ todoList.todos } 
          rowKey={ rowKeys => rowKeys.action }
        />
      </section>
    )
  }
}

const connectedTodoList = connect(state => ({
  todoList: state.todo,
}))(TodoList)

export default connectedTodoList
