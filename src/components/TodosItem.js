import React, { useState } from 'react'
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai'
import { MdOutlineDone } from 'react-icons/md'

const TodosItem = ({ todoItem, setTodoItem }) => {
  const [editValue, setEditValue] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const handleTodoState = (id) => {
    setTodoItem(todoItem.map(item => {
      if (item.id !== id) return item
      return {
        ...item,
        state: !item.state
      }
    }))
  }
  const handleDeleteTodoItem = (id) => {
    setTodoItem(todoItem.filter(item => {
      return item.id !== id
    }))

  }
  const handleEditInputChange = (event) => {
    setEditValue(event.target.value)
  }
  const handleEditTodoItem = (id) => {
    if (isEditing) return
    setIsEditing(true)
    setTodoItem(todoItem.map(item => {
      if (item.id !== id) {
        return {
          ...item,
          edit: false
        }
      }
      return {
        ...item,
        edit: true
      }
    }))
  }
  const handleCompletedEdit = (id) => {
    setTodoItem(todoItem.map(item => {
      if (item.id !== id) {
        return item
      }
      return {
        ...item,
        edit: false,
        content: editValue.length === 0 ? item.content : editValue
      }
    }))
    setEditValue('')
    setIsEditing(false)
  }
  const handelEditInputKeyDown = (event, id) => {
    event.key === 'Enter' && handleCompletedEdit(id)
  }
  return (
    <>
      {
        todoItem.map(item => {
          return (
            <li
              className='todo-item'
              key={item.id}
            >
              <div>
                <input
                  className='todo-item-checkbox'
                  type="checkbox"
                  disabled={item.edit}
                  checked={item.state}
                  readOnly={true}
                  onClick={() => handleTodoState(item.id)}
                />
                <button
                  className='todo-item-button'
                  onClick={() => handleDeleteTodoItem(item.id, item.content)}
                >
                  <AiFillDelete color='#E84855' size={20} />
                </button>
                {
                  !item.edit
                    ? <>
                      <span className={item.state ? 'todo-item-content-done' : ''}>
                        {item.content}
                      </span>
                      {
                        !item.state
                          ? <button
                            className='todo-item-button'
                            onClick={() => handleEditTodoItem(item.id, item.state)}
                          >
                            <AiOutlineEdit color='#87833b' size={20} />
                          </button>
                          : <></>
                      }
                    </>
                    : <>
                      <input
                        type='text'
                        maxLength='30'
                        className='todo-item-edit'
                        placeholder={item.content}
                        onChange={handleEditInputChange}
                        onKeyDown={(event) => handelEditInputKeyDown(event, item.id)}
                        autoFocus
                      />
                      <button
                        className='todo-item-button'
                        onClick={() => handleCompletedEdit(item.id)}
                      >
                        <MdOutlineDone color='green' size={20} />
                      </button>
                    </>
                }
              </div>
            </li>
          )
        })
      }
    </>
  )
}

export default TodosItem