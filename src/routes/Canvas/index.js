import { injectReducer } from '../../store/reducers'
import CanvasContainer from './containers/CanvasContainer'
import reducer from './reducer'
import WSConnection from './WSConnection'
import autoSave from './autoSave'

export default (store) => ({
  path: '/:sessionId',
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const CanvasContainer = require('./containers/CanvasContainer').default;
      const reducer = require('./reducer').default

      injectReducer(store, { key: 'canvas', reducer });
      new WSConnection(store);

      //autoSave(store); // Enable canvas state autosave

      cb(null, CanvasContainer)
    })
  }
})
