import React from 'react'
import PropTypes from 'prop-types'
import {Stage, Layer} from 'react-konva'
import { NORMAL_MODE, DRAWING_MODE } from '../reducer';

import DrawingLayerContainer from '../containers/DrawingLayerContainer'
import ColorsToolboxContainer from '../containers/ColorsToolboxContainer'

import './Canvas.scss'

export default class CanvasView extends React.Component {
  componentDidMount() {
    const stage = this.refs.stage.getStage();
    const { movePointer, setMode } = this.props;

    stage.on('contentMousemove.proto', (event) => {
      movePointer(stage.getPointerPosition());
    });

    stage.on('contentMousedown.proto', () => {
      setMode(DRAWING_MODE, stage.getPointerPosition());
    });

    stage.on('contentMouseup.proto', () => {
      setMode(NORMAL_MODE, stage.getPointerPosition());
    });
  }

  render() {
    return (
      <div>
        <ColorsToolboxContainer />
        <div className="row">
          <div className="col-md-12">
            <Stage ref="stage" width={800} height={600}>
              <DrawingLayerContainer width={800} height={600} />
            </Stage>
          </div>
        </div>
      </div>
    )
  }
}

CanvasView.propTypes = {
  movePointer: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
}
