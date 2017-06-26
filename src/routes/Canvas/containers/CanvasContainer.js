import { connect } from 'react-redux'
import { actions } from '../reducer'
import CanvasView from '../components/CanvasView'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(CanvasView)
