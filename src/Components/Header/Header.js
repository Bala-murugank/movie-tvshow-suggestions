import React from 'react'
import { BiSolidCameraMovie } from "react-icons/bi";
import './header.css'


const Header = () => {
  return (
    <>
    
      <div  className='app_header'>
        <BiSolidCameraMovie className='movie__logo'/>
         <span className='app_title' onClick={()=> window.scrollTo(0,0)} >Entertainment suggestion</span>
        
      </div>
    </>
  )
}

export default Header
