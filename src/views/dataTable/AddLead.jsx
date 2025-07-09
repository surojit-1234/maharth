//AddLead.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { SiGoogleforms } from "react-icons/si";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPlay } from 'react-icons/fa';
import { PiLineVertical } from "react-icons/pi";
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CSmartTable,
} from '@coreui/react-pro';
import { FiClock } from "react-icons/fi";

const AddLead = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const lead = location.state?.lead;

  //const allFiles = [];

  const[allFiles, setAllFiles] = useState([]);


  useEffect(() => {
    if (lead && lead.recordings && lead.remarks && lead.follow_up_date && lead.follow_up_time && lead.duration) {
      const combined = [];
      for (let i = 0; i < lead.recordings.length; i++) {
        combined.push({
          recording: lead.recordings[i],
          remark: lead.remarks[i] || '', // fallback in case of mismatch
          follow_up_date: lead.follow_up_date[i] || '',
          follow_up_time: lead.follow_up_time[i] || '',
          duration: lead.duration[i] || ''
        });
      }
      setAllFiles(combined);
    }
  }, [lead]);
  
 

  //console.log("LEAD DATA",lead.recordings);
  // const lead = location.state?.lead;
  const readonly = location.state?.readonly || false;

  const readWriteOnly = location.state?.readWriteOnly || false;

  const time = useSelector((state) => state.time);
  const isTimerRunning = useSelector((state) => state.isTimerRunning);

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    mobile: '',
    customer_type: '',
    customer_status: '',
    loan_category: '',
    loan_type: '',
    follow_up: '',
    remarks: '',
    business_name: '',
    designation: '',
    location: '',
    pincode: '',
    follow_up_time: '',
    recordings: []
  });

  useEffect(()=>{
     console.log("Per Object: ",formData)
  },[formData])

  const [recordingFile, setRecordingFile] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [show, setShow] = useState(false);

  const [audioSrc, setAudioSrc] = useState(null);

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
      // customer_status: lead.customer_status || '',
      customer_status: lead.customer_status ? Number(lead.customer_status) : '',
      loan_type: lead.loan_type || '',
      // follow_up_date: lead.follow_up_date ? lead.follow_up_date.slice(0, 10) : '',
      // remarks: lead.remarks || '',
      business_name: lead.business_name || '',
      designation: lead.designation || '',
      location: lead.location || '',
      pincode: lead.pincode || '',
      // follow_up_time: lead.follow_up_time || ''
    });
  }, [lead]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // if (name === 'customer_status') {
    //   const statusObj = {
    //     'Interested': 1,
    //     'Not Interested': 2,
    //     'DND': 3,
    //     'Escalate': 4
    //   };
    //   setFormData((prev) => ({
    //     ...prev,
    //     [name]: statusObj[value] || ''
    //   }));
    // } 
    if (name === 'customer_status') {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value)
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
    // else {
    //   setFormData((prev) => ({
    //     ...prev,
    //     [name]: value
    //   }));
    // }

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

    const requiredFields = ['fname', 'lname', 'mobile', 'customer_status', 'remarks'];
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
      console.log("recording-file inside here ", formatTime(time))
      data.append('recording_file_update', recordingFile);
      data.append('duration', formatTime(time));
    }

    data.append('time_spent_seconds', time);

    function getMySQLDateTime() {
      const now = new Date();
      return now.toISOString().slice(0, 19).replace('T', ' ');
    }
    
    data.append('calling_date_time', getMySQLDateTime());
    // data.append('calling_date_time', new Date().toISOString());

    
    try {
      console.log("DataXXXX:",data);
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
        setTimeout(()=> {
          window.location.reload();
        },100);
        

        // setFormData({
        //   follow_up: '',
        //   remarks: [''],
        //   follow_up_time: '',
        //   recordings: []
        // });


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

  //it check loan type is buisness or not
  const activeOnBusiness = formData.customer_type.toLowerCase() === "" || formData.customer_type.toLowerCase() === "salaried" || formData.customer_type.toLowerCase() === "self employed";

  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-12 p-0 my-2">
            <div className="card shadow" id="lead-form">
              {/* <div className="card-body"> */}

              <CCard>
                <CCardHeader className="d-flex align-items-center justify-content-between">
                  <strong>{readonly? "Lead form" : "Update Lead"}</strong> 
                  <div className='right-side-content'>
                    <Button variant='none' onClick={() => window.open(`/loan-detail`, '_blank')}> 
                      <SiGoogleforms /> Loan Info
                    </Button>
                    {!readonly && <h5 className='clock-duration'>
                      <span><FiClock /></span>
                      {formatTime(time)}
                    </h5>}
                  </div>
                </CCardHeader>

              <CCardBody>
                <form className="row g-3" onSubmit={handleSubmit}>
                  
                  {/* First Name */}
                  <div className="col-md-4">
                    <label className="form-label">First Name</label>
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
                    <label className="form-label">Last Name</label>
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
                    <label className="form-label">Phone Number</label>
                    <input
                      type="text"
                      className={`form-control ${formErrors.mobile ? 'is-invalid' : ''}`}
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter Phone Number"
                      disabled={readonly || readWriteOnly}
                    />
                    <i className='text-danger' style={{ fontSize: "13px" }}>
                      {formErrors.mobile ? '*This field is required' : ''}
                    </i>
                  </div>

                  {/* Email */}
                  <div className="col-md-4">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control`}
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                      disabled={readonly}
                    />
                  </div>

                  {/* Customer Type */}
                  <div className="col-md-4">
                    <label className="form-label">Customer Type </label>
                    <select
                      className={`form-select form-control`}
                      name="customer_type"
                      value={formData.customer_type}
                      onChange={handleChange}
                      disabled={readonly}
                    >
                      <option value="">Select</option>
                      <option>Salaried</option>
                      <option>Self Employed</option>
                      <option>Business</option>
                    </select>
                  </div>

                   {/* Business Name */}
                   <div className="col-md-4">
                    <label className="form-label">Business Name</label>
                    <input
                      type="text"
                      className={`form-control`}
                      name="business_name"
                      value={formData.business_name}
                      onChange={handleChange}
                      placeholder="Enter Business Name"
                      disabled={readonly || activeOnBusiness}
                      style={activeOnBusiness ? { opacity: 0.3 } : {} }
                    />
                    {/* <i className='text-danger' style={{ fontSize: "13px" }}>
                      {formErrors.business_name ? '*This field is required' : ''}
                    </i> */}
                  </div>
                  
                  {/* Designation */}
                  <div className="col-md-4">
                    <label className="form-label">Designation</label>
                    <input
                      type="text"
                      className={`form-control`}
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="Enter Designation"
                      disabled={readonly}
                      // style={activeOnBusiness ? { opacity: 0.3 } : {} }
                    />
                  </div>

                  
                  {/* Location */}
                  <div className="col-md-4">
                    <label className="form-label">Location</label>
                    <input
                      type="text"
                      className={`form-control`}
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter Location"
                      disabled={readonly}
                      // style={activeOnBusiness ? { opacity: 0.3 } : {} }
                    />
                  </div>

                  
                  {/* Pincode */}
                  <div className="col-md-4">
                    <label className="form-label">Pincode</label>
                    <input
                      type="text"
                      className={`form-control`}
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="Enter Pincode"
                      disabled={readonly}
                      // style={activeOnBusiness ? { opacity: 0.3 } : {} }
                    />
                  </div>


                  {/* Customer Status */}
                  <div className="col-md-3">
                    <label className="form-label">Customer Status </label>
                    <select
                      className={`form-control form-select ${formErrors.customer_status ? 'is-invalid' : ''}`}
                      name="customer_status"
                      onChange={handleChange}
                      value={formData.customer_status}
                      disabled={readonly}
                    >
                      <option value="">Select</option>
                      <option value={1}>Interested</option>
                      <option value={2}>Not Interested</option>
                      <option value={3}>DND</option>
                      <option value={4}>Escalate</option>
                    </select>
                    <i className='text-danger' style={{ fontSize: "13px" }}>
                      {formErrors.customer_status ? '*This field is required' : ''}
                    </i>
                  </div>

                  {/*==Loan category---*/}
                  <div className="col-md-3">
                    <label className="form-label">Loan Category</label>
                    <select
                      className={`form-select form-control`}
                      name="loan_category"
                      value={formData.loan_category}
                      onChange={handleChange}
                      disabled={readonly}
                    >
                      <option value="">Select</option>
                      <option>Secured</option>
                      <option>Unsecured</option>
                    </select>
                    {/* <i className='text-danger' style={{ fontSize: "13px" }}>
                      {formErrors.loan_type ? '*This field is required' : ''}
                    </i> */}
                  </div>

                  {/* Loan Type */}
                  <div className="col-md-3">
                    <label className="form-label">Select Loan</label>
                    <select
                      className={`form-select form-control`}
                      name="loan_type"
                      value={formData.loan_type}
                      onChange={handleChange}
                      disabled={readonly}
                    >
                      <option value="">Select</option>
                      <option>LAP (Loan Against Proptery)</option>
                      <option>LAS (Loan Against Share), Securities, FD etc.</option>
                      <option>Housing Loan</option>
                      <option>Project Loan</option>
                      <option>Personal Loan</option>
                      <option>Professional Loan (For Doctor & CA Only)</option>
                      <option>Business Loan</option>
                      <option>Overdraft</option>
                    </select>
                    {/* <i className='text-danger' style={{ fontSize: "13px" }}>
                      {formErrors.loan_type ? '*This field is required' : ''}
                    </i> */}
                  </div>

                  {/* Follow Up Date */}
                  <div className="col-md-3">
                    <label className="form-label">Follow Up </label>
                    <input
                      type="date"
                      className={`form-control`}
                      name="follow_up"
                      value={formData.follow_up}
                      onChange={handleChange}
                      disabled={readonly}
                    />
                    {/* <i className='text-danger' style={{ fontSize: "13px" }}>
                      {formErrors.follow_up ? '*This field is required' : ''}
                    </i> */}
                  </div>

                      {/* Follow Up Time */}
                      <div className="col-md-3">
                        <label className="form-label">Follow Up Time</label>
                        <select
                          className={`form-select form-control`}
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
                          <option value="18:00-19:00">06:00 PM - 07:00 PM</option>
                          <option value="19:00-20:00">07:00 PM - 08:00 PM</option>
                        </select>
                        {/* <i className='text-danger' style={{ fontSize: "13px" }}>
                          {formErrors.follow_up_time ? '*This field is required' : ''}
                        </i> */}
                      </div>

                  {/* Recording File Upload */}
                  { !readonly && 
                   <div className="col-md-6">
                    <label className="form-label">Upload Recording</label>
                    <input
                      type="file"
                      className={`form-control`}
                      name="recording_file_update"
                      onChange={handleFileChange}
                      disabled={readonly}
                    />
                    {/* <i className='text-danger' style={{ fontSize: "13px" }}>
                        {formErrors.recording_file_update ? '*This field is required' : ''}
                    </i> */}
                  </div>
                }

                

                  {/* {console.log("ALL remarks from Lead: ",lead.remarks)} */}

                  {/* Remarks */}
                  { !readonly && 
                  <div className="col-md-12">
                    <label className="form-label">Remarks </label>
                    {/* {console.log("remarksxxx: ", formData.remarks)} */}
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
                  }


              {allFiles.length>0 && 
               <div className='all-data-container'>
                  <h2 className='title'>History</h2>
                  {console.log("ALL HISTORY: ", allFiles)}
                  <div className='all-history'>
                    {allFiles.map((file, index) => (
                      <div key={index} className="gap-1 mb-2 box p-2">
                        {/* <div className='date'><b className='text-success'>Follow Up Date: </b>{ file.follow_up_date && file.follow_up_date }</div> */}
                        {/* <PiLineVertical /> */}
                        {/* <div className='time'> <b className='text-success'>Follow Up Time: </b>{ file.follow_up_time && file.follow_up_time }</div> */}
                        {/* <PiLineVertical /> */}
                        {file.recording && (
                          <>
                            <b className='text-success'>Recording: </b>
                            <CButton
                              style={{backgroundColor:"rgb(0, 158, 223)"}}
                              className='m-1'
                              size="sm"
                              color="primary"
                              variant="outline"
                              onClick={() => setAudioSrc(`http://localhost:8000/uploads/${file.recording}`)}
                            >
                              <FaPlay /> <span>Play</span>
                            </CButton>
                          </>
                        )}
                        <PiLineVertical style={{fontSize:"20px"}}/>  {/*--For vertical Line--*/}
                        {file.duration && 
                         <span className='remark'>
                            <b className='text-success'>Duration: </b> <span className="m-1">{file.duration}</span>
                         </span>
                        } 
                        <PiLineVertical style={{fontSize:"20px"}}/>  {/*--For vertical Line--*/}
                        <span className='follow-up-date-time'>
                          <b className='text-success'>Follow Up date & Time:</b>
                          <b> {file.follow_up_date} & {file.follow_up_time}</b>
                        </span> 
                        <div className='my-1'>
                          {file.remark && 
                           <span className='remark'>
                             <b className='text-success'>Remark: </b> 
                             <span className="m-1">{file.remark}</span>
                            </span>
                          }
                        </div>
                      </div>
                    ))}
                  </div>  
                 </div> 
                }

                  {/* Submit button */}
                 {!readonly &&  <div className="col-12 d-flex align-items-center justify-content-center update-btn">
                    <button style={{float:"right"}} type="submit" className="btn btn-primary">Update Lead</button>
                  </div>
                 }
                </form>


              </CCardBody>      
              </CCard> 
                {audioSrc && (
                  <div className="audio-modal-backdrop">
                    <div className="audio-modal">
                      <div className="audio-modal-header">
                        <strong>Recording</strong>
                        <button onClick={() => setAudioSrc(null)} className="btn-close"></button>
                      </div>
                      <div className="audio-modal-body">
                        <audio controls autoPlay style={{ width: '100%' }}>
                          <source src={audioSrc} type="audio/mpeg" />
                          Your browser does not support the audio element.
                        </audio>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default React.memo(AddLead);
