import { Link } from "react-router-dom";
import "./index.css";

const Header = () => {
  return (
    <div className="header-bg">
      <h1 className="header-logo">MovieDb</h1>
      <div className="header-contents">
        <ul className="header-ul">
          <Link to="/" className="link">
            <li className="header-li">Popular</li>
          </Link>
          <Link to="/top-rated" className="link">
            <li className="header-li">Top Rated</li>
          </Link>
          <Link to="/upcoming" className="link">
            <li className="header-li">Upcoming</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
