import React from 'react'
import PropTypes from 'prop-types'

export default Component =>
  class MaterialUIWrapper extends React.PureComponent {
    render() {
      return <Component {...this.props} />
    }

    getChildContext() {
      return {
        userAgent: this.props.userAgent
      }
    }

    static getInitialProps = ({ req }) => ({
      userAgent: process.browser
        ? navigator.userAgent
        : req.headers['user-agent']
    });

    static childContextTypes = {
      userAgent: PropTypes.any
    };
  }
