import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CSmartTable,
} from '@coreui/react-pro';
import './style.css';
import { useNavigate } from 'react-router-dom';
import TruncateText from './TruncateText';
import { FaPlay } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

const getBadge = (status) => {
  switch (status) {
    case 1: return 'success';
    case 2: return 'secondary';
    case 3: return 'danger';
    default: return 'primary';
  }
};

const mapStatusText = (status) => {
  switch (status) {
    case 1: return 'Interested';
    case 2: return 'Not Interested';
    case 3: return 'DND';
    default: return 'Not Selected';
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const time = useSelector((state) => state.time);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'Admin';

  const baseColumns = [
    { key: 'fname', label: "First Name", _style: { width: '280px' } },
    { key: 'lname', label: "Last Name", _style: { width: '280px' } },
    { key: 'mobile', label: 'Mobile No.', _style: { width: '200px' } },
    { key: 'email', label: 'Email ID', _style: { width: '240px' } },
    { key: 'customer_type', label: 'Customer Type', _style: { width: '320px' } },
    { key: 'business_name', label: 'Business Name', _style: { width: '350px' } },
    { key: 'designation', label: 'Designation', _style: { width: '250px' } },
    { key: 'location', label: 'Location', _style: { width: '180px' } },
    { key: 'pincode', label: 'Pincode', _style: { width: '200px' } },
    { key: 'customer_status', label: 'Status', _style: { width: '160px' } },
    { key: 'loan_type', label: 'Loan Type', _style: { width: '240px' } },
    { key: 'remarks', label: 'Remarks', _style: { width: '200px' } },
    { key: 'follow_up', label: 'Follow Up', _style: { width: '200px' } },
    { key: 'recording_file', label: 'Recording', _style: { width: '100px' }, filter: false, sorter: false },
    { key: 'action', label: 'Action', _style: { width: '100px' }, filter: false, sorter: false },
  ];

  const columns = isAdmin
    ? [
        { key: 'actions', label: 'Actions', _style: { width: '80px' }, filter: false, sorter: false },
        { key: 'telecaller_name', label: 'Telecaller', _style: { width: '180px' } },
        ...baseColumns,
      ]
    : [
        { key: 'actions', label: 'Actions', _style: { width: '80px' }, filter: false, sorter: false },
        ...baseColumns,
      ];

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        dispatch({ type: 'incrementTime' });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, dispatch]);

  const fetchLeads = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Token not found, please login');
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get('http://localhost:8000/maharth/alllead', {
        headers: { 'access-token': token },
      });
      if (res.data.success) {
        setItems(res.data.data);
        console.log("Dashboard: ",res.data.data);
      } else {
        alert(res.data.msg || 'Failed to fetch leads');
      }
    } catch (err) {
      console.error('Fetch leads error:', err);
      alert('Error fetching leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStart = (lead) => {
    setIsRunning(true);
    dispatch({ type: 'startTimer' });
    dispatch({ type: 'resetTime' });
    navigate(`/add-lead/${lead.id}`, { state: { lead } });

  };

  const requiredFields = [
    'fname', 'lname', 'email', 'mobile',
    'customer_type', 'customer_status', 'loan_type',
    'follow_up', 'remarks'
  ];

  const isLeadComplete = (lead) => {
    return requiredFields.every(field => {
      const value = lead[field];
      return value !== undefined && value !== null && value.toString().trim() !== '';
    });
  };
  

  if (loading) return <div className="container py-3">Loading leads...</div>;
  if (!items.length) return <div className="container py-3">No leads found.</div>;
  
  const updatedLeads = JSON.parse(localStorage.getItem('updatedLeads') || '[]');
  return (
    <section className="dashboard-wrap my-3">
      <CCard>
        <CCardHeader className="d-flex align-items-center justify-content-between">
          <strong>Dashboard</strong>
        </CCardHeader>
        <CCardBody>
          <CSmartTable
            className="dataTable-2"
            columns={columns}
            items={items}
            columnSorter
            pagination
            itemsPerPageSelect
            itemsPerPage={10}
            cleaner
            scopedColumns={{
              actions: (item) => (
                <td>
                  {isLeadComplete(item) ? (
                    <CButton size="sm" color="success" variant="outline" disabled>
                      Done
                    </CButton>
                  ) : (
                    <CButton
                      size="sm"
                      color="info"
                      variant="outline"
                      onClick={() => handleStart(item)}
                    >
                      Start
                    </CButton>
                  )}
                </td>
              ),

              action: (item) => (
                isLeadComplete(item) ? (
                  <td>
                    <CButton
                      size="sm"
                      color="info"
                      variant="outline"
                      onClick={() =>
                        navigate(`/add-lead/${item.id}`, {
                          state: { lead: item, readonly: true }
                        })
                      }
                    >
                      Show
                    </CButton>
                  </td>
                ) : (
                  <td />
                )
              ),
              
              ...(isAdmin && {
                telecaller_name: (item) => <td><TruncateText text={item.telecaller_name} /></td>,
              }),
              email: (item) => <td><TruncateText text={item.email} maxLength={6} /></td>,
              // mobile: (item) => <td><TruncateText text={item.mobile} maxLength={5} /></td>,
              // customer_type: (item) => <td><TruncateText text={item.customer_type} maxLength={6} /></td>,
              remarks: (item) => <td><TruncateText text={item.remarks} maxLength={10} /></td>,
              // business_name: (item) => <td><TruncateText text={item.business_name} maxLength={12} /></td>,
              // designation: (item) => <td><TruncateText text={item.designation} maxLength={12} /></td>,
              location: (item) => <td><TruncateText text={item.location} maxLength={7} /></td>,
              // pincode: (item) => <td>{item.pincode || '-'}</td>,
              follow_up: (item) => {
                if (!item.follow_up) return <td />;
                return <td>{new Date(item.follow_up).toLocaleDateString('en-US')}</td>;
              },
              customer_status: (item) => (
                <td>
                  <CBadge color={getBadge(item.customer_status)}>
                    {mapStatusText(item.customer_status)}
                  </CBadge>
                </td>
              ),
              recording_file: (item) => (
                <td>
                  {item.recording_file ? (
                    <a
                      href={`http://localhost:8000/uploads/${item.recording_file}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaPlay /> Duration 10sec
                    </a>
                  ) : (
                    'No file'
                  )}
                </td>
              ),
            }}
            tableProps={{ responsive: true, hover: true, striped: true }}
            tableBodyProps={{ className: 'align-middle' }}
          />
        </CCardBody>
      </CCard>
    </section>
  );
};

export default Dashboard;
