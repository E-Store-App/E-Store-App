// import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import HomePage from './pages/HomePage';
import SigninPage from './pages/SigninPage'
import LoginPage from "./pages/LoginPage";
import { HomePage } from "./pages/homePage";
import PrivacyPolicy from "./components/PrivacyPolicy";
export const AllRoutes = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                {/* <Route path='home' element={<HomePage/>}/>  */}
                <Route path='/' element={<SigninPage/>}/>  
                  <Route path='/login' element={<LoginPage/>}/> 
                   <Route path='/home' element={<HomePage/>}/> 
                   <Route path="/privacy" element={<PrivacyPolicy/>}/>
                        
            </Routes>
        </BrowserRouter>
    </div>
  )
}
