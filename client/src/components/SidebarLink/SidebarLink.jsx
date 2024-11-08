import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./style.css"; // или используйте css модули для стилизации

function SidebarLink({ title, img, url }) {
  return (
    <NavLink
      to={url}
      className={({ isActive }) =>
        isActive ? "sidebar-link-div active" : "sidebar-link-div"
      }
      style={{padding: '0'}}
      
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
  url: PropTypes.string, // исправлено с 'url' на 'string'
};

export default SidebarLink;
