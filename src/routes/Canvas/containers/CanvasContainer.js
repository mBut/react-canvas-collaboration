import { connect } from 'react-redux'
import { actions } from '../reducer'
import Canvas from '../components/Canvas'

const mapDispatchToProps = {
  ...actions
}

const mapStateToProps = (state) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Canvas)
