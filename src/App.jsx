import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./Home"
import ShortUrl from './ShortUrl'
import About from "./About"



export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/:short_url' element={<ShortUrl />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
