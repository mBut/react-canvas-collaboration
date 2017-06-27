import React from 'react'
import PropTypes from 'prop-types'
import {Layer, Rect, Stage, Group, Image} from 'react-konva'
import classnames from 'classnames'
import _ from 'lodash'

import './ColorsToolbox.scss'

const COLORS = [
  "#113F8C",
  "#01A4A4",
  "#00A1CB",
  "#61AE24",
  "#D0D102",
  "#32742C",
  "#D70060",
  "#E54028",
  "#F18D05",
  "#615151"
]

export default class ColorsToolbox extends React.Component {
  componentDidMount() {
    this.props.setCurrentColor(_.sample(COLORS));
  }

  render() {
    const { currentColor, setCurrentColor } = this.props;

    const colorsItems = COLORS.map((color) =>
      <div
        key={color}
        onClick= { () => setCurrentColor(color) }
        className={ classnames({"color": true, "active": color === currentColor} )}
        style={{"backgroundColor": color}}
      />
    );

    return (
      <div id="colors-toolbox" className="row">
        <div className="col-md-12">
          {colorsItems}
        </div>
      </div>
    );
  }
}

ColorsToolbox.propTypes = {
  currentColor: PropTypes.string,
  setCurrentColor: PropTypes.func.isRequired,
}
