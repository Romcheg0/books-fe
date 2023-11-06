import { Outlet } from "react-router"
import Nav from "./Components/Nav/Nav"
function App() {
  return (
    <div className="App">
      <Nav />
      <Outlet />
    </div>
  )
}

export default App

