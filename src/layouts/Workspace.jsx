import { lazy } from "react"
import Navbar from "../components/Navbar/Navbar"
import Sidebar from "../components/Sidebar/Sidebar"
import { Toaster } from "sonner"
import useIsAuth from '../hooks/AuthHooks/useIsAuth'


const Modal = lazy(() => import("../components/Modal/Modal"))

function Workspace({ role, children }) {
  useIsAuth()


  return (
    <>


      <Sidebar role={role} />
      <div className="container">
        <Navbar />

        {children}

        <Toaster duration={3500} richColors />
        <Modal />
      </div>


    </>
  )
}

export default Workspace
