import { useState } from 'react';
import './App.css';
import './index.css';
import Chat from './components/Chat';
import Login from './components/Login';

function App() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  return (
    <div className="App">
      {(login)
        ?
        <Chat username={username} room={room} />
        :
        <Login username={username} setUsername={setUsername} room={room} setRoom={setRoom} setLogin={setLogin} />}

    </div>
  );
}

export default App;
