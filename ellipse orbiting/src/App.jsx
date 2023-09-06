import { useState } from 'react'
import styled, { keyframes } from 'styled-components';
// import './App.css'

function App() {
  const [count, setCount] = useState(0);
  // const [parentHeight, setP]

  return (
    // <div className='parentContainer' width={width} height={height}>
    //   <div className='SquareWrapper' parentWidth={width} parentHeight={height} width={childWidth}>
    //     <div className='Square Square--rotateThenTranslate'></div>
    //   </div>
    // </div>
    <section>
      <Orbit>
        <Electron className='Electron'></Electron>
      </Orbit>
    </section>
    
  )
}

export default App

const circle = (radius) => `
  border-radius: 50%;
  width: ${radius * 2}px;
  height: ${radius * 2}px;
`;

const rotate = keyframes`
  0% {
    transform: rotateZ(0deg) translateX(50px) rotateZ(-0deg) rotateY(-60deg);
  }
  100% {
    transform: rotateZ(360deg) translateX(50px) rotateZ(-360deg) rotateY(-60deg);
  }
`;

const Orbit = styled.div`
  ${circle(50)}
  position: relative;
  transform: rotateY(46deg);
  transform-style: preserve-3d;
  border: solid 2px #ccc;
`;

const Electron = styled.div`
  ${circle(10)}
  position: absolute;
  top: 40px;
  left: 40px;
  background-color: #12d8f4;
  animation: ${rotate} 2s infinite;
  `;

