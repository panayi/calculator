import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as keyEventsActions } from 'redux/modules/keyEvents'
// import styles from './HomeView.scss'

const mapStateToProps = (state) => ({
  input: state.input
})
export class HomeView extends Component {
  static propTypes = {
    input: PropTypes.string,
    handleKeyDown: PropTypes.func,
    handleKeyPress: PropTypes.func
  }

  render() {
    const { input } = this.props

    return (
      <div className="container">
        <h1>Welcome to *the calculator*</h1>
        <h2>
          Enter an expression to calculate:&nbsp;
          <input
            type="text"
            value={input}
            onKeyDown={this.props.handleKeyDown}
            onKeyPress={this.props.handleKeyPress}
            onChange={() => { /* silence React warning */ }}
          />
        </h2>
        <hr />
      </div>
    )
  }
}

export default connect(mapStateToProps, keyEventsActions)(HomeView)
