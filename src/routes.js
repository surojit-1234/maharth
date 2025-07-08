import React from 'react'

// const About = React.lazy(() => import('./views/About'));
// const AssignedProjects = React.lazy(() => import('./views/AssignedProjects'));
// const AttendanceReview = React.lazy(() => import('./views/AttendanceReview'));
// const Canvas = React.lazy(() => import('./views/canvas/Canvas'));
// const Evaluation = React.lazy(() => import('./views/Evaluation'));
// const FolderStructure = React.lazy(() => import('./views/FolderStructure'));
// const Forum = React.lazy(() => import('./views/Forum'));
// const Guidelines = React.lazy(() => import('./views/Guidelines'));
// const HRPolicy = React.lazy(() => import('./views/HRPolicy'));
// const Policies = React.lazy(() => import('./views/Policies'));
// const Portfolio = React.lazy(() => import('./views/Portfolio'));
// const Travels = React.lazy(() => import('./views/Travels'));

// const Login = React.lazy(() => import('./views/login/Login'));
// const AddLead = React.lazy(() => import('./views/dataTable/AddLead'));
// const Dashboard = React.lazy(() => import('./views/dataTable2/Dashboard'));

import Login from './views/login/Login';
import AddLead from './views/dataTable/AddLead';
import Dashboard from './views/dataTable2/Dashboard';
import AssignLeads from './views/assign-leads/AssignLeads';
import LoanDeatils from './views/loan-details/LoanDeatils';

const routes = [
  // {path: '/about', name: 'About', element: About},
  // {path: '/assignedProjects', name: "Assigned Projects", element: AssignedProjects},
  // {path: '/attendanceReview', name: "Attendance Review", element: AttendanceReview},
  // {path: '/canvas', name: "Canvas", element: Canvas},
  // {path: '/evaluation', name: "Evaluation", element: Evaluation},
  // {path: '/folderStructure', name: "Folder Structure", element: FolderStructure},
  // {path: '/forum', name: "Forum", element: Forum},
  // {path: '/guidelines', name: "Guidelines", element: Guidelines},
  // {path: '/hrPolicy', name: "HR Policy", element: HRPolicy},
  // {path: '/policies', name: "Policies", element: Policies},
  // {path: '/portfolio', name: "Portfolio", element: Portfolio},
  // {path: '/travels', name: "Travels", element: Travels}
  { path: '/login', name: "Login", element: Login },
  { path: '/add-lead/:index', name: "Add Lead", element: AddLead },
  { path: '/dashboard', name: "Dashboard", element: Dashboard },
  { path: '/assign-leads', name: "Assign Leads", element: AssignLeads },
  { path: '/loan-detail', name: "Loan Detail", element: LoanDeatils }
]

export default routes;
