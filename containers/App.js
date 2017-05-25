import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export class App extends React.PureComponent {
  componentDidMount() {
    if(!this.props.isLogged) {
      window.location.replace('/auth')
    }
  }

  render() {
    return (
      <div className="root">
        {this.props.isLogged ? this.props.children : null}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ])
}

export const mapStateToProps = (state) => ({
  isLogged: !!state.user.upn
})

export default connect(mapStateToProps)(App)
