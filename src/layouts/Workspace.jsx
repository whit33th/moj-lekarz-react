import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import loop from "@assets/img/loop.mp4";
import poster from "@assets/img/loopPoster.png";

function Workspace({ role, children }) {
  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    const handlePageLoad = () => {
      setVideoSrc(loop);
    };
    if (document.readyState === "complete") {
      handlePageLoad();
    } else {
      window.addEventListener("load", handlePageLoad);
    }
    return () => window.removeEventListener("load", handlePageLoad);
  }, []);

  return (
    <>
      <Sidebar role={role} />
      <div className="container">
        <div className="desktop-only">
          <Navbar />
        </div>
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
      </div>
    </>
  );
}

export default Workspace;
