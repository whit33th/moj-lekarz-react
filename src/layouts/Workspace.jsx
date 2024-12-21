import { lazy, useEffect, useState } from "react"
import Navbar from "../components/Navbar/Navbar"
import Sidebar from "../components/Sidebar/Sidebar"
import { Toaster } from "sonner"
import loop from "@assets/img/loop.mp4"
import poster from "@assets/img/loopPoster.png"

const Modal = lazy(() => import("../components/Modal/Modal"))

function Workspace({ role, children }) {
  const [videoSrc, setVideoSrc] = useState(null)

  useEffect(() => {
    const handlePageLoad = () => {
      setVideoSrc(loop)
    }
    if (document.readyState === "complete") {
      handlePageLoad()
    } else {
      window.addEventListener("load", handlePageLoad)
    }
    return () => window.removeEventListener("load", handlePageLoad)
  }, [])

  return (
    <>
      <Sidebar role={role} />
      <div style={{ position: "relative" }} className="container">
        <Navbar />
        <video
          poster={poster}
          className="loop"
          autoPlay
          loop
          muted
          playsInline
          disablePictureInPicture
        >
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
        </video>

        {children}

        <Toaster duration={3500} richColors />
        
        <Modal />
      </div>
    </>
  )
}

export default Workspace
