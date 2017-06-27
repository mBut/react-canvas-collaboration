[Project initialized using React Redux Start Kit](https://github.com/davezuko/react-redux-starter-kit.git)

#### Getting started

```
git clone git@github.com:mBut/react-canvas-collaboration.git
cd react-canvas-collaboration
npm install
npm install // or yarn install
npm start // or yarn start
```

Project has no any extra dependencies

#### Implementation notes

- For simplicity clients data saves in memory and not persistent between application restarts
- WebSockets just proxies messages between clients and pass it directly to Redux. Obviously it's not secure and all data must be sanitized and validated.
- Entire canvas state is not saved what means that newly joined user can see only paths drawn after he joined to room. Simplified solution for this could be auto-save of room leader's session (primary user in the room) and then when next user joins to the room - restore canvas from saved data. There are some drawts in code, but actual implementation could take to much time.

