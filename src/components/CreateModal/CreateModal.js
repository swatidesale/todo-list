import React, { Component } from 'react'
import { Modal, Form, Input, Button, message, DatePicker } from 'antd'
import { connect } from 'react-redux'
import moment from 'moment'

import { createUser, addTodo, updateTodo, updateUser } from '../../actions'

class CreateModal extends Component {
  state = {
    isSavingInProgress: false,
    dateAdded: ''
  }

  async wait(duration = 1000) {
    const { onCancel } = this.props
    await new Promise(resolve => setTimeout(resolve, duration));
    this.setState({ isSavingInProgress: false })
    onCancel()
  }
  
  handleFormSubmit = (values) => {
    const { dispatch, isCreateUser, isAddTodo, user, todo } = this.props
    this.setState({ isSavingInProgress: true })
    this.wait(2000)

    if(isCreateUser  && Object.keys(user).length) {
      dispatch(updateUser(user, values))
    } else if(isCreateUser ) {
      dispatch(createUser(values))
    } else if(isAddTodo && Object.keys(todo).length) {
      const todos = {
        action: values.action,
        date_added: values.date_added.format('YYYY/MM/DD')
      }
      dispatch(updateTodo(todo, todos))
    } else if(isAddTodo) {
      const todos = {
        action: values.action,
        date_added: values.date_added.format('YYYY/MM/DD')
      }
      dispatch(addTodo(todos))
    }
  }

  handleFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
    this.setState({ isSavingInProgress: false })
    message.error('Something went wrong please try again!')
  }

  render() {
    const { title, onCancel, isCreateUser, isAddTodo, user, todo } = this.props
    const { isSavingInProgress } = this.state

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    }

    return(
      <Modal
        visible={ isCreateUser || isAddTodo }
        title={ title }
        onCancel={ onCancel }
        footer={ false }
      >
        <Form
           {...layout}
           name="basic"
           initialValues={{ remember: true }}
           onFinish={ this.handleFormSubmit }
           onFinishFailed={ this.handleFinishFailed }
        >
          { isCreateUser ? ( 
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input your name' }]}
              initialValue={ user ? user.name : '' }
            >
              <Input />
            </Form.Item> 
          ) : (
            <Form.Item
              label="Action"
              name="action"
              rules={[{ required: true, message: 'Please input your action' }]}
              initialValue={ todo ? todo.action : '' }
            >
              <Input />
            </Form.Item>
          ) }
          { isCreateUser ? (
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email' }]}
                initialValue={ user ? user.email : '' }
              >
                <Input />
              </Form.Item>
          ) : (
            <Form.Item
              label="Date Added"
              name="date_added"
              rules={[{ required: true, message: 'Please select date' }]}
              initialValue={ moment(todo ? todo.date_added : '')  }
            >
              <DatePicker onChange={this.onChange} format='YYYY/MM/DD'/>
            </Form.Item>
          ) }
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={ isSavingInProgress }
            >
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
 
const connectedCreateModal = connect(state => ({
  users: state.user,
}))(CreateModal)

export default connectedCreateModal
