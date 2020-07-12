import React, { Component } from 'react'
import { Button, Table } from 'antd'
import { connect } from 'react-redux'

import CreateModal from '../CreateModal'
import { getUsers, deleteUser } from '../../actions'

class Users extends Component {
  state = {
    createUser: false,
    buttonText: '',
    user: {},
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getUsers())
  }

  handelCreateUser = () => {
    this.setState({ createUser: true })
    this.setState({ buttonText: 'Create' })
  }

  handleCreateUserClose = () => {
    const { dispatch } = this.props

    this.setState({ createUser: false })
    dispatch(getUsers())
  }

  handleDeleteUser = (record) => {
    const { dispatch } = this.props
    dispatch(deleteUser(record))
    dispatch(getUsers())
  }

  handelEditUser = (record) => {
    this.setState({ createUser: true })
    this.setState({ buttonText: 'Edit '})
    this.setState({ user: record })
  }

  render() {
    const { createUser, user, buttonText } = this.state
    const { userDetails } = this.props

    const UsersTableColumns = [
      {
        title: 'Name',
        dataIndex: 'name',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        render: (text, record) => (
          <Button.Group>
            <Button onClick={() => { this.handelEditUser(record) }}>Edit</Button>
            <Button
               type="danger"
               onClick={ () => { this.handleDeleteUser(record) }}
            >
              Delete
            </Button>
          </Button.Group>
        ),
      },
    ]

    return(
      <section>
        <Button size='large' onClick={ this.handelCreateUser }>
          Create User
        </Button>
        <CreateModal 
          title="Create New User"
          onCancel={ this.handleCreateUserClose }
          isCreateUser={ createUser }
          user={ user }
          buttonText={ buttonText }
        />
        <Table 
          columns={ UsersTableColumns } 
          dataSource={ userDetails.users } 
          rowKey={ rowKeys => rowKeys.name }
        />
      </section>
    )
  }
}

const connectedUsers = connect(state => ({
  userDetails: state.user,
}))(Users)

export default connectedUsers
