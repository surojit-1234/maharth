import { FiLogIn } from "react-icons/fi";
import { FaRegAddressCard } from "react-icons/fa";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineAssignment } from "react-icons/md";
const user = JSON.parse(localStorage.getItem('user') || '{}');
const isAdmin = user.role === 'Admin';
const leftMenus = [
  {
    id: 3,
    icon: <LuLayoutDashboard />,
    name: "Dashboard",
    path: "/dashboard",
    dropdown_items: []
  },
  {
    id: 4,
    icon: <MdOutlineAssignment />,
    name: "Assign Leads",
    path: "/assign-leads",
    dropdown_items: []
  }
];

// ✅ Filter based on admin
const filteredMenus = isAdmin
  ? leftMenus
  : leftMenus.filter(menu => menu.name === "Dashboard");

  console.log("Left Filtered Menus", filteredMenus);

//export default filteredMenus;
 

export default leftMenus;