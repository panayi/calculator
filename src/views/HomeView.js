import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { keyEventHandlers } from 'redux/modules/input'
// import styles from './HomeView.scss'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  input: state.input
})
export class HomeView extends Component {
  static propTypes = {
    input: PropTypes.string,
    dispatch: PropTypes.func
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
            {...keyEventHandlers(this.props.dispatch)}
            onChange={() => { /* silence React warning */ }}
          />
        </h2>
        <hr />
      </div>
    )
  }
}

export default connect(mapStateToProps)(HomeView)
