import React, { Component } from 'react';
import { Tabs } from 'antd'

import TodoList from '../components/TodoList'
import Users from '../components/Users'
import 'antd/dist/antd.css'
import './App.css'

class App extends Component {
  static tabKeys = {
    TODO_LIST_TAB: 'todo-list-tab',
    USERS_TAB: 'users-tab',
  }

  handleTabSwitch = (tabKey) => {
    this.setState({
      activeTabKey: tabKey,
    })
  }

  get TodoList() {
    return (
      <Tabs.TabPane
        tab="Todos"
        key={ App.tabKeys.TODO_LIST_TAB }
      >
        <TodoList />
      </Tabs.TabPane>
    )
  }

  get Users() {
    return (
      <Tabs.TabPane
        tab="Users"
        key={ App.tabKeys.USERS_TAB }
      >
        <Users />
      </Tabs.TabPane>
    )
  }

  render() {
    return (
      <div>
      <header className="App-header">
        <Tabs onChange={ this.handleTabSwitch }>
          {this.TodoList}
          {this.Users}
        </Tabs>
      </header>
    </div>
    )
  }
}

export default App
