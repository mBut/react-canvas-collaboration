import _ from 'lodash'

// Constants

export const WS_CONNECTED = 'WS_CONNECTED';
export const REGISTER_LAYER = 'REGISTER_LAYER';
export const SET_MODE = 'SET_MODE';
export const SET_CURRENT_COLOR = 'SET_CURRENT_COLOR';
export const DRAW_PATH = 'DRAW_PATH';
export const MOVE_POINTER_AND_DRAW_PATH = 'MOVE_POINTER_AND_DRAW_PATH';

export const NORMAL_MODE = 'NORMAL_MODE';
export const DRAWING_MODE = 'DRAWING_MODE';

// Helpers

export function getSessionId(state) {
  return state.location.pathname.split("/")[1];
}

// Actions

export function wsConnected(connection) {
  return {
    type: WS_CONNECTED,
    connection
  }
}

export function wsDataReceived(data) {
  return function(dispatch, getState) {
    dispatch(JSON.parse(data));
  }
}

export function registerLayer(layer) {
  return {
    type: REGISTER_LAYER,
    layer
  }
}

export function save() {
  return function(dispatch, getState) {
    const { layers } = getState().canvas
    const { sessionId } = getSessionId(getState());
    const layersData = _.map(layers, (layer) => layer.getContext().getImageData(0, 0, 500, 500));
  }
}

export function movePointer(pointerPosition) {
  return function(dispatch, getState) {
    const canvasState = getState().canvas;

    if (canvasState.mode == DRAWING_MODE) {
      const { x: x0, y: y0 } = canvasState.lastPointerPosition;
      const { x: x1, y: y1 } = pointerPosition;
      const path = { x0, y0, x1, y1 };

      if (canvasState.connection) {
        canvasState.connection.send(
          JSON.stringify({
            type: DRAW_PATH,
            color: canvasState.currentColor,
            path
          })
        )
      }

      dispatch({
        type: MOVE_POINTER_AND_DRAW_PATH,
        pointerPosition,
        color: canvasState.currentColor,
        path
      })
    }
  }
}

export function setCurrentColor(color) {
  return {
    type: SET_CURRENT_COLOR,
    color
  }
}

export function setMode(mode, pointerPosition) {
  return {
    type: SET_MODE,
    mode,
    pointerPosition
  }
}

export const actions = {
  movePointer,
  setMode,
}

// Action Handlers

const ACTION_HANDLERS = {
  [WS_CONNECTED]: (state, { connection }) => {
    return _.assign({}, state, { connection })
  },

  [REGISTER_LAYER]: (state, { layer }) => {
    return _.assign({}, state, {
      layers: [
        ...state.layers,
        layer
      ]
    })
  },

  [DRAW_PATH]: (state, { path, color }) => {
    return _.assign({}, state, {
      drawPath: path,
      pathColor: color
    })
  },

  [MOVE_POINTER_AND_DRAW_PATH]: (state, { pointerPosition, path, color }) => {
    return _.assign({}, state, {
      lastPointerPosition: pointerPosition,
      drawPath: path,
      pathColor: color
    })
  },

  [SET_MODE]: (state, { mode, pointerPosition }) => {
    return _.assign({}, state, {
      lastPointerPosition: pointerPosition,
      mode
    });
  },

  [SET_CURRENT_COLOR]: (state, { color }) => {
    return _.assign({}, state, { currentColor: color })
  }
}

// Reducer

const initialState = {
  layers: [],
  mode: NORMAL_MODE,
}

export default function canvasReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
