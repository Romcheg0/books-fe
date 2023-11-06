import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import env from "../../../env"

export default function Author() {
  const { id } = useParams()
  const [author, setAuthor] = useState({})
  const [books, setBooks] = useState([])
  function getUserData() {
    axios
      .get(`${env.apiUrl}/users/${id}`)
      .then((res) => {
        setAuthor(res.data[0])
      })
      .catch((e) => {
        console.error(e)
      })
  }
  function getBooksData() {
    axios
      .get(`${env.apiUrl}/books/author/${id}`)
      .then((res) => {
        setBooks(res.data)
      })
      .catch((e) => {
        console.error(e)
      })
  }
  useEffect(() => {
    const getDataInterval = setInterval(() => {
      getUserData()
      getBooksData()
    }, 3000)
    return () => {
      clearInterval(getDataInterval)
    }
  }, [])
  return !author.id ? (
    <h1>Loading author data</h1>
  ) : author.isAdmin ? (
    <h1>No author found</h1>
  ) : (
    <div className="container">
      <h1 className="text-center fs-1 fw-normal">
        {author.name} {author.surname}
      </h1>
      <h4 className="text-center fs-4 fw-normal">
        {author.birth_date.split("T")[0]}
      </h4>
      <h4 className="mt-5 mb-3 fs-5 fw-normal text-center">
        Books by this author:{" "}
      </h4>
      <div className="row row-cols-4 justify-content-center g-3 border border-2 rounded p-3 mt-3">
        {books.length &&
          books.map((book) => {
            return (
              <div className="col" key={book.id}>
                <div className="card">
                  <Link
                    to={`/book/${book.id}`}
                    target="_blank"
                    className="text-decoration-none"
                  >
                    <img
                      src={book.cover_url}
                      alt={book.title}
                      className="card-img-top"
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title text-center">{book.title}</h5>
                    <h6 className="card-text text-success mt-1">
                      ${book.price}
                    </h6>
                  </div>
                  <div className="card-body border-top">
                    <div className="card-text">
                      <div className="row row-cols-2 justify-content-between">
                        <div className="col">{book.year}</div>
                        <div className="col">{book.genre}</div>
                      </div>
                    </div>
                    <div className="card-text mt-3">
                      Pages: {book.pages_count}
                    </div>
                  </div>
                  <div className="card-body border-top">
                    <p className="card-text">
                      {book.description.substr(0, 200)}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
    </div>
  )
}
