import CoreLayout from '../layouts/PageLayout/PageLayout'
import CanvasRoute from './Canvas'

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  childRoutes: [
    CanvasRoute(store)
  ]
})

export default createRoutes
