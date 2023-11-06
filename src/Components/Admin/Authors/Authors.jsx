import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { UserContext } from "../../../Context/user"
import axios from "axios"
import env from "../../../env"
import Author from "../AuthorItem/AuthorItem"

export default function Authors() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [authors, setAuthors] = useState([])
  const [canvasMode, setCanvasMode] = useState(0)
  const [editable, setEditable] = useState({
    id: 0,
    name: "",
    surname: "",
    birth_date: new Date().toISOString().split("T")[0],
    gender: "M",
    login: "",
    password: "",
    isAdmin: 0,
  })
  function getAuthors() {
    axios
      .get(`${env.apiUrl}/users`)
      .then((res) => {
        setAuthors(res.data)
      })
      .catch((e) => {
        console.error(e)
      })
  }
  function sendData(e) {
    e.preventDefault()
    try {
      if (!canvasMode) {
        let newEditable = editable
        delete newEditable.id
        axios
          .post(`${env.apiUrl}/users`, newEditable)
          .then((res) => {
            if (res.status === 201) {
              window.alert("Success!")
            }
          })
          .catch((e) => {
            console.error(e)
            window.alert("Error! " + e.message)
          })
      } else {
        let newEditable = { ...editable }
        delete newEditable.id
        axios
          .put(`${env.apiUrl}/users/${editable.id}`, newEditable)
          .then((res) => {
            if (res.status === 201) {
              window.alert("Success!")
            }
          })
          .catch((e) => {
            console.error(e)
            window.alert("Error! " + e.message)
          })
      }
    } catch (err) {
      console.error(err)
      window.alert("Error! " + err.message)
    }
  }
  useEffect(() => {
    if (!user) {
      navigate("/")
    }

    const getAuthorsInterval = setInterval(() => {
      getAuthors()
    }, 3000)

    return () => {
      clearInterval(getAuthorsInterval)
    }
  })
  return !authors.length ? (
    <h1>Loading users data</h1>
  ) : (
    <div className="container">
      <button
        className="btn btn-outline-primary w-100 fs-4 fw-normal"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvas"
        aria-controls="offcanvas"
        onClick={() => {
          setCanvasMode(0)
        }}
      >
        Add user
      </button>
      <div
        className="offcanvas offcanvas-end"
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvas"
        aria-labelledby="offcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasLabel">
            {canvasMode ? "Edit" : "Add"} an author
          </h5>
          <button
            className="btn-close"
            type="button"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <form>
            <div className="mb-3">
              <label htmlFor="nameInput" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                value={editable.name}
                onChange={(e) => {
                  setEditable({ ...editable, name: e.target.value })
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="surnameInput" className="form-label">
                Surname
              </label>
              <input
                type="text"
                className="form-control"
                id="surnameInput"
                value={editable.surname}
                onChange={(e) => {
                  setEditable({ ...editable, surname: e.target.value })
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dateInput" className="form-label">
                Birth date:
              </label>
              <input
                type="date"
                className="form-control"
                id="dateInput"
                value={editable.birth_date.split("T")[0]}
                onChange={(e) => {
                  setEditable({ ...editable, birth_date: e.target.value })
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="genderInput" className="form-label">
                Gender
              </label>
              <select
                className="form-control form-select"
                aria-label="Select a gender"
                id="genderInput"
                value={editable.gender || "M"}
                onChange={(e) => {
                  setEditable({ ...editable, gender: e.target.value })
                }}
              >
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="loginInput" className="form-label">
                Login
              </label>
              <input
                type="text"
                className="form-control"
                id="loginInput"
                value={editable.login}
                onChange={(e) => {
                  setEditable({ ...editable, login: e.target.value })
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="passwordInput" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                value={editable.password}
                onChange={(e) => {
                  setEditable({ ...editable, password: e.target.value })
                }}
              />
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="adminCheck"
                checked={!!editable.isAdmin}
                onChange={(e) => {
                  setEditable({
                    ...editable,
                    isAdmin: Number(e.target.checked),
                  })
                }}
              />
              <label htmlFor="adminCheck" className="form-check-label">
                Is Admin
              </label>
            </div>
            <button
              className="btn btn-primary"
              onClick={(e) => {
                sendData(e)
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Birth date</th>
            <th>Gender</th>
            <th>Login</th>
            <th>Password</th>
            <th>Admin</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {authors.map((item) => (
            <Author
              key={item.id}
              author={item}
              setEditable={setEditable}
              setCanvasMode={setCanvasMode}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
