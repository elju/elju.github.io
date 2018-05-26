import React, { Component } from 'react'
import Link from 'gatsby-link'
import classNames from 'classnames'
import { swapLetter } from '../etc/helpers'
import { EMOJI_SPEED } from '../etc/constants'

export default class CrazyLink extends Component {
  constructor(props) {
    super(props)

    this.state = {
      text: props.children,
      propText: props.children
    }
  }

  updateText = () => {
    this.setState({
      text: swapLetter(this.state.text, this.state.propText)
    })
  }

  componentDidMount() {
    this.setState({ timer: setInterval(this.updateText, EMOJI_SPEED) })
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.children === prevState.propText) { return prevState; }

    return {
      ...prevState,
      text: nextProps.children,
      propText: nextProps.children
    }
  }

  render() {
    let linkClasses = classNames({
      'crazy-link': true
    }, this.props.className)

    let text = Array.from(this.state.text).map((i, j) => {
      let spanClasses = classNames({
        'crazy-link__letter': true,
        'crazy-link__emoji': i.codePointAt(0) > 1000
      })
      return <span key={j} className={spanClasses}>{i}</span>
    })

    return (
      <Link className={linkClasses} activeClassName={this.props.activeClassName} to={this.props.to}>
        {text}
      </Link>
    )
  }
}
