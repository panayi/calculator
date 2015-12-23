import R from 'ramda'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as calculateActions } from 'redux/modules/calculate'
import { actions as keyEventsActions } from 'redux/modules/keyEvents'

const mapStateToProps = (state) => ({
  input: state.input,
  calculations: state.calculations
})
export class HomeView extends Component {
  static propTypes = {
    input: PropTypes.string,
    calculations: PropTypes.array,
    handleKeyDown: PropTypes.func,
    handleKeyPress: PropTypes.func,
    calculate: PropTypes.func
  }

  handleSubmit(event) {
    const { calculate, input } = this.props
    event.preventDefault()
    calculate(input)
  }

  lastCalculationOutput() {
    return R.compose(R.prop('output'), R.defaultTo({}), R.head,
        R.reverse, R.defaultTo([]))(this.props.calculations)
  }

  render() {
    const { input } = this.props

    return (
      <div className="container">
        <h1>Welcome to *the calculator*</h1>
        <h3>
          Result: {this.lastCalculationOutput()}
        </h3>
        <h2>
          Enter an expression to calculate:&nbsp;
          <form onSubmit={(event) => this.handleSubmit(event)}>
          <input
            type="text"
            className="calculator"
            value={input}
            onKeyDown={this.props.handleKeyDown}
            onKeyPress={this.props.handleKeyPress}
            onChange={() => { /* silence React warning */ }}
          />
          <input type="submit" style={{ display: 'none' }} />
          </form>
        </h2>
        <hr />
      </div>
    )
  }
}

const actions = R.merge(calculateActions, keyEventsActions)
export default connect(mapStateToProps, actions)(HomeView)
