import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css";
function SidebarLink({ title, img, url }) {
  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        isActive ? "sidebar-link-div active" : "sidebar-link-div"
      }
      style={{ padding: "0" }}
    >
      <div className="sidebar-link-div">
        <img src={img} alt={title} />
        {title}
      </div>
    </NavLink>
  );
}

SidebarLink.propTypes = {
  title: PropTypes.string,
  img: PropTypes.string,
  url: PropTypes.string,
};

export default SidebarLink;
