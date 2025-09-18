import { useEffect } from 'react';
import { io } from 'socket.io-client';

export default function Page() {
  useEffect(() => {
    const socket = io('http://localhost:3700');
    socket.on('connect', function () {
      console.log('Connected');
    });
    socket.on('events', function (data) {
      console.log(data);
    });
    socket.emit('events', 'Hello world');
  }, []);
  return <div>example</div>;
}
