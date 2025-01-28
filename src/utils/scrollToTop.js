import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (navigationType === "PUSH") {
      window.scrollTo(0, 0);
    }
    prevPathRef.current = pathname;
  }, [pathname, navigationType]);

  return null;
}
