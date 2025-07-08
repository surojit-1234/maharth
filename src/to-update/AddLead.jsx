import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { SiGoogleforms } from "react-icons/si";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CSmartTable,
} from '@coreui/react-pro';

const AddLead = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const lead = location.state?.lead;

  // const lead = location.state?.lead;
  const readonly = location.state?.readonly || false;

  const time = useSelector((state) => state.time);
  const isTimerRunning = useSelector((state) => state.isTimerRunning);

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    mobile: '',
    customer_type: '',
    customer_status: '',
    loan_type: '',
    follow_up: '',
    remarks: '',
    business_name: '',
    designation: '',
    location: '',
    pincode: '',
    follow_up_time: ''
  });

  const [recordingFile, setRecordingFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        dispatch({ type: 'incrementTime' });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, dispatch]);

  useEffect(() => {
    if (!lead) {
      toast.error("No lead data found for update.");
      return;
    }

    setFormData({
      fname: lead.fname || '',
      lname: lead.lname || '',
      email: lead.email || '',
      mobile: lead.mobile || '',
      customer_type: lead.customer_type || '',
      customer_status: lead.customer_status || '',
      loan_type: lead.loan_type || '',
      follow_up: lead.follow_up ? lead.follow_up.slice(0, 10) : '',
      remarks: lead.remarks || '',
      business_name: lead.business_name || '',
      designation: lead.designation || '',
      location: lead.location || '',
      pincode: lead.pincode || '',
      follow_up_time: lead.follow_up_time || ''
    });
  }, [lead]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'customer_status') {
      const statusObj = {
        'Interested': 1,
        'Not Interested': 2,
        'DND': 3
      };
      setFormData((prev) => ({
        ...prev,
        [name]: statusObj[value] || ''
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }

    setFormErrors((prev) => ({
      ...prev,
      [name]: false
    }));
  };

  const handleFileChange = (e) => {
    setRecordingFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['fname', 'lname', 'email', 'mobile', 'customer_type', 'customer_status', 'loan_type', 'follow_up', 'remarks'];
    const errors = {};

    requiredFields.forEach(field => {
      if (!formData[field]) errors[field] = true;
    });

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      toast.error("Please fill all required fields.");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Token missing. Please log in.");
      return;
    }

    if (!lead?.id) {
      toast.error("Lead ID missing. Cannot update.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    if (recordingFile) {
      data.append('recording_file_updated', recordingFile+"duration");
    }

    data.append('time_spent_seconds', time);
    data.append('calling_date_time', new Date().toISOString());

    console.log("Data:",data);

    try {
      const res = await axios.put(`http://localhost:8000/maharth/updateLead/${lead.id}`, data, {
        headers: {
          'access-token': token,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        console.log("Response: ",res.data)
        toast.success(res.data.message || "Lead updated successfully!");
        dispatch({ type: 'resetTime' });
        dispatch({ type: 'pauseTimer' });
        navigate("/dashboard");


        
        //  // ✅ Save updated lead ID to localStorage
        // const updatedLeads = JSON.parse(localStorage.getItem('updatedLeads') || '[]');
        // if (!updatedLeads.includes(lead.id)) {
        //   updatedLeads.push(lead.id);
        //   localStorage.setItem('updatedLeads', JSON.stringify(updatedLeads));
        // }

      } else {
        toast.error(res.data.message || "Failed to update lead.");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Error while updating the lead.");
    }

    console.log("Total Duration is: ", formatTime(time));
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-12 p-0">
            <div className="card shadow" id="lead-form">
              {/* <div className="card-body"> */}
              

      <CCard>
        <CCardHeader className="d-flex align-items-center justify-content-between">
         <strong>Update Lead</strong>
         <div className='right-side-content'>
            <Button onClick={handleShow} variant='none'><SiGoogleforms /> Loan Details</Button>
            <h5>Duration: {formatTime(time)}</h5>
          </div>
        </CCardHeader>

        <CCardBody>
      
                <form className="row g-3 mt-4" onSubmit={handleSubmit}>
                  
                  {/* First Name */}
                  <div className="col-md-4">
                    <label className="form-label">First Name *</label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.fname ? 'is-invalid' : ''}`}
                      name="fname"
                      value={formData.fname}
                      onChange={handleChange}
                      placeholder="Enter First Name"
                      disabled={readonly}
                    />
                    <i className='text-danger' style={{ fontSize: "13px" }}>
                      {formErrors.fname ? '*This field is required' : ''}
                    </i>
                  </div>

                  {/* Last Name */}
                  <div className="col-md-4">
                    <label className="form-label">Last Name *</label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.lname ? 'is-invalid' : ''}`}
                      name="lname"
                      value={formData.lname}
                      onChange={handleChange}
                      placeholder="Enter Last Name"
                      disabled={readonly}
                    />
                    <i className='text-danger' style={{ fontSize: "13px" }}>
                      {formErrors.lname ? '*This field is required' : ''}
                    </i>
                  </div>

                   {/* Mobile */}
                   <div className="col-md-4">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.mobile ? 'is-invalid' : ''}`}
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter Phone Number"
                      disabled={readonly}
                    />
                    <i className='text-danger' style={{ fontSize: "13px" }}>
                      {formErrors.mobile ? '*This field is required' : ''}
                    </i>
                  </div>

                  {/* Email */}
                  <div className="col-md-4">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                      disabled={readonly}
                    />
                    <i className='text-danger' style={{ fontSize: "13px" }}>
                      {formErrors.email ? '*This field is required' : ''}
                    </i>
                  </div>

                 

                  {/* Customer Type */}
                  <div className="col-md-4">
                    <label className="form-label">Customer Type *</label>
                    <select
                      className={`form-select ${formErrors.customer_type ? 'is-invalid' : ''}`}
                      name="customer_type"
                      value={formData.customer_type}
                      onChange={handleChange}
                      disabled={readonly}
                    >
                      <option value="">Select</option>
                      <option>Salaried</option>
                      <option>Self Employed</option>
                    </select>
                    <i className='text-danger' style={{ fontSize: "13px" }}>
                      {formErrors.customer_type ? '*This field is required' : ''}
                    </i>
                  </div>

                   {/* Business Name */}
                   <div className="col-md-4">
                    <label className="form-label">Business Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="business_name"
                      value={formData.business_name}
                      onChange={handleChange}
                      placeholder="Enter Business Name"
                      disabled={readonly}
                    />
                  </div>
                  
                  {/* Designation */}
                  <div className="col-md-4">
                    <label className="form-label">Designation</label>
                    <input
                      type="text"
                      className="form-control"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="Enter Designation"
                      disabled={readonly}
                    />
                  </div>

                  
                  {/* Location */}
                  <div className="col-md-4">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter Location"
                      disabled={readonly}
                    />
                  </div>

                  
                  {/* Pincode */}
                  <div className="col-md-4">
                    <label className="form-label">Pincode</label>
                    <input
                      type="text"
                      className="form-control"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="Enter Pincode"
                      disabled={readonly}
                    />
                  </div>


                  {/* Customer Status */}
                  <div className="col-md-3">
                    <label className="form-label">Customer Status *</label>
                    <select
                      className={`form-select ${formErrors.customer_status ? 'is-invalid' : ''}`}
                      name="customer_status"
                      onChange={handleChange}
                      disabled={readonly}
                    >
                      <option value="">Select</option>
                      <option>Interested</option>
                      <option>Not Interested</option>
                      <option>DND</option>
                      <option>Escalate</option>
                    </select>
                    <i className='text-danger' style={{ fontSize: "13px" }}>
                      {formErrors.customer_status ? '*This field is required' : ''}
                    </i>
                  </div>

                  {/* Loan Type */}
                  <div className="col-md-3">
                    <label className="form-label">Loan Type *</label>
                    <select
                      className={`form-select ${formErrors.loan_type ? 'is-invalid' : ''}`}
                      name="loan_type"
                      value={formData.loan_type}
                      onChange={handleChange}
                      disabled={readonly}
                    >
                      <option value="">Select</option>
                      <option>Personal</option>
                      <option>Business</option>
                      <option>Professional</option>
                    </select>
                    <i className='text-danger' style={{ fontSize: "13px" }}>
                      {formErrors.loan_type ? '*This field is required' : ''}
                    </i>
                  </div>

                  {/* Follow Up Date */}
                  <div className="col-md-3">
                    <label className="form-label">Follow Up *</label>
                    <input
                      type="date"
                      className={`form-control ${formErrors.follow_up ? 'is-invalid' : ''}`}
                      name="follow_up"
                      value={formData.follow_up}
                      onChange={handleChange}
                      disabled={readonly}
                    />
                    <i className='text-danger' style={{ fontSize: "13px" }}>
                      {formErrors.follow_up ? '*This field is required' : ''}
                    </i>
                  </div>

                      {/* Follow Up Time */}
                      <div className="col-md-3">
                        <label className="form-label">Follow Up Time</label>
                        <select
                          className="form-select"
                          name="follow_up_time"
                          value={formData.follow_up_time}
                          onChange={handleChange}
                          disabled={readonly}
                        >
                          <option value="">Select Time Range</option>
                          <option value="09:00-10:00">09:00 AM - 10:00 AM</option>
                          <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                          <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
                          <option value="12:00-13:00">12:00 PM - 01:00 PM</option>
                          <option value="13:00-14:00">01:00 PM - 02:00 PM</option>
                          <option value="14:00-15:00">02:00 PM - 03:00 PM</option>
                          <option value="15:00-16:00">03:00 PM - 04:00 PM</option>
                          <option value="16:00-17:00">04:00 PM - 05:00 PM</option>
                        </select>
                      </div>

                  {/* Recording File Upload */}
                   <div className="col-md-6">
                    <label className="form-label">Upload Recording</label>
                    <input
                      type="file"
                      className="form-control"
                      name="recording_file_updated"
                      onChange={handleFileChange}
                      disabled={readonly}
                    />
                  </div>

                  {/* Remarks */}
                  <div className="col-md-12">
                    <label className="form-label">Remarks *</label>
                    <textarea
                      className={`form-control ${formErrors.remarks ? 'is-invalid' : ''}`}
                      name="remarks"
                      value={formData.remarks}
                      onChange={handleChange}
                      placeholder="Enter Remarks"
                      disabled={readonly}
                    />
                    <i className='text-danger' style={{ fontSize: "13px" }}>
                      {formErrors.remarks ? '*This field is required' : ''}
                    </i>
                  </div>

                  {/* Submit button */}
                  <div className="col-12">
                    <button style={{float:"right"}} type="submit" className="btn btn-primary">Update Lead</button>
                  </div>
                </form>
        </CCardBody>      
                {/* Loan Detail Modal */}
                <Modal show={show} onHide={handleClose} centered size="lg">
                  <Modal.Header closeButton>
                    <Modal.Title>Loan Details</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h5>Personal Loan</h5>
                    <p>Here you can show loan detail form or data...</p>
                    <h5>Business Loan</h5>
                    <p>Here you can show loan detail form or data...</p>
                    <h5>Professional Loan</h5>
                    <p>Here you can show loan detail form or data...</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                  </Modal.Footer>
                </Modal>
              </CCard> 
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default AddLead;
