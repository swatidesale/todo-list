import React, { Component } from 'react'
import { Button, Table } from 'antd'
import { connect } from 'react-redux'

import CreateModal from '../CreateModal'
import { getUsers, deleteUser } from '../../actions'

class Users extends Component {
  state = {
    createUser: false,
    isLoading: false,
    user: {},
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(getUsers())
  }

  handelCreateUser = () => {
    this.setState({ createUser: true })
    this.setState({ isLoading: true })
  }

  handleCreateUserClose = () => {
    const { dispatch } = this.props

    this.setState({ createUser: false })
    this.setState({ isLoading: false })
    dispatch(getUsers())
  }

  handleDeleteUser = (record) => {
    const { dispatch } = this.props
    dispatch(deleteUser(record))
    dispatch(getUsers())
  }

  handelEditUser = (record) => {
    this.setState({ createUser: true })
    this.setState({ user: record })
  }

  render() {
    const { createUser, isLoading, user } = this.state
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
        />
        <Table 
          loading={ isLoading }
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
