import { wsConnected, wsDataReceived, getSessionId } from './reducer'

export default class WSConnection {
  constructor(store) {
    const sessionId = getSessionId(store.getState());
    const connection = new WebSocket(`ws://localhost:3000/canvas-sync/${sessionId}`, ['soap', 'xmpp']);

    connection.onopen = () => {
      store.dispatch(wsConnected(connection));
    }

    connection.onmessage = (e) => {
      store.dispatch(wsDataReceived(e.data));
    }

    this.connection = connection;
  }
}
