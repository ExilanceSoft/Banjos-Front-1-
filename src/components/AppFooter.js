import React from 'react'
import { CFooter } from '@coreui/react-pro'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          
        </a>
        <span className="ms-1"></span>
      </div>
      <div className="ms-auto">
        <span className="me-1"></span>
        <a
          href="https://coreui.io/product/react-dashboard-template/"
          target="_blank"
          rel="noopener noreferrer"
        >
          banjos
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
