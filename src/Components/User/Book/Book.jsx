import axios from "axios"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import env from "../../../env"
import { Link } from "react-router-dom"

export default function Book() {
  const { id } = useParams()
  const [book, setBook] = useState({})
  function getBookData() {
    axios
      .get(`${env.apiUrl}/books/joined/${id}`)
      .then((res) => {
        setBook(res.data[0])
      })
      .catch((e) => {
        console.error(e)
      })
  }
  useEffect(() => {
    const getBookDataInterval = setInterval(() => {
      getBookData()
    }, 3000)
    return () => {
      clearInterval(getBookDataInterval)
    }
  }, [])
  return !book.id ? (
    <h1>Loading book data</h1>
  ) : (
    <div className="card w-50 mx-auto">
      <div className="row g-0">
        <Link
          to={`/book/${book.id}`}
          target="_blank"
          className="text-decoration-none col"
        >
          <img
            src={book.cover_url}
            alt={book.title}
            className="card-img-top w-100"
          />
        </Link>
        <div className="col">
          <div className="card-body">
            <h5 className="card-title text-center fs-1">{book.title}</h5>
            <Link
              to={`/author/${book.author_id}`}
              target="_blank"
              className="card-text text-decoration-none fs-2 ps-3"
            >
              {book.name} {book.surname}
            </Link>
            <h6 className="card-text text-success mt-2 fs-4 ps-3">
              ${book.price}
            </h6>
          </div>
          <div className="card-body border-top">
            <div className="fs-5 card-text">Published in {book.year}</div>
            <div className="fs-5 card-text">Genre: {book.genre}</div>
            <div className="fs-5 card-text">Pages: {book.pages_count}</div>
          </div>
          <div className="card-body border-top">
            <p className="card-text">{book.description.substr(0, 400)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
