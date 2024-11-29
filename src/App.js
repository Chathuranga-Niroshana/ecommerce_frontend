import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import Shop from './pages/shop/Shop';

function App() {
  return (

    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">

      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      </div>

      <div className=" container mx-auto ">

        <Navbar />
        <div className='pt-20'>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/shop' element={<Shop />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
