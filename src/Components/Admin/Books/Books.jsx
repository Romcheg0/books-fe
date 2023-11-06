import React, { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { UserContext } from "../../../Context/user"
import BookItem from "../BookItem/BookItem"
import env from "../../../env"
import axios from "axios"

export default function Books() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [books, setBooks] = useState([])
  const [users, setUsers] = useState([])
  const [canvasMode, setCanvasMode] = useState(0)
  const [editable, setEditable] = useState({
    id: 0,
    title: "",
    description: "",
    price: 0,
    year: 2023,
    genre: "",
    cover_url: "",
    author_id: 0,
    pages_count: 0,
    publisher: "",
  })
  function getData() {
    axios
      .get(`${env.apiUrl}/books`)
      .then((res) => {
        setBooks(res.data)
      })
      .catch((e) => {
        console.error(e)
      })
    axios
      .get(`${env.apiUrl}/users`)
      .then((res) => {
        setUsers(res.data)
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
          .post(`${env.apiUrl}/books`, newEditable)
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
        delete newEditable.name
        delete newEditable.surname
        axios
          .put(`${env.apiUrl}/books/${editable.id}`, newEditable)
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
    if (!user?.login) {
      navigate("/")
    }

    const getDataInterval = setInterval(() => {
      getData()
    }, 3000)

    return () => {
      clearInterval(getDataInterval)
    }
  })
  return !books.length ? (
    <h1>Loading books data</h1>
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
        Add a book
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
            {canvasMode ? "Edit" : "Add"} a book
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
              <label htmlFor="titleInput" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="titleInput"
                value={editable.title}
                onChange={(e) => {
                  setEditable({ ...editable, title: e.target.value })
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="descriptionInput" className="form-label">
                Description
              </label>
              <input
                type="text"
                className="form-control"
                id="descriptionInput"
                value={editable.description}
                onChange={(e) => {
                  setEditable({ ...editable, description: e.target.value })
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="priceInput" className="form-label">
                Price
              </label>
              <input
                type="number"
                min={0}
                step={0.01}
                className="form-control"
                id="priceInput"
                value={editable.price}
                onChange={(e) => {
                  setEditable({ ...editable, price: e.target.value })
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="yearInput" className="form-label">
                Year
              </label>
              <input
                type="number"
                min={1900}
                max={2099}
                step={1}
                className="form-control"
                id="yearInput"
                value={editable.year}
                onChange={(e) => {
                  setEditable({ ...editable, year: e.target.value })
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="genreInput" className="form-label">
                Genre
              </label>
              <input
                type="text"
                className="form-control"
                id="genreInput"
                value={editable.genre}
                onChange={(e) => {
                  setEditable({ ...editable, genre: e.target.value })
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="cover_urlInput" className="form-label">
                Cover
              </label>
              <input
                type="url"
                className="form-control"
                id="cover_urlInput"
                value={editable.cover_url}
                onChange={(e) => {
                  setEditable({ ...editable, cover_url: e.target.value })
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="authorInput" className="form-label">
                Author
              </label>
              <select
                type="text"
                className="form-control"
                id="authorInput"
                value={editable.author_id}
                onChange={(e) => {
                  setEditable({ ...editable, author_id: e.target.value })
                }}
              >
                {users &&
                  users.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.id} : {item.name} {item.surname}
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="pagesInput" className="form-label">
                Pages count
              </label>
              <input
                type="number"
                min={0}
                step={1}
                className="form-control"
                id="pagesInput"
                value={editable.pages_count}
                onChange={(e) => {
                  setEditable({ ...editable, pages_count: e.target.value })
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="publisherInput" className="form-label">
                Publisher
              </label>
              <input
                type="text"
                className="form-control"
                id="publisherInput"
                value={editable.publisher}
                onChange={(e) => {
                  setEditable({ ...editable, publisher: e.target.value })
                }}
              />
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
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Cover</th>
            <th>Author</th>
            <th>Pages</th>
            <th>Publisher</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {books.map((item) => {
            return (
              <BookItem
                key={item.id}
                book={item}
                setEditable={setEditable}
                setCanvasMode={setCanvasMode}
              />
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
