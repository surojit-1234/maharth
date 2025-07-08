// store.js or redux/store.js

import { legacy_createStore as createStore } from 'redux';

const initialState = {
  sidebarShow: true,
  theme: 'light',
  rightSidebarShow: true,
  sidebarUnfoldable: false,
  hoveredDropdownItems: [],
  isLight: 'light-theme',
  isAuthenticated: !!localStorage.getItem('token'),

  // 🔥 Timer State
  time: 0,
  isTimerRunning: false,
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest };

    case 'setHoveredDropdownItems':
      return { ...state, hoveredDropdownItems: rest.payload };

    case 'clearHoveredDropdownItems':
      return { ...state, hoveredDropdownItems: [] };

    case 'setColorMode':
      return { ...state, isLight: rest.payload };

    case 'login':
      return { ...state, isAuthenticated: true };

    case 'logout':
      return { ...state, isAuthenticated: false };

    // ⏱ Timer logic
    case 'incrementTime':
      return { ...state, time: state.time + 1 };

    case 'resetTime':
      return { ...state, time: 0 };

    case 'startTimer':
      return { ...state, isTimerRunning: true };

    case 'pauseTimer':
      return { ...state, isTimerRunning: false };


    default:
      return state;
  }
};

const store = createStore(changeState);
export default store;
