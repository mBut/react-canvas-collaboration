import React from 'react'
import PropTypes from 'prop-types'
import {Layer, Rect, Stage, Group, Image} from 'react-konva'

export default class FreeDrawing extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {};
  }

  componentDidMount() {
    const { registerLayer } = this.props;
    registerLayer(this.layer);

    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 500;

    const context = canvas.getContext('2d');
    //context.strokeStyle = "#df4b26";
    //context.lineJoin = "round";
    //context.lineWidth = 5;

    this.setState({
      canvas: canvas,
      context: context
    });
  }

  componentDidUpdate() {
    const { context } = this.state;

    if (this.props.drawPath) {
      const { x0, y0, x1, y1 } = this.props.drawPath;
      context.globalCompositeOperation = 'source-over';
      context.beginPath();

      context.moveTo(x0 - this.image.x(), y0 - this.image.y());
      context.lineTo(x1 - this.image.x(), y1 - this.image.y());
      context.closePath();
      context.stroke();

      this.layer.draw();
    }
  }

  render() {
    return (
      <Layer ref={ (c) => this.layer = c }>
        <Image ref={ (c) => this.image = c }
          image={ this.state.canvas }
          x="0"
          y="0"
          stroke="green"
        />
      </Layer>
    );
  }
}

//FreeDrawing.propTypes = {
  //currX: PropTypes.number.isRequired,
  //currY: PropTypes.number.isRequired,
  //prevY: PropTypes.number.isRequired,
  //prevY: PropTypes.number.isRequired,
//}
