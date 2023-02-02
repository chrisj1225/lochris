import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { useSessions } from '../../hooks';
import { getPageColorFromPath } from '../../util/misc';

const NavBar = () => {
  const { user, isAuthenticated, logoutUser } = useSessions();
  const location = useLocation();
  const path = location.pathname;

  if (!isAuthenticated) return null;

  return (
    <NavWrapper path={path}>
      <NavHeader>Lois & Chris</NavHeader>
      <NavSubHeader>XX.XX.2023 | New York</NavSubHeader>
      <TopMenu>
        <MenuText>{`Welcome ${user.firstName} ${user.lastName}!`}</MenuText>
        <LogoutBtn onClick={() => logoutUser()}>Logout</LogoutBtn>
      </TopMenu>
      <Navigation>
        <NavLink to="/" locationpath={path}>Home</NavLink>
        <NavLink to="/schedule" locationpath={path}>Schedule</NavLink>
        <NavLink to="/registry" locationpath={path}>Registry</NavLink>
        <NavLink to="/travel" locationpath={path}>Travel</NavLink>
        <NavLink to="/about" locationpath={path}>About Us</NavLink>
        <NavLink to="/moments" locationpath={path}>Moments</NavLink>
        <NavLink to="/music" locationpath={path}>Music</NavLink>
      </Navigation>
    </NavWrapper>
  )
}

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: ${(props) => getPageColorFromPath(props.path)}
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
  width: 60%;
  height: 48px;
`;

const NavLink = styled(Link)`
  font-size: 14px;
  color: black;
  text-decoration: ${(props) => props.to === props.locationpath ? 'underline' : 'none'};
  font-weight: ${(props) => props.to === props.locationpath ? '600' : '400'};
`;

const TopMenu = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
`;

const MenuText = styled.p`
  margin: 0px;
  font-size: 14px;
  line-height: 18px;
`;

const LogoutBtn = styled.button`
  padding: 4px 8px;
  margin: 4px;
  font-size: 14px;
  color: black;
  border-radius: 8px;
  background: white;
  border: 1px solid black;
  cursor: pointer;

  &:hover {
    background: #F36060;
  }
`;

export default NavBar;
