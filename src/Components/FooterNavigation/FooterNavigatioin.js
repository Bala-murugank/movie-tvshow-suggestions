import React from "react";
import { PiFire } from "react-icons/pi";
import { RiMovieLine } from "react-icons/ri";
import { LiaTvSolid } from "react-icons/lia";
import { IoSearchOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import './footerNavigation.css'
import {Container} from 'react-bootstrap'

const FooterNavigatioin = () => {
  return (
    <div className="footerNavigation">
      <Container>
        <NavLink to={'/'}>
          <PiFire /> 
          <span>Trending</span>
         
        </NavLink>
        <NavLink to={'movies'}>
          <RiMovieLine />
          <span>Movies</span>
        </NavLink>

        <NavLink to={'series'}>
          <LiaTvSolid />
          <span>Series</span>
        </NavLink>

        <NavLink to={'search'}>
          <IoSearchOutline />
          <span>Search</span>
        </NavLink>
      </Container>
      
    </div>
  );
};

export default FooterNavigatioin;
