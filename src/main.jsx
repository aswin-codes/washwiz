import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginScreen from './screens/Login/LoginScreen.jsx'
import SignupPage from './screens/SignUp/SignUpScreen.jsx'
import LaundrySearch from './screens/HomeScreen/HomeScreen.jsx'
import HomeScreen from './screens/HomeScreen/HomeScreen.jsx'
import LaundryDetails from './screens/LaundryScreen/LaundryScreen.jsx'
import LaundryAdmin from './screens/HomeScreen/LaundryAdmin.jsx'
import Screen from './screens/HomeScreen/Screen.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginScreen/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/' element={<Screen/>}/>
        <Route path='/:name' element={<LaundryDetails/>}/>
        <Route path='/laundry' element={<LaundryDetails/>}/>
        <Route path='/admin' element={<LaundryAdmin/>}/>
      </Routes>
   </BrowserRouter>    
  </React.StrictMode>,
)
