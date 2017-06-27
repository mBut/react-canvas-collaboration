const uuid = require('uuid/v4')
const _ = require('lodash')

let channels = {};

function getChannelKey(socket) {
  return socket.upgradeReq.params.channelKey;
}

function removeSocket(socket) {
  delete(channels[getChannelKey(socket)].clients[socket.id]);
}

function saveSocket(socket) {
  const channelKey = getChannelKey(socket);
  const connectionId = uuid();

  socket.id = connectionId;
  channels[channelKey] = channels[channelKey] || { clients: {} };
  channels[channelKey].clients[connectionId] = socket;
}

function handleError(socket, err) {
  if (err.message === "not opened") {
    removeSocket(socket);
  } else {
    console.log(err);
  }
}

function webSocketEndpoint(app) {
  const expressWS = require('express-ws')(app)

  expressWS.getWss().on('connection', saveSocket);

  app.ws('/canvas-sync/:channelKey', (ws, req) => {
    const channelKey = getChannelKey(ws);

    // Just proxy message to all users in the same room
    ws.on('message', msg => {
      _.each(channels[channelKey].clients, (socket, id) => {
        if (id !== ws.id) {
          try {
            socket.send(msg);
          } catch(err) {
            handleError(socket, err);
          }
        }
      })
    });

  });
};

module.exports = webSocketEndpoint
