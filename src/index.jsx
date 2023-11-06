import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Components/User/Home/Home"
import Author from "./Components/User/Author/Author"
import Book from "./Components/User/Book/Book"
import Authors from "./Components/Admin/Authors/Authors"
import Books from "./Components/Admin/Books/Books"
import UserContextProvider from "./Context/user"
import Login from "./Components/Login/Login"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="author/:id" element={<Author />} />
            <Route path="book/:id" element={<Book />} />
            <Route path="login" element={<Login />} />
            <Route path="admin">
              <Route index element={<Authors />} />
              <Route path="authors" element={<Authors />} />
              <Route path="books" element={<Books />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

