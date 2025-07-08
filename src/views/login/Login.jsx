import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import './style.css';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Logo from "../../assets/images/maha-logo.png";

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/maharth/login', formData);
      if (res.data.success) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user)); // Save user object
        dispatch({ type: 'login' });
        toast.success("Login Successful!");
        navigate('/dashboard');
        setTimeout(()=> {
          window.location.reload();  
        },1000);
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Invalid Login!');
    }
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <img src={Logo} alt="no-image" className='img-fluid' style={{ maxWidth: "230px", display: "block", margin: "0 auto 30px" }} />
        <CRow className="justify-content-center">
          <CCol lg={5}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1 className="text-center">Login</h1>
                    <p className="text-body-secondary text-center">Sign In to your account</p>
                    {error && <p className="text-danger text-center">{error}</p>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} style={{ fill: "#000" }} />
                      </CInputGroupText>
                      <CFormInput
                        name="username"
                        placeholder="Username"
                        autoComplete="username"
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} style={{ fill: "#000" }} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        name="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol md={12}>
                        <CButton type="submit" className="px-4 w-100" style={{ backgroundColor: "rgb(0, 158, 223)", color: "white" }}>
                          Login
                        </CButton>
                      </CCol>
                      {/* <CCol md={6} className="text-center">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol> */}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
