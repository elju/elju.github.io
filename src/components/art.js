import React, { Component } from 'react'
import styles from '../styles/art.module.scss'
import classnames from 'classnames'

export default class Art extends Component {
  static getAPosition() {
    const top = Math.floor(Math.random()*300)
    const left = Math.floor(Math.random()*1500)
    const back = Math.floor(Math.random()*-5000)
    return {
      transform:
`translate3d(${left}px,${top}px,${back}px) `+
`rotate3d(${Math.random()},${Math.random()},${Math.random()},${Math.floor(Math.random()*180)}deg)`
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      active: false,
      styles: Art.getAPosition()
    }
    this.handleClick = this.handleClick.bind(this)
  }

  register() {
    this.setState({
      interval: setInterval(() => (
        this.updatePosition()
      ), 3000)
    })
  }

  unregister() {
    clearInterval(this.state.interval)
  }

  handleClick() {
    this.setState({
      active: !this.state.active
    })
  }

  componentDidMount() {
    this.register()
  }

  componentWillUnmount() {
    clearInterval(this.state.interval)
  }

  updatePosition() {
    console.log({
      ...Art.getAPosition(),
      ...this.state.styles
    })
    this.setState({
      styles: {
        ...this.state.styles,
        ...Art.getAPosition()
      }
    })
  }

  render() {
    let classes = classnames(
      styles.arts__art,
      styles.art,
      this.state.active && styles['art--active']
    )
    return (
      <img
        onClick={this.handleClick}
        className={classes}
        src={this.props.src}
        style={{
          ...this.state.styles,
          ...{
          }
        }}
      />
    )
  }
}
