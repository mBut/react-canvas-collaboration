import React from 'react'
import { Link  } from 'react-router'

export const HomeView = () => (
  <div className="row pt-5">
    <div className="col-md-12">
      <div className="text-center">
        <h4>React Canvas Collaboration</h4>
        <p className="mt-4">Any URL on in this page create new isolated room with colloboration canvas.</p>
        <p>For example <Link to='/foo'>/foo</Link> or <Link to='/bar'>/bar</Link></p>
        <p>To be able colloborate just open the same page in the another browser window.</p>
      </div>
    </div>
  </div>
)

export default HomeView
