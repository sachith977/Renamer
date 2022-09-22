import React, { Component } from 'react';
import Logo from './design/logo.png';
import './App.css';
import axios from 'axios';
import Form from './forms';
import { useSpring, animated } from 'react-spring'

const calc = (x, y) => [x - window.innerWidth / 2, y - window.innerHeight / 2]
const trans1 = (x, y) => `translate3d(${x / 10}px,${y / 10}px,0)`
const trans2 = (x, y) => `translate3d(${x / 8 + 35}px,${y / 8 - 230}px,0)`
const trans3 = (x, y) => `translate3d(${x / 6 - 250}px,${y / 6 - 200}px,0)`
const trans4 = (x, y) => `translate3d(${x / 7}px,${y / 7}px,0)`


function Card() {
  const [props, set] = useSpring(() => ({ xy: [0, 0], config: { mass: 10, tension: 550, friction: 140 } }))
  return (
    <div class="container" onMouseMove={({ clientX: x, clientY: y }) => set({ xy: calc(x, y) })}>
      <animated.div class="card1" style={{ transform: props.xy.interpolate(trans1) }} />
      <animated.div class="card2" style={{ transform: props.xy.interpolate(trans2) }} />
      <animated.div class="card3" style={{ transform: props.xy.interpolate(trans3) }} />
      <animated.div class="card4" style={{ transform: props.xy.interpolate(trans4) }} />
    </div>
  )
}
class App extends Component {



  render() {
    return (
      <div className="App">
        <div className="logo">
        <img src={Logo} alt="website logo"/>
        </div>
        <div className="body-content">
        <Form/>
        </div>        
        <Card />
      </div>
      
      
      
    );
  }
}

export default App;
