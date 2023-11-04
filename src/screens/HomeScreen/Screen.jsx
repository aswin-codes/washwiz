import React from "react";
import AdminScreen from "./LaundryAdmin";
import HomeScreen from "./HomeScreen";

const Screen = () => {
    const isAdmin = localStorage.getItem('type') == 'admin' 
    console.log(isAdmin)
  return     (isAdmin? <AdminScreen/> : <HomeScreen/>);
    
};

export default Screen;
