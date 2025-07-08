import React, { Suspense, useEffect } from 'react'
import { HashRouter, BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer} from 'react-toastify';
import { CSpinner, useColorModes } from '@coreui/react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './scss/style.scss';

// We use those styles to show code examples, you should remove them in your application.
import './scss/examples.scss';
import ProtectedRoute from './ProtectedRoute';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));
// Pages
const Login = React.lazy(() => import('./views/login/Login'));
const Register = React.lazy(() => import('./views/register/Register'));

const App = () => {

  const dispatch = useDispatch()

  const isLight = useSelector(state=> state.isLight);
  console.log("THE LIGHT IS: ",isLight);

  useEffect(()=> {
    
    let theme = localStorage.getItem("theme");
    if(theme){
      document.body.className = theme;
    }else{
      document.body.className = isLight;
      let theme = localStorage.setItem("theme",isLight);
    }
  },[isLight]);


  
  return (
    <Router>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="light" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
           {/*<Route exact path="/register" name="Register Page" element={<Register />} /> */}
          {/* <Route path="*" name="Home" element={<DefaultLayout />} /> */}
          <Route path="*" element={<ProtectedRoute><DefaultLayout /></ProtectedRoute>} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          // transition={Bounce}
         />
      </Suspense>
    </Router>
  )
}

export default App
