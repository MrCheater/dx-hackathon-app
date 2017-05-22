import React from 'react'
import PropTypes from 'prop-types'

const App = ({children}) => (
  <div className="root">
    {children}
  </div>
)

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ])
}

export default App
