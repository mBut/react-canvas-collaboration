import CoreLayout from '../layouts/PageLayout/PageLayout'
import Canvas from './Canvas'

export const createRoutes = (store) => ({
  path        : '/',
  component   : CoreLayout,
  indexRoute  : Canvas,
})

export default createRoutes
