import React from 'react'
import PropTypes from 'prop-types'
import {Layer, Rect, Stage, Group, Image} from 'react-konva'

export default class FreeDrawing extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  initializeOverlayCanvas() {
    const { height, width } = this.props;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    context.lineJoin = "round";
    context.lineWidth = 3;
    context.globalCompositeOperation = 'source-over';

    this.setState({
      canvas: canvas,
      context: context
    });
  }

  componentDidMount() {
    this.props.registerLayer(this.layer);
    this.initializeOverlayCanvas();
  }

  componentDidUpdate() {
    const { context } = this.state;

    if (this.props.drawPath) {
      const { pathColor, drawPath } = this.props;
      const { x0, y0, x1, y1 } = drawPath;
      context.strokeStyle = pathColor;
      context.beginPath();

      context.moveTo(x0 - this.image.x(), y0 - this.image.y());
      context.lineTo(x1 - this.image.x(), y1 - this.image.y());
      context.closePath();
      context.stroke();

      this.layer.draw();
    }
  }

  render() {
    const { height, width } = this.props;

    return (
      <Layer ref={ (c) => this.layer = c }>
        <Image ref={ (c) => this.image = c }
          image={ this.state.canvas }
          height={ height }
          width={ width }
        />
      </Layer>
    );
  }
}

FreeDrawing.propTypes = {
  registerLayer: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  pathColor: PropTypes.string,
  drawPath: PropTypes.object,
}
