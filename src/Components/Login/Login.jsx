import React, { useContext, useState } from "react"
import { UserContext } from "../../Context/user"
import axios from "axios"
import env from "../../env"
export default function Login() {
  const [login, setLogin] = useState("")
  const [password, setPassword] = useState("")
  const { user, setUser } = useContext(UserContext)
  function auth(e) {
    e.preventDefault()
    axios
      .post(`${env.apiUrl}/users/auth/${login}`, { password: password })
      .then((result) => {
        if (result.data) {
          axios
            .get(`${env.apiUrl}/users/login/${login}`)
            .then((res) => {
              if (res.data[0]?.isAdmin) {
                alert(res.data.length ? "Authorized" : "Not authorized")
                setUser(!!res.data.length)
              } else {
                alert("Not authorized")
                setUser(false)
              }
            })
            .catch((e) => {
              alert("Not authorized (error)")
              console.error(e.message)
              setUser(false)
            })
        }
      })
      .catch((e) => {
        alert("Not authorized (error)")
        console.error(e.message)
        setUser(false)
      })
  }
  return (
    <form className="mx-auto w-25">
      <div className="mb-3">
        <label htmlFor="loginInput" className="form-label">
          Login
        </label>
        <input
          type="text"
          className="form-control"
          id="loginInput"
          value={login}
          onChange={(e) => {
            setLogin(e.target.value)
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
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
      </div>
      <button
        className="btn btn-primary"
        type="Submit"
        onClick={(e) => {
          auth(e)
        }}
      >
        Login
      </button>
    </form>
  )
}
