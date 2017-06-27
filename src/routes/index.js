import CoreLayout from '../layouts/PageLayout/PageLayout'
import Home from './Home'
import Canvas from './Canvas'

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    Canvas(store)
  ]
})

export default createRoutes
