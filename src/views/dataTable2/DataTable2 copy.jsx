import React, { useState } from 'react'
import {
  CAvatar,
  CBadge,
  CButton,
  CCollapse,
  CSmartTable,
} from '@coreui/react-pro'
import './style.css';

const getBadge = (status) => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const DataTable2 = () => {
  const [details, setDetails] = useState([])

  const toggleDetails = (id) => {
    setDetails((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  const columns = [
    { key: 'avatar', label: '', filter: false, sorter: false },
    { key: 'name', _style: { width: '20%' } },
    {
      key: 'registered',
      sorter: (a, b) =>
        new Date(a.registered) > new Date(b.registered) ? 1 : -1,
    },
    { key: 'role', _style: { width: '20%' } },
    'status',
    {
      key: 'show_details',
      label: '',
      filter: false,
      sorter: false,
      _style: { width: '1%' },
    },
  ]

  const items = [
    {
      id: 1,
      name: 'Samppa Nori',
      avatar: '1.jpg',
      registered: '2021/03/01',
      role: 'Member',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Estavan Lykos',
      avatar: '2.jpg',
      registered: '2018/02/07',
      role: 'Staff',
      status: 'Banned',
    },
    {
      id: 3,
      name: 'Chetan Mohamed',
      avatar: '3.jpg',
      registered: '2020/01/15',
      role: 'Admin',
      status: 'Inactive',
    },
    {
      id: 4,
      name: 'Derick Maximinus',
      avatar: '4.jpg',
      registered: '2019/04/05',
      role: 'Member',
      status: 'Pending',
    },
    {
      id: 5,
      name: 'Friderik Dávid',
      avatar: '5.jpg',
      registered: '2022/03/25',
      role: 'Staff',
      status: 'Active',
    },
    {
        id: 6,
        name: 'Derick Maximinus',
        avatar: '4.jpg',
        registered: '2019/04/05',
        role: 'Member',
        status: 'Pending',
    },
    {
        id: 7,
        name: 'Derick Maximinus',
        avatar: '4.jpg',
        registered: '2019/04/05',
        role: 'Member',
        status: 'Pending',
    },
    {
        id: 8,
        name: 'Derick Maximinus',
        avatar: '4.jpg',
        registered: '2019/04/05',
        role: 'Member',
        status: 'Pending',
    },
    {
        id: 9,
        name: 'Derick Maximinus',
        avatar: '4.jpg',
        registered: '2019/04/05',
        role: 'Member',
        status: 'Inactive',
    },
    {
        id: 10,
        name: 'Derick Maximinus',
        avatar: '4.jpg',
        registered: '2019/04/05',
        role: 'Member',
        status: 'Active',
    },
    {
        id: 11,
        name: 'Derick Maximinus',
        avatar: '4.jpg',
        registered: '2019/04/05',
        role: 'Member',
        status: 'Pending',
    },
    {
        id: 12,
        name: 'Derick Maximinus',
        avatar: '4.jpg',
        registered: '2019/04/05',
        role: 'Member',
        status: 'Pending',
    },
    {
        id: 13,
        name: 'Derick Maximinus',
        avatar: '4.jpg',
        registered: '2019/04/05',
        role: 'Member',
        status: 'Active',
    },
  ]

  return (
    <CSmartTable
      className='dataTable-2'
      columns={columns}
      items={items}
      columnFilter
      columnSorter
      tableFilter
      pagination
      itemsPerPageSelect
      itemsPerPage={5}
      cleaner
      clickableRows
      selectable
      scopedColumns={{
        avatar: (item) => (
          <td>
            <CAvatar src={`../../images/avatars/${item.avatar}`} />
          </td>
        ),
        registered: (item) => {
          const date = new Date(item.registered)
          return (
            <td>{date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</td>
          )
        },
        status: (item) => (
          <td>
            <CBadge color={getBadge(item.status)}>{item.status}</CBadge>
          </td>
        ),
        show_details: (item) => (
          <td className="py-2">
            <CButton
              color="primary"
              variant="outline"
              shape="square"
              size="sm"
              onClick={() => toggleDetails(item.id)}
            >
              {details.includes(item.id) ? 'Hide' : 'Show'}
            </CButton>
          </td>
        ),
        details: (item) =>
          details.includes(item.id) && (
            <CCollapse visible={true}>
              <div className="p-3">
                <h4>{item.name}</h4>
                <p className="text-body-secondary">
                  User since: {item.registered}
                </p>
                <CButton size="sm" color="info">
                  User Settings
                </CButton>
                <CButton size="sm" color="danger" className="ms-1">
                  Delete
                </CButton>
              </div>
            </CCollapse>
          )
      }}
      tableProps={{ responsive: true, hover: true, striped: true }}
      tableBodyProps={{ className: 'align-middle' }}
    />
  )
}

export default DataTable2
