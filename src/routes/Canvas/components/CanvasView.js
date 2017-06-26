import React from 'react'
import PropTypes from 'prop-types'
import {Stage, Layer} from 'react-konva'
import DrawingLayerContainer from '../containers/DrawingLayerContainer'
import { NORMAL_MODE, DRAWING_MODE } from '../reducer';
import './CanvasView.scss'

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
      <Stage ref="stage" width={700} height={700}>
        <DrawingLayerContainer></DrawingLayerContainer>
      </Stage>
    )
  }
}

CanvasView.propTypes = {
  movePointer: PropTypes.func.isRequired,
  setMode: PropTypes.func.isRequired,
}
