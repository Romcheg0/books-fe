import axios from "axios"
import React, { useEffect, useState } from "react"
import env from "../../../env"
import { Link } from "react-router-dom"
import MultiRangeSlider from "multi-range-slider-react"
export default function Home() {
  const [books, setBooks] = useState([])
  const [titleFilter, setTitleFilter] = useState("")
  const [minPriceFilter, setMinPriceFilter] = useState(0)
  const [maxPriceFilter, setMaxPriceFilter] = useState(9999)
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
        <>
          <input
            type="text"
            id="nameFilterInput"
            className="form-control mb-3"
            placeholder="Search by title"
            value={titleFilter}
            onInput={(e) => {
              setTitleFilter(e.target.value)
            }}
          />
          <MultiRangeSlider
            min={0}
            max={9999}
            step={10}
            stepOnly={true}
            ruler={false}
            label={false}
            minValue={minPriceFilter}
            maxValue={maxPriceFilter}
            className="mb-3 w-50 mx-auto"
            barLeftColor="#fff"
            barRightColor="#fff"
            barInnerColor="#0088ff"
            thumbLeftColor="#fff"
            thumbRightColor="#fff"
            style={{ boxShadow: "none" }}
            onInput={(e) => {
              setMinPriceFilter(e.minValue)
              setMaxPriceFilter(e.maxValue)
            }}
          />
          <div className="row row-cols-4 justify-content-center g-3">
            {books.filter((item) => {
              return (
                item.title.includes(titleFilter) &&
                item.price >= minPriceFilter &&
                item.price <= maxPriceFilter
              )
            }).length ? (
              books
                .filter((item) => {
                  return (
                    item.title.includes(titleFilter) &&
                    item.price >= minPriceFilter &&
                    item.price <= maxPriceFilter
                  )
                })
                .map((book) => {
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
                            height={"500px"}
                          />
                        </Link>
                        <div className="card-body">
                          <h5 className="card-title text-center">
                            {book.title}
                          </h5>
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
                })
            ) : (
              <h2>No books</h2>
            )}
          </div>
        </>
      )}
    </div>
  )
}
