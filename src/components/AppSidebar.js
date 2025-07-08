import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { CSidebar } from '@coreui/react';
import leftMenus from './leftMenus';
//import filteredMenus from './leftMenus';

import AppSidebarDropdown from './AppSidebarDropdown';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const [activeDropdownIndex, setActiveDropdownIndex] = useState(null);
  const menuRef = useRef(null);
  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'Admin';

  // Filter based on role
  const filteredMenus = isAdmin ? leftMenus : leftMenus.filter(menu => menu.name === "Dashboard");
      
  useEffect(() => {
    if (sidebarShow) {
      document.body.classList.add('left-sidebar-visible');
    }
  }, [sidebarShow]);

  // Menu item click handler
  const handleMenuClick = (index, menu) => {
    if (activeDropdownIndex === index) {
      setActiveDropdownIndex(null);
      dispatch({ type: 'setHoveredDropdownItems', payload: [] });
    } else {
      setActiveDropdownIndex(index);
      dispatch({ type: 'setHoveredDropdownItems', payload: menu.dropdown_items });
    }

    if (window.innerWidth < 992 && menu.dropdown_items.length === 0) {
      dispatch({ type: 'set', sidebarShow: false });
    }
  };

  // Close on outside click with 1s delay
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        window.innerWidth < 992
      ) {
        setActiveDropdownIndex(null);
        dispatch({ type: 'setHoveredDropdownItems', payload: [] });
        dispatch({ type: 'set', sidebarShow: false });

        setTimeout(() => {
          document.body.classList.remove('left-sidebar-visible');
        }, 1000);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <CSidebar
        className="border-end"
        colorScheme="light"
        position="fixed"
        unfoldable={unfoldable}
        visible={sidebarShow}
        onVisibleChange={(visible) => {
          dispatch({ type: 'set', sidebarShow: visible });

          // Add or remove class immediately based on visibility
          if (visible) {
            document.body.classList.add('left-sidebar-visible');
          } else {
            document.body.classList.remove('left-sidebar-visible');
          }
        }}
      >
        <ul className="menus" ref={menuRef}>
          {filteredMenus.map((menu, index) => (
            <li key={index}>
              <NavLink
                to={menu.dropdown_items.length === 0 ? menu.path : '#'}
                className="nav-item"
                style={{
                  backgroundColor: activeDropdownIndex === index
                    ? 'rgba(255, 255, 255, 0.15)'
                    : '',
                }}
                onClick={(e) => {
                  if (menu.dropdown_items.length > 0) e.preventDefault();
                  handleMenuClick(index, menu);
                }}
              >
                {menu.icon}
                {menu.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </CSidebar>
    </>
  );
};

export default React.memo(AppSidebar);
