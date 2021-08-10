import React from 'react'
import TaskList from './components/TaskList'
import TaskInput from './components/TaskInput'

const Task: React.FC = () => {
  return (
    <div>
      <TaskInput />
      <TaskList />
    </div>
  )
}

export default Task
