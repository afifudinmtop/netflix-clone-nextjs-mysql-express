import Menu from "./Menu";
import "./Header.css";

export default function Header() {
  return (
    <div className="header-fix px-5 pt-3">
      <div className="d-flex justify-content-between mb-4">
        {/* left */}
        <div className="d-flex">
          <img className="header_logo me-5" src="netflix-logo.png" />
          <Menu href="/" menu="Home" xclass="fw-bold" />
          <Menu href="/" menu="TV Shows" />
          <Menu href="/" menu="Movies" />
          <Menu href="/" menu="New & Popular" />
          <Menu href="/" menu="My List" />
        </div>

        {/* right */}
        <div className="d-flex">
          <img className="header_search my-auto me-3" src="search.png" />
          <div className="position-relative me-4">
            <img className="header_notif my-auto" src="notif.png" />
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "10px" }}
            >
              3
            </span>
          </div>
          <img className="header_avatar my-auto" src="avatar.png" />
        </div>
      </div>
    </div>
  );
}
