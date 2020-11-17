import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';
import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');


function App() {
  const [timer, setTimer] = useState(0);
  function subscribeToTimer(cb) {
    socket.on('timer', timestamp => {
  
      cb(null, timestamp)
    });
    socket.emit('subscribeToTimer', 1000);
  }
  useEffect(()=>{
    subscribeToTimer((err, timestamp) => {
      console.log(timestamp)
      setTimer(timestamp);
    });
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
       <p>{timer} </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
