import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import useSessions from '../../hooks/useSessions.hooks';

const NavBar = () => {

  const { isAuthenticated, isLoggedIn, logoutUser } = useSessions();

  if (!isAuthenticated) return null;

  return (
    <NavWrapper>
      <Link to="/">Home</Link>
      <Link to="/schedule">Schedule</Link>
      <Link to="/registry">Registry</Link>
      <Link to="/travel">Travel</Link>
      <Link to="/about">About Us</Link>
      <Link to="/moments">Moments</Link>
      <Link to="/music">Music</Link>
      <button onClick={() => logoutUser()}>Logout</button>
    </NavWrapper>
  )
}

const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 48px;
  background: white;
  height: 48px;
`;

// const NavLink = styled.Link`
//   font-size: 14px;
//   color: black;
// `;

export default NavBar;
