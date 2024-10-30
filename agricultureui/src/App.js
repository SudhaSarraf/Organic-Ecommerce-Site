import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from './components/global/Navbar';
import SignupPage from './pages/signUp';
import LoginPage from './pages/login';
import ProductManagement from './pages/product';
import Dashboard from './pages/dashboard';
import DisplayData from './pages/getProduct';
import Cart from './pages/cart';
import { CartContextProvider } from './components/global/cartContext';
import Footer from './components/global/Footer';
import OrderMain from './pages/orderMain';
import DisplayVlog from './pages/vlog';
import VlogPage from './pages/addVlog';

import Collections from './pages/collections/collection';
import DisplayFruits from './pages/collections/fruits';
import DisplayVegetables from './pages/collections/vegetables';
import DisplayOils from './pages/collections/oils';
import DisplayNuts from './pages/collections/nuts';
import DisplaySpices from './pages/collections/spices';
import ImageSlider from './components/imageSlider';




function App() {
  return (
    <div className="App">
      <CartContextProvider>
      <BrowserRouter>
        <Nav/>
        <Routes>
            <Route path='/' element={<Dashboard/>}/>
            <Route path='/cartProducts' element={<Cart/>}/>
            <Route path="/signup" element={<SignupPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/products" element={<ProductManagement/>}/>
            <Route path="/details" element={<DisplayData/>}/>
            <Route path='/order' element={<OrderMain/>}/>
            <Route path='/blog' element={<DisplayVlog/>}/>
            <Route path ='/vlogs'element={<VlogPage/>}/>
            <Route path='/fruits' element={<DisplayFruits/>}/>
            <Route path='/vegetables' element={<DisplayVegetables/>}/>
            <Route path='/oils' element={<DisplayOils/>}/>
            <Route path='/nuts' element={<DisplayNuts/>}/>
            <Route path='/spices' element={<DisplaySpices/>}/>
            <Route path='/collections' element={<Collections/>}/>
            <Route path='/imageslider' element={<ImageSlider/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
      </CartContextProvider>
    
    </div>
  );
}

export default App;

