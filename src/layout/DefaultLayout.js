import React from 'react'
import { AppContent, AppSidebar,  AppHeader, AppSidebarDropdown } from '../components/index';


const DefaultLayout = () => {

  return (
    <>
      <AppSidebar />             {/*--Left Side Nav--*/}
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />            {/*--Top Header Nav--*/}
        <div className="body d-flex flex-grow-1 px-2 px-md-3 mt-5 mt-md-0">
          <AppSidebarDropdown /> {/*--Left Side dropdown--*/}
          <AppContent />         {/*--Right Side Body Content--*/}
        </div>
        {/* <AppFooter />             --Footer Content-- */}
      </div>
      {/* <AppRightSidebar />        --Right Side Nav-- */}
    </>
  )
}

export default DefaultLayout;
