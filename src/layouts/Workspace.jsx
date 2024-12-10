import { lazy } from "react"
import Navbar from "../components/Navbar/Navbar"
import Sidebar from "../components/Sidebar/Sidebar"
import { Toaster } from "sonner"
import loop from '../assets/img/loop.mp4'

const Modal = lazy(() => import("../components/Modal/Modal"))

function Workspace({ role, children }) {

  return (
    <>


      <Sidebar role={role} />
      <div style={{position: "relative"}} className="container">
        <Navbar />
        <video className='loop' autoPlay loop muted disablePictureInPicture>
          <source src={loop} type='video/mp4' />
        </video>

        {children}

        <Toaster duration={3500} richColors />
        <Modal />
      </div>


    </>
  )
}

export default Workspace
