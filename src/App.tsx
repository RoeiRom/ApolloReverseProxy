import React, { useEffect, useState } from 'react';
import io, { Socket } from 'socket.io-client';

const socket = io(`ws://${window.location.host}`).connect();

const App: React.FC = () => {

  const [lastMessage, setLastMessage] = useState<string>('');
  const [messageToSend, setMessageToSend] = useState<string>('');

  useEffect(() => {
    socket.on('message', data => {
      setLastMessage(data);
    });
  }, [socket])

  return (
    <div>
      <div>
        <input type='text' value={messageToSend} onChange={(event) => setMessageToSend(event.target.value)} />
        <button onClick={() => console.log('in click') as any|| socket.emit('send', messageToSend)}>
          Send Message
        </button>
      </div>
      <div>
        Last Message: {lastMessage}
      </div>
    </div>
  );
}

export default App;