import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useSessions } from '../../hooks';

const NavBar = () => {

  const { isAuthenticated, isLoggedIn, logoutUser } = useSessions();

  if (!isAuthenticated) return null;

  return (
    <NavWrapper>
      <NavHeader>LOIS & CHRIS</NavHeader>
      <NavSubHeader>XX.XX.2023 | New York</NavSubHeader>
      <Navigation>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/schedule">Schedule</NavLink>
        <NavLink to="/registry">Registry</NavLink>
        <NavLink to="/travel">Travel</NavLink>
        <NavLink to="/about">About Us</NavLink>
        <NavLink to="/moments">Moments</NavLink>
        <NavLink to="/music">Music</NavLink>
        <LogoutBtn onClick={() => logoutUser()}>Logout</LogoutBtn>
      </Navigation>
    </NavWrapper>
  )
}

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const NavHeader = styled.h1`
  font-size: 36px;
  margin: 100px 0 0 0;
`;

const NavSubHeader = styled.h2`
  margin: 50px 0 0 0;
  font-size: 24px;
  font-weight: 400;
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 36px 48px 24px 48px;
  background: white;
  width: 60%;
  height: 48px;
`;

const NavLink = styled(Link)`
  font-size: 14px;
  color: black;
  text-decoration: none;
`;

const LogoutBtn = styled.button`
  font-size: 14px;
  color: black;
  border-radius: 2px;
  background: white;
  border: none;
  cursor: pointer;
`;

export default NavBar;
