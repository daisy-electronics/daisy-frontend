import RequestTarget from '@kothique/request-target';
import EventListener from 'events';
import io from 'socket.io-client';

const url = `http://${window.location.host}/app`;

let socket = null;

const eventHandlers = new EventListener;
export { eventHandlers as events };

const requestHandlers = new RequestTarget;
export { requestHandlers as requests };

export function emit(subject, data = null) {
  socket.emit('event', subject, data);
}

export function request(subject, data = null) {
  return new Promise((resolve, reject) => {
    socket.emit('request', subject, ...data ? [data] : [], (err, response) => {
      if (err) { return reject(err); }
      resolve(response);
    })
  });
}

export function connect() {
  if (socket && socket.connected) { return; }

  let firstConnection = true;

  console.log(`WS: connecting to ${url}...`);
  socket = io(url);

  socket.on('connect', () => {
    if (firstConnection) {
      console.log(`WS: successfully connected to ${url}.`);
      eventHandlers.emit('$connected');
    } else {
      console.log(`WS: successfully reconnected to ${url}.`);
      eventHandlers.emit('$reconnected');
    }
    firstConnection = false;
  });

  socket.on('disconnect', reason => {
    console.log(`WS: connection closed: ${reason}`);

    if (reason === 'io server disconnect') {
      socket.connect();
    }
  });

  socket.on('reconnecting', () => {
    console.log(`WS: reconnecting to ${url}...`);
  });

  socket.on('event', (subject, data) => {
    eventHandlers.emit(subject, data);
  });

  socket.on('request', async (subject, data, ack) => {
    try {
      const result = await requestHandlers.request(subject, data);
      ack(undefined, result);
    } catch (error) {
      ack(error);
    }
  });
}
