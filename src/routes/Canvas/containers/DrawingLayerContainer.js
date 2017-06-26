import { connect } from 'react-redux'
import { registerLayer } from '../reducer'
import DrawingLayer from '../components/DrawingLayer'

const mapDispatchToProps = {
  registerLayer
}

const mapStateToProps = (state) => ({
  ...state.canvas
})

export default connect(mapStateToProps, mapDispatchToProps)(DrawingLayer)
