import React from "react"
import env from "../../../env"
import axios from "axios"

export default function Author({ author, setCanvasMode, setEditable }) {
  return (
    <tr className="align-middle">
      <td>{author.id}</td>
      <td>{author.name}</td>
      <td>{author.surname}</td>
      <td>{author.birth_date.split("T")[0]}</td>
      <td>{author.gender}</td>
      <td>{author.login}</td>
      <td className="text-primary">
        <button
          className="btn"
          onClick={() => {
            navigator.clipboard.writeText(author.password)
          }}
        >
          Copy
        </button>
      </td>
      <td>{author.isAdmin ? "✅" : "🚫"}</td>
      <td>
        <button
          className="btn"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvas"
          aria-controls="offcanvas"
          onClick={() => {
            setCanvasMode(1)
            setEditable({
              ...author,
              birth_date: author.birth_date.split("T")[0],
              isAdmin: Number(author.isAdmin),
            })
          }}
        >
          ✏️
        </button>
      </td>
      <td>
        <button
          className="btn"
          onClick={() => {
            axios.delete(`${env.apiUrl}/users/${author.id}`)
          }}
        >
          ❌
        </button>
      </td>
    </tr>
  )
}
