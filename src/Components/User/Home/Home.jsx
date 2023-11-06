import axios from "axios"
import React, { useEffect, useState } from "react"
import env from "../../../env"
import { Link } from "react-router-dom"

export default function Home() {
  const [books, setBooks] = useState([])
  useEffect(() => {
    const getBooksInterval = setInterval(() => {
      getBooks()
    }, 3000)
    return () => {
      clearInterval(getBooksInterval)
    }
  }, [])
  function getBooks() {
    axios
      .get(`${env.apiUrl}/books`)
      .then((res) => {
        setBooks(res.data)
      })
      .catch((e) => {
        console.error(e)
      })
  }
  return (
    <div className="container my-3">
      {!books.length ? (
        <h1>Loading books</h1>
      ) : (
        <div className="row row-cols-4 justify-content-center g-3">
          {books.map((book) => {
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
                    <Link
                      to={`/author/${book.author_id}`}
                      target="_blank"
                      className="card-text text-decoration-none col"
                    >
                      {book.name} {book.surname}
                    </Link>
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
      )}
    </div>
  )
}
