import React from "react";
import { Link } from "react-router-dom";

const Footer = props => {
  const { show, currentUser } = props;
  return (
    <div className="nav">
      <div className="nav-text">
        {show && (
          <>
            <Link to="/home">Home</Link>

            {currentUser &&
              <>
                <Link
                to={"/user/" + currentUser.id + "/username/" + currentUser.username}
                >
                Profile
                </Link>
                <Link to="/logout">Logout</Link>
              </>
            }
          </>
        )}
        <a href="https://github.com/DanThomp507/Everybody-Eats">github</a>
      </div>
    </div>
  );
};
export default Footer;
