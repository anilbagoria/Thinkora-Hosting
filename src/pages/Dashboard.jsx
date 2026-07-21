import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"

import Sidebar from "../components/core/Dashboard/Sidebar"

function Dashboard() {
  const { loading: profileLoading } = useSelector((state) => state.profile)
  const { loading: authLoading } = useSelector((state) => state.auth)

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="relative flex min-w-0 flex-col lg:flex-row min-h-[calc(100vh-3.5rem)]">
      <Sidebar />
      <div className="h-auto flex-1 min-w-0 overflow-auto lg:h-[calc(100vh-3.5rem)]">
        <div className="mx-auto w-full max-w-[1000px] px-4 py-10 sm:px-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
