import { connect } from 'react-redux'
import { setCurrentColor } from '../reducer'
import ColorsToolbox from '../components/ColorsToolbox'

const mapDispatchToProps = {
  setCurrentColor
}

const mapStateToProps = (state) => {
  const { currentColor } = state.canvas;

  return {
    currentColor
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ColorsToolbox)
