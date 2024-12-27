import { lazy, Suspense, useCallback, useEffect } from "react"
import { BrowserRouter as Router, useLocation } from "react-router-dom"
import ScrollToTop from "./utils/scrollToTop"

import Workspace from "./layouts/Workspace"
import UserLayout from "./layouts/UserLayout"
import useStore from './data/store'

const FirmRoutes = lazy(() => import("./helpers/Routes/FirmRoutes"))
const AdminRoutes = lazy(() => import("./helpers/Routes/AdminRoutes"))
const UserRoutes = lazy(() => import("./helpers/Routes/UserRoutes"))
const DoctorRoutes = lazy(() => import("./helpers/Routes/DoctorRoutes"))
import useIsAuth from '@hooks/AuthHooks/useIsAuth'
import { SkeletonTheme } from 'react-loading-skeleton'
import LoadingPage from './components/UI/Loading/LoadingPage'

function App() {

  const { checkIsAuth } = useIsAuth()
  const { role, isAuth } = useStore()

  const stableCheckIsAuth = useCallback(() => {
    checkIsAuth()
  }, [checkIsAuth])

  useEffect(() => {
    stableCheckIsAuth()
  }, [stableCheckIsAuth]);
  console.log(isAuth, role)

  return (
    <SkeletonTheme baseColor="#f0f0f0" highlightColor="#ececec" borderRadius={12}>
      <Router>
        <ScrollToTop />

        <Suspense fallback={<LoadingPage/>}>
          {role === "patient" && !isAuth ? (
            <UserLayout>
              <UserRoutes isAuth={isAuth} />
            </UserLayout>
          ) : (
              <Workspace isAuth={isAuth} role={role}>
                {role === "doctor" && <DoctorRoutes isAuth={isAuth} />}
                {role === "admin" && <AdminRoutes isAuth={isAuth} />}
                {role === "clinic" && <FirmRoutes isAuth={isAuth} />}
                
            </Workspace>
          )}
        </Suspense>

      </Router>
    </SkeletonTheme>
  )
}

export default App
