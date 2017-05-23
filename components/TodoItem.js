import React from 'react'

const TodoItem = ({ remove, update, text, complete }) => (
  <div className = 'root'>
    <input className="text" type="text" value={text} onChange={update}/>
    <div className = 'remove-button'>
      X
    </div>
    <style jsx>{`
      .root {
        color: red;
      }
    `}</style>
  </div>
)

export default TodoItem