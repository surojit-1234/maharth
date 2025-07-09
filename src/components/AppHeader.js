import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CDropdownDivider,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu, cilSun, cilMoon } from '@coreui/icons'
import { FaUserCircle } from 'react-icons/fa'
import { TbLogout2 } from 'react-icons/tb'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { toast } from 'react-toastify'
import Logo from '../assets/images/maha-logo.png'
import { FaPhoneAlt } from "react-icons/fa";

const AppHeader = () => {
  const navigate = useNavigate()
  const headerRef = useRef()
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const [colorMode, setColorMode] = useState('light-theme')
  const [notifications, setNotifications] = useState([])

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light-theme'
    setColorMode(savedTheme)
    document.body.className = savedTheme
  }, [])

  // Theme toggle function
  const handleColorSet = (theme) => {
    setColorMode(theme)
    localStorage.setItem('theme', theme)
    document.body.className = theme
  }

  // Load today's follow-ups from localStorage
  useEffect(() => {
    const todaysFollowups = JSON.parse(localStorage.getItem('todaysFollowups') || '[]');
    setNotifications(todaysFollowups);
  }, [])

  const toggleSidebar = () => {
    dispatch({ type: 'set', sidebarShow: !sidebarShow })
    dispatch({ type: 'setHoveredDropdownItems', payload: [] })
  }

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="px-3 py-2 justify-content-between justify-content-md-start gap-1" fluid>
        <CHeaderToggler onClick={toggleSidebar}>
          <CIcon icon={cilMenu} size="xxl" />
        </CHeaderToggler>

        <CHeaderNav className="d-flex mx-md-4">
          <CNavItem>
            <CNavLink to="/dashboard" as={NavLink}>
              <img src={Logo} alt="logo" className="img-fluid" style={{ maxWidth: '150px' }} />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav className="ms-md-auto header-right-side align-items-center gap-2">
          <CDropdown variant="nav-item" placement="bottom-end" className="m-0">
            <CDropdownToggle caret={false}>
              {colorMode === 'light-theme' ? <CIcon icon={cilSun} size="lg" /> : <CIcon icon={cilMoon} size="lg" />}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light-theme'}
                onClick={() => handleColorSet('light-theme')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark-theme'}
                onClick={() => handleColorSet('dark-theme')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          <CDropdown variant="nav-item" placement="bottom-end" className="m-0">
            <CDropdownToggle caret={false} className="position-relative p-1 me-2" color="light">
              <IoMdNotificationsOutline style={{ fontSize: '24px' }} />
              {notifications.length > 0 && (
                <span className="notification-badge">{notifications.length}</span>
              )}
            </CDropdownToggle>
            <CDropdownMenu style={{ minWidth: '320px', maxHeight: '400px', overflowY: 'auto' }}>
              <b className="dropdown-header">Notifications</b>
              {notifications.length > 0 ? (
                notifications.map((lead, index) => (
                  <CDropdownItem
                    key={index}
                    // onClick={() => navigate(`/add-lead/${lead.id}`, { state: { lead } })}
                  >
                    <FaPhoneAlt /> &nbsp;
                    {lead.fname} {lead.lname} - {lead.mobile}
                  </CDropdownItem>
                ))
              ) : (
                <CDropdownItem className="text-muted">No follow-ups today</CDropdownItem>
              )}
            </CDropdownMenu>
          </CDropdown>

          <CDropdown>
            <CDropdownToggle color="light" className="d-flex align-items-center">
              <FaUserCircle style={{ fontSize: '26px', marginRight: '5px' }} />
              <span>{user.name}</span>
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem><b>Username:</b> {user.username}</CDropdownItem>
              <CDropdownItem><b>Email:</b> {user.email}</CDropdownItem>
              <CDropdownItem><b>Role:</b> {user.role}</CDropdownItem>
              <CDropdownDivider />
              <CDropdownItem
                className="text-danger"
                onClick={() => {
                  localStorage.removeItem('token')
                  setTimeout(() => {
                    navigate('/login')
                    toast.success('Logged Out Successfully!')
                  }, 1000)
                }}
              >
                <TbLogout2 style={{ fontSize: '30px' }} className="logout-icon" /> Logout
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
