import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deepOrange500 } from 'material-ui/styles/colors'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

if (!process.tapEventInjected) {
  injectTapEventPlugin()
  process.tapEventInjected = true
}

const muiTheme = {
  palette: {
    accent1Color: deepOrange500
  }
}

@connect(mapStateToProps)
export default class App extends React.PureComponent {
  componentDidMount() {
    if (!this.props.isLogged) {
      window.location.replace('/auth')
    }
  }

  render() {
    const { userAgent } = this.context

    return (
      <MuiThemeProvider muiTheme={getMuiTheme({ userAgent, ...muiTheme })}>
        <div>
          {this.props.isLogged ? this.props.children : null}
        </div>
      </MuiThemeProvider>
    )
  }

  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node
    ]),
    isLogged: PropTypes.bool.isRequired
  };

  static contextTypes = {
    userAgent: PropTypes.any
  };
}

export function mapStateToProps(state) {
  return {
    isLogged: !!state.user.upn
  }
}

export { App }
