import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Coin from "./pages/Coin"
import Footer from "./components/Footer"


function App() {


  return (
    <>
      <div className="min-h-screen text-white bg-gradient-to-t from-gray-950 to-gray-800 font-outfit">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coin/:id" element={<Coin />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
