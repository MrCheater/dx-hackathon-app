import React from 'react'
import PropTypes from 'prop-types'

export class Input extends React.PureComponent {
  state = {
    value: this.props.value
  };

  onChange = event => {
    this.setState({
      value: event.target.value
    })
  };

  onKeyDown = event => {
    const isKeyCodeEnter = event.keyCode === 13
    const isKeyCodeTab = event.keyCode === 9
    const isKeyCodeEscape = event.keyCode === 27
    if (isKeyCodeEnter || isKeyCodeEscape || isKeyCodeTab) {
      event.target.blur()
    }
  };

  onBlur = event => {
    if (this.props.onChange) {
      const value = event.target.value
      this.setState({ value })
      if (value !== this.props.value) {
        this.props.onChange({ target: { value } })
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.value !== nextProps.value) {
      this.setState({
        value: nextProps.value
      })
    }
  }

  render() {
    return (
      <span>
        <input
          type="text"
          {...this.props}
          className="root"
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          onBlur={this.onBlur}
        />
        <style jsx>{`
          .root {
            padding: 7px 10px;
            border: 1px solid #aaa;
            border-radius: 3px;
            box-sizing: border-box;
            background-color: #ffffff;
            max-width: 100%;
            display: block;
            width: 100%;
            font-size: 13.3333px;
            font-family: inherit;
          }
          @media (min-width: 48em) {
            .root {
              display: inline-block;
              max-width: 160px;
              width: auto;
            }
          }
          .root:disabled {
            color: #434343;
          }
        `}</style>
      </span>
    )
  }
}

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

Input.defaultProps = {
  value: ''
}

export default Input
