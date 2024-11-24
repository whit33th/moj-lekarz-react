import { useState, lazy, Suspense } from "react"
import { BrowserRouter as Router, useLocation } from "react-router-dom"
import ScrollToTop from "./utils/scrollToTop"

import Workspace from "./layouts/Workspace"
import UserLayout from "./layouts/UserLayout"
import useStore from './data/store'

const FirmRoutes = lazy(() => import("./helpers/Routes/FirmRoutes"))
const AdminRoutes = lazy(() => import("./helpers/Routes/AdminRoutes"))
const UserRoutes = lazy(() => import("./helpers/Routes/UserRoutes"))
const DoctorRoutes = lazy(() => import("./helpers/Routes/DoctorRoutes"))
import useIsAuth from './hooks/AuthHooks/useIsAuth'

function App() {
  // const [role] = useState("admin"); // 'doctor', 'admin', 'firm'
  const { role, isAuth } = useStore()
  
  return (

    <Router>
      <ScrollToTop />

      <Suspense>
        {role === "patient" || !isAuth ? (
          <UserLayout>
            <UserRoutes />
          </UserLayout>
        ) : (
          <Workspace role={role}>
            {role === "doctor" && <DoctorRoutes />}
            {role === "admin" && <AdminRoutes />}
            {role === "firm" && <FirmRoutes />}
          </Workspace>
        )}
      </Suspense>
    </Router>

  )
}

export default App
