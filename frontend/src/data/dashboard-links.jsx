import { ACCOUNT_TYPE } from "../utils/constants"

export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/analytics",
    type: ACCOUNT_TYPE.WA_MANAGER,
    icon: "VscDashboard",
  },
  {
    id: 3,
    name: "Interest Form",
    path: "/dashboard/interest-form",
    type: ACCOUNT_TYPE.WA_MANAGER,
    icon: "VscCalendar",
  },
  {
    id: 4,
    name: "Activities",
    path: "/dashboard/activities",
    type: ACCOUNT_TYPE.DISTRIBUTION_CENTER_MANAGER,
    icon: "VscPreview",
  },
  {
    id: 5,
    name: "Rewards",
    path: "/dashboard/rewards",
    type: ACCOUNT_TYPE.DISTRIBUTION_CENTER_MANAGER,
    icon: "VscGraph",
  },
  {
    id: 6,
    name: "Goals",
    path: "/dashboard/goals",
    type: ACCOUNT_TYPE.DISTRIBUTION_CENTER_MANAGER,
    icon: "VscChecklist",
  },
]