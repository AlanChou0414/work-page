import React, { useState, useEffect } from 'react'
import TodosItem from './components/TodosItem'
import './App.css'
import { RiSendPlaneFill } from 'react-icons/ri'
import { FiDelete, FiPrinter } from 'react-icons/fi'
import { BsCheckLg } from 'react-icons/bs'
import { v4 as uuid } from 'uuid'

const Todo = () => {
  const [inputValue, setInputValue] = useState('')
  const [outputValue, setOutputValue] = useState('')
  const [todoItem, setTodoItem] = useState(() => {
    let localStorageData = localStorage.getItem('todoItem') || 0
    if (localStorageData) {
      localStorageData = JSON.parse(localStorageData)
    }
    if (!localStorageData) {
      return []
    }
    return localStorageData
  })

  useEffect(() => {
    localStorage.setItem('todoItem', JSON.stringify(todoItem))
  }, [todoItem])

  const handleInputChange = (event) => {
    const newInputText = event.target.value;
    setInputValue(newInputText);
    const replacedText = newInputText.replace(/@|#|\$|x|\//g, (match) => {
      if (match === '@') return '二'
      else if (match === '#') return '三'
      else if (match === '$') return '四'
      else if (match === 'x') return 'Ｘ'
      else return '／'
    });
    setOutputValue(replacedText);
  };
  console.log(outputValue)
  const handleTodoItem = () => {
    if (inputValue === '') return ''
    setTodoItem([{
      id: uuid(Date()),
      state: false,
      edit: false,
      content: outputValue.split('').map(item => {
        if (item === '*' || item === '＊' || item === '、') {
          return item = ' '
        } else {
          return item
        }
      }).join('')
    }, ...todoItem])
    setInputValue('')
    setOutputValue('')
  }
  const handleInputEnter = (event) => {
    if (event.key === 'Enter') {
      handleTodoItem()
      setInputValue('')
      setOutputValue('')
    }
  }
  const handleSelectAllButton = () => {
    setTodoItem(todoItem.map(item => (
      { ...item, state: !item.state }
    )))
  }
  const handleDeleteAll = () => {
    setTodoItem(todoItem.filter(item => {
      return item.state === false
    }))
  }
  const handlePrintButton = () => {
    const PrintWindow = window.open('print', '_blank', 'width=1000,height=1000');
    const content = todoItem.map(item => {
      return (
        `<h2 style="font-family: 'Arial';margin: 20px;font-size: 26px;">${item.content}</h2>`
      )
    })
    PrintWindow.document.write(content.join(''));
    PrintWindow.focus();
    PrintWindow.print();
  }

  return (
    <>
      <div className='container'>
        <div className="inner">
          <header>
            <h1 className='title'>Print-app</h1>
          </header>
          <div className='form-container'>
            <input
              className='input-text'
              type="text"
              name='title'
              placeholder='Text...'
              value={outputValue}
              maxLength='100'
              onChange={handleInputChange}
              onKeyDown={handleInputEnter}
            />
            <button
              type='submit'
              className='input-submit'
              onClick={handleTodoItem}
            >
              <RiSendPlaneFill color='#2EC4B6' size={25} />
            </button>
          </div>
          <button
            type='button'
            className='input-submit btn'
            onClick={handleSelectAllButton}
          >
            <BsCheckLg color='#367bca' size={25} />
          </button>
          <button
            type='button'
            className='input-submit btn'
            onClick={handleDeleteAll}
          >
            <FiDelete color='#ca3636' size={25} />
          </button>
          <button
            type='submit'
            className='input-submit btn'
            onClick={handlePrintButton}
          >
            <FiPrinter color='#999999' size={25} />
          </button>
          <ul>
            {todoItem.length === 0
              ? <></>
              : <TodosItem
                todoItem={todoItem}
                setTodoItem={setTodoItem}
              />
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default Todo
