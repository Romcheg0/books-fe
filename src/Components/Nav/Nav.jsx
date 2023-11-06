import React, { useContext, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../../Context/user"

export default function Nav() {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  return (
    <nav className="navbar navbar-expand-sm border-bottom">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse  ${
            !user && "d-flex flex-row justify-content-center"
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={"/"} className="nav-link active fs-5">
                Books
              </Link>
            </li>
            {user && (
              <>
                <li className="nav-item">
                  <Link to={"/admin/authors"} className="nav-link fs-5">
                    Authors
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/admin/books"} className="nav-link fs-5">
                    Set books
                  </Link>
                </li>
              </>
            )}
          </ul>
          {user && (
            <button
              className="btn btn-secondary position-absolute end-0 me-5"
              onClick={() => {
                setUser(false)
                navigate("/")
              }}
            >
              Log out
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
