import { useState, lazy, Suspense, useEffect } from "react"
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
import { SkeletonTheme } from 'react-loading-skeleton'

function App() {
  const { role, isAuth } = useStore()
  console.log('role', role, 'isAuth', isAuth)

  const { checkIsAuth } = useIsAuth()
  useEffect(() => {
    checkIsAuth()
  }, [checkIsAuth]) // Срабатывает только один раз после монтирования


  return (
    <SkeletonTheme baseColor="#f0f0f0" highlightColor="#ececec" borderRadius={12}>
      <Router>
        <ScrollToTop />

        <Suspense>
          {role === "patient" && !isAuth ? (
            <UserLayout>
              <UserRoutes />
            </UserLayout>
          ) : (
            <Workspace role={role}>
              {role === "doctor" && <DoctorRoutes />}
              {role === "admin" && <AdminRoutes />}
              {role === "clinic" && <FirmRoutes />}
            </Workspace>
          )}
        </Suspense>

      </Router>
    </SkeletonTheme>
  )
}

export default App
