//Dashboard
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
import { IoIosSearch } from "react-icons/io";
import NotificationScheduler from '../../components/notification';

const getBadge = (status) => {
  switch (status) {
    case 1: return 'info';
    case 2: return 'secondary';
    case 3: return 'danger';
    case 4: return 'warning';
    case 5: return '';
    default: return '';
  }
};

const mapStatusText = (status) => {
  switch (status) {
    case 1: return 'Interested';
    case 2: return 'Not Interested';
    case 3: return 'DND';
    case 4: return 'Escalate';
    case 5: return '';
    default: return '';
  }
};

// const[todayFollowups,setTodayFollowUps] = useState([]);

// useEffect(() => {
//   const today = new Date();
//   today.setHours(0, 0, 0, 0);

//   const filteredFollowUps = items.filter((item) => {
//     if (!item.follow_up_date || item.follow_up_date.length === 0) return false;
//     let followUpDate;
//     if (typeof item.follow_up_date[0] === 'string') {
//       followUpDate = new Date(item.follow_up_date[0]);
//     } else {
//       followUpDate = new Date(item.follow_up_date[0]);
//     }
//     if (isNaN(followUpDate.getTime())) return false;
//     followUpDate.setHours(0, 0, 0, 0);
//     return followUpDate.getTime() === today.getTime();
//   });
//   setTodayFollowUps(filteredFollowUps);
// }, [items]);

// const [todayFollowups, setTodayFollowups] = useState([]);

// useEffect(() => {
//   const todayMidnight = new Date();
//   todayMidnight.setHours(0, 0, 0, 0);
//   const filtered = items.filter(item => {
//     if (item.follow_up_date?.length > 0) {
//       const fDate = new Date(item.follow_up_date[0]);
//       fDate.setHours(0, 0, 0, 0);
//       return fDate.getTime() === todayMidnight.getTime();
//     }
//     return false;
//   });
//  setTodayFollowups(filtered);
// }, [items]);

// useEffect(()=> {
//     console.log("Today's Follow Up", todayFollowups);
// },[todayFollowups]);


const baseColumns = [
  { key: 'follow_up_date', label: 'Follow Up', _style: { width: '200px' } },
  { key: 'fname', label: 'First Name', _style: { width: '150px' } },
  { key: 'lname', label: 'Last Name', _style: { width: '150px' } },
  { key: 'mobile', label: 'Mobile No.', _style: { width: '150px' } },
  { key: 'email', label: 'Email ID', _style: { width: '200px' } },
  { key: 'customer_status', label: 'Status', _style: { width: '120px' } },
  { key: 'customer_type', label: 'Customer Type', _style: { width: '180px' } },
  { key: 'business_name', label: 'Business Name', _style: { width: '250px' } },
  { key: 'designation', label: 'Designation', _style: { width: '150px' } },
  { key: 'location', label: 'Location', _style: { width: '150px' } },
  { key: 'pincode', label: 'Pincode', _style: { width: '120px' } },
  { key: 'loan_type', label: 'Loan Type', _style: { width: '150px' } },
  { key: 'remarks', label: 'Remarks', _style: { width: '200px' } },
  { key: 'action', label: 'Action', _style: { width: '100px' } },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const time = useSelector((state) => state.time);

  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [audioSrc, setAudioSrc] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'Admin';

  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads();
  }, []);

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
        const allLeads = res.data.data;
        setItems(allLeads);
        localStorage.setItem('allLeads', JSON.stringify(allLeads));
        console.log("Dashboard Data: ",res.data.data);
        // Get today's date (normalized to midnight)
        const todayMidnight = new Date();
        todayMidnight.setHours(0, 0, 0, 0);
  
        // Filter today's follow-ups
        const todaysFollowups = allLeads.filter(item => {
          if (item.follow_up_date?.length > 0) {
            const fDate = new Date(item.follow_up_date[0]);
            fDate.setHours(0, 0, 0, 0);
            return fDate.getTime() === todayMidnight.getTime();
          }
          return false;
        });
  
        // Store today's follow-ups in localStorage
        localStorage.setItem('todaysFollowups', JSON.stringify(todaysFollowups));

        console.log("todaysFollowups:",todaysFollowups)
  
        console.log("Today's Followups stored in localStorage:", todaysFollowups);
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

  // Timer effect
  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        dispatch({ type: 'incrementTime' });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, dispatch]);

  // Handle start timer and navigate
  const handleStart = (lead) => {
    setIsRunning(true);
    dispatch({ type: 'startTimer' });
    dispatch({ type: 'resetTime' });
    navigate(`/add-lead/${lead.id}`, { state: { lead } });
  };

  const requiredFields = [
    'fname', 'lname', 'email', 'mobile',
    'customer_type', 'customer_status', 'loan_type',
    'follow_up_date', 'remarks'
  ];

  const isLeadComplete = (lead) => {
    return requiredFields.every(field => {
      const value = lead[field];
      if (Array.isArray(value)) {
        return value.length > 0; // For arrays like remarks, follow_up_date, follow_up_time
      }
      return value !== undefined && value !== null && value.toString().trim() !== '';
    });
  };

  // Filter for search
  const filteredItems = items.filter(item => {
    const flatItem = Object.entries(item)
      .map(([key, value]) => {
        if (Array.isArray(value)) return value.join(' ');
        if (typeof value === 'object' && value !== null) return JSON.stringify(value);
        return value;
      })
      .join(' ')
      .toLowerCase();

    const telecallerName = item.telecaller_name?.toLowerCase() || '';

    return (
      flatItem.includes(searchTerm.toLowerCase()) ||
      telecallerName.includes(searchTerm.toLowerCase())
    );
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0); // normalize




  /*----====Toast notification as per today's date and time----===*/
// const [notifiedLeadIds, setNotifiedLeadIds] = useState([]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const allLeads = JSON.parse(localStorage.getItem('allLeads') || '[]');
//       const now = new Date();
  
//       allLeads.forEach((lead) => {
//         if (!lead.follow_up_date?.[0] || !lead.follow_up_time?.[0]) return;
  
//         const followUpDate = new Date(lead.follow_up_date[0]);
//         const [hours, minutes] = lead.follow_up_time[0].split(':').map(Number);
//         followUpDate.setHours(hours, minutes, 0, 0); // Set time
  
//         const timeDiff = followUpDate - now;

//         console.log("time-differences: ", timeDiff);
  
//         // Check if follow-up is within next 10 minutes
//         if (
//           timeDiff > 0 &&
//           timeDiff <= 10 * 60 * 1000 && // within 10 mins
//           !notifiedLeadIds.includes(lead.id)
//         ) {
//           toast.info(`Upcoming Follow-up: ${lead.fname} ${lead.lname} at ${lead.follow_up_time[0]}`, {
//             position: 'top-right',
//             autoClose: 8000,
//           });
  
//           setNotifiedLeadIds((prev) => [...prev, lead.id]);
//         }
//       });
//     }, 60 * 1000); // every minute
  
//     return () => clearInterval(interval);
//   }, [notifiedLeadIds]);

  return (
    <section className="dashboard-wrap my-2">
      <CCard>
        <CCardHeader className="d-flex align-items-center justify-content-between">
          <strong>Dashboard</strong>
          <div className="col-md-3 position-relative">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IoIosSearch className='search-icon' />
          </div>
        </CCardHeader>
        <CCardBody>
          <CSmartTable
            className="dataTable-2"
            columns={
              isAdmin
                ? [
                    { key: 'actions', label: 'Actions', _style: { width: '80px' }, filter: false, sorter: false },
                    { key: 'telecaller_name', label: 'Telecaller', _style: { width: '180px' } },
                    ...baseColumns,
                  ]
                : [
                    { key: 'actions', label: 'Actions', _style: { width: '80px' }, filter: false, sorter: false },
                    ...baseColumns,
                  ]
            }
            items={filteredItems}
            columnSorter
            pagination
            itemsPerPage={20}
            cleaner
            scopedColumns={{
              actions: (item) => {
                const followUpDate = item.follow_up_date && item.follow_up_date.length > 0
                  ? new Date(item.follow_up_date[0])
                  : null;
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                let isTodayFollowUp = false;
                if (followUpDate) {
                  followUpDate.setHours(0, 0, 0, 0);
                  isTodayFollowUp = followUpDate.getTime() === today.getTime();
                }

                const complete = isLeadComplete(item);

                return (
                  <td className={isTodayFollowUp ? 'green-row' : ''}>
                    {complete && !isTodayFollowUp ? (
                      <CButton size="sm" color="success" variant="outline" disabled>
                        Done
                      </CButton>
                    ) : (
                      <CButton
                        className='btn btn-outline-info'
                        size="sm"
                        color={isTodayFollowUp ? "success" : "info"}
                        variant="outline"
                        onClick={() => {
                          setIsRunning(true);
                          dispatch({ type: 'startTimer' });
                          dispatch({ type: 'resetTime' });
                        complete && isTodayFollowUp ? 
                        navigate(`/add-lead/${item.id}`, {
                          state: { lead: item, readWriteOnly: true }
                        }) : handleStart(item)
                        }
                      }
                      >
                        Start
                      </CButton>
                    )}
                  </td>
                );
              },

              action: (item) => (
                // isLeadComplete(item) ? (
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
                //) 
                // : (
                //   <td>
                //     {/* Pending or incomplete */}
                //   </td>
                // )
              ),

              email: (item) => <td><TruncateText text={item.email} maxLength={6} /></td>,
              loan_type: (item) => <td><TruncateText text={item.loan_type} maxLength={8} /></td>,

              remarks: (item) => {
                // Show last remark
                const remarksArr = Array.isArray(item.remarks) ? item.remarks : [];
                const lastRemark = remarksArr.length > 0 ? remarksArr[remarksArr.length - 1] : '';
                return (
                  <td>
                    <TruncateText text={lastRemark} maxLength={7} />
                  </td>
                );
              },

              location: (item) => <td><TruncateText text={item.location} maxLength={7} /></td>,

              follow_up_date: (item) => {
                if (!item.follow_up_date || item.follow_up_date.length === 0) return <td />;
                const followUpDate = new Date(item.follow_up_date[0]);
                followUpDate.setHours(0, 0, 0, 0);
                const isTodayFollowUp = followUpDate.getTime() === today.getTime();
                return (
                  <td className={isTodayFollowUp ? "green-row" : ""}>
                    {followUpDate.toLocaleDateString('en-US')}
                  </td>
                );
              },

              customer_status: (item) => (
                <td>
                  <CBadge color={getBadge(item.customer_status)}>
                    {mapStatusText(item.customer_status)}
                  </CBadge>
                </td>
              ),

              // recording_file: (item) => (
              //   <td>
              //     {item.recordings && item.recordings.length > 0 ? (
              //       <CButton
              //         size="sm"
              //         color="primary"
              //         variant="outline"
              //         onClick={() =>
              //           setAudioSrc(`http://localhost:8000/uploads/${item.recordings[item.recordings.length - 1]}`)
              //         }
              //       >
              //         <FaPlay style={{ marginRight: '5px' }} />
              //         Play
              //       </CButton>
              //     ) : (
              //       ''
              //     )}
              //   </td>
              // ),

              // Optional: display latest follow-up time if available
              follow_up_time: (item) => {
                if (!item.follow_up_time || item.follow_up_time.length === 0) return <td />;
                const latestTime = item.follow_up_time[item.follow_up_time.length - 1];
                return <td>{latestTime}</td>;
              },

              // Optional: display latest duration if available
              duration: (item) => {
                // Since your data shows empty duration[], can be handled accordingly
                if (!item.duration || item.duration.length === 0) return <td />;
                // Assuming duration is an array of seconds or string, adjust as needed
                const totalSeconds = item.duration.reduce((sum, d) => sum + d, 0);
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;
                return <td>{`${hours}:${minutes}:${seconds}`}</td>;
              },

            }}
            tableProps={{ responsive: true, hover: true, striped: true }}
            tableBodyProps={{ className: 'align-middle' }}
          />
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

      {!loading && items.length > 0 && (
        <NotificationScheduler leads={items} />
      )}
    </section>
  );
};

export default React.memo(Dashboard);