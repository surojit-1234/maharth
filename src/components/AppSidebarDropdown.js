import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const AppSidebarDropdown = () => {
    
    const dispatch = useDispatch();
    const hoveredDropdownItems = useSelector((state) => state.hoveredDropdownItems)
    console.log("dropdown-items: ",hoveredDropdownItems);

  return (
    <>
        {hoveredDropdownItems.length > 0 ? 
            <ul className="drop-down openSideDropdown p-0">
              {hoveredDropdownItems.map((item,index) => (
                <li className='mb-2' key={index} style={{listStyle: "none"}}>
                    <NavLink to={item.path} onClick={() => { dispatch({ type: 'clearHoveredDropdownItems' })}}>
                      {item.dropdown_icon}&nbsp;{item.dropdown_name}
                    </NavLink>
                </li>
              ))}
            </ul>
            :
            <ul className="drop-down p-0">
              {/* {hoveredDropdownItems.map((item,index) => (
                <li className='mb-2' key={index} style={{listStyle: "none"}}>{item.dropdown_name}</li>
              ))} */}
            </ul>
        }
    </>
  )
}

export default AppSidebarDropdown;