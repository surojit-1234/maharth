import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './style.css'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CSmartTable,
} from '@coreui/react-pro';


const AssignLeads = () => {
  const navigate = useNavigate();
  const [telecallers, setTelecallers] = useState([])
  const [selectedTelecaller, setSelectedTelecaller] = useState('')
  const [excelFile, setExcelFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState('');

  
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.role === 'Admin';

  useEffect(() => {
    const fetchTelecallers = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await axios.get('http://localhost:8000/maharth/alllead', {
          headers: { 'access-token': token }
        })

        if (res.data.success && res.data.telecallerData) {
          setTelecallers(res.data.telecallerData)
        } else {
          setMessage('Failed to load telecaller list')
        }
      } catch (error) {
        console.error('Error fetching telecaller list:', error)
        setMessage('Error fetching telecaller list')
      }
    }

    fetchTelecallers()
  }, [])

  const handleUpload = async () => {
    if (isAdmin && !selectedTelecaller || !excelFile) {
      setMessage('Please select telecaller and choose a file.')
      return
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData()
    formData.append('telecaller_id', selectedTelecaller)
    formData.append('excelUpload', excelFile)

    try {
      const token = localStorage.getItem('token')
      const res = await axios.post(
        'http://localhost:8000/maharth/uploadLeadFromExcel',
        formData,
        {
          headers: {
            'access-token': token,
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      if (res.data.success) {
        toast.success('Excel file uploaded successfully!');
        navigate("/dashboard")
      } else {
        setMessage('Upload failed: ' + (res.data.message || 'Unknown error'))
      }
    } catch (err) {
      console.error('Upload error:', err)
      setMessage('An error occurred during upload.')
    } finally {
      setUploading(false)
      setExcelFile(null)
    }
  }


  return (
    <div className="col-12 my-2">
    <CCard>
    <CCardHeader>
      <strong>Assign Leads from Excel</strong>
    </CCardHeader>
    
    <CCardBody>
      {message && (
        <div className="alert alert-info" role="alert">
          {message}
        </div>
      )}
    <div className='row'>
    {isAdmin ? (
      <div className="form-group mb-3 col-md-6">
        <label>Select Telecaller</label>

        <select
          className="form-select"
          value={selectedTelecaller}
          onChange={(e) => setSelectedTelecaller(e.target.value)}
        >
          <option value="">-- Select Telecaller --</option>
          {telecallers.map((tc) => (
            <option key={tc.id} value={tc.id}>
              {tc.name}
            </option>
          ))}
        </select>
      </div>) 
      : ""
    } 

      <div className="form-group mb-3 col-md-6">
        <label>Upload Excel File</label>
        <input
          type="file"
          accept=".xlsx, .xls"
          className="form-control"
          onChange={(e) => setExcelFile(e.target.files[0])}
        />
      </div>
    </div>  

      <button
        className="btn btn-primary"
        onClick={handleUpload}
        disabled={uploading}
        style={{float: "right"}}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </CCardBody>
    </CCard>
    </div>
  )
}

export default React.memo(AssignLeads);
