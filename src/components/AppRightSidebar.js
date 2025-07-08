import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { CSidebar } from '@coreui/react'
import { FaRegBell } from 'react-icons/fa'
import { LuAlarmClock } from "react-icons/lu";
import { HiMiniRss } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import { GrNext } from "react-icons/gr";

const AppRightSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const rightSidebarShow = useSelector((state) => state.rightSidebarShow)

  useEffect(() => {
    const body = document.body;
    body.classList.toggle('right-sidebar-visible', rightSidebarShow);
  
    if (rightSidebarShow) {
      body.style.setProperty('--cui-sidebar-occupy-end', '55px');
    } else {
      body.style.setProperty('--cui-sidebar-occupy-end', '0px');
    }
  
    return () => {
      body.style.removeProperty('--cui-sidebar-occupy-end'); // Clean up
    };
  }, [rightSidebarShow])

  return (
    <>
      <CSidebar
        className="border-start sidebar-end"
        colorScheme="light"
        position="fixed"
        placement="end"
        unfoldable={unfoldable}
        visible={rightSidebarShow}
        onVisibleChange={(visible) => {
          dispatch({ type: 'set', rightSidebarShow: visible })
        }}
      >
        <ul className='menus'>
          <li><Link to="/" className='nav-item'><FaRegBell /></Link></li>
          <li><Link to="/" className='nav-item'><LuAlarmClock /></Link></li>
          <li><Link to="/" className='nav-item'><HiMiniRss /></Link></li>
        </ul>
      </CSidebar>

      <button onClick={() => dispatch({ type: 'set', rightSidebarShow: !rightSidebarShow })}
        className='btn btn-primary rightNavButton'
      >
        <GrNext />
      </button>
    </>
  )
}

export default React.memo(AppRightSidebar);
