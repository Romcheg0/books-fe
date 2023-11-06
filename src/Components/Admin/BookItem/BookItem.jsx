import axios from "axios"
import React from "react"
import env from "../../../env"

export default function BookItem({ book, setEditable, setCanvasMode }) {
  return (
    <tr className="align-middle">
      <td>{book.id}</td>
      <td>{book.title}</td>
      <td>{book.description}</td>
      <td>{book.price}</td>
      <td>{book.year}</td>
      <td>{book.genre}</td>
      <td>
        <img src={book.cover_url} alt={book.title} width="40px" />
      </td>
      <td>
        {book.author_id} : {book.name}
      </td>
      <td>{book.pages_count}</td>
      <td>{book.publisher}</td>
      <td>
        <button
          className="btn"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvas"
          aria-controls="offcanvas"
          onClick={() => {
            setCanvasMode(1)
            setEditable(book)
          }}
        >
          ✏️
        </button>
      </td>
      <td>
        <button
          className="btn"
          onClick={() => {
            axios.delete(`${env.apiUrl}/books/${book.id}`)
          }}
        >
          ❌
        </button>
      </td>
    </tr>
  )
}
