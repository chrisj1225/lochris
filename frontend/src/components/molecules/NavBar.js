import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as HamburgerIcon } from '../../assets/icons/hamburger.svg';
import { useSessions } from '../../hooks';
import { getPageColorFromPath } from '../../util/misc';
import { device, sizes } from '../../styles/ViewStyles';
import { useOutsideClick } from '../../hooks';

const NavBar = () => {
  const { user, isAuthenticated, logoutUser } = useSessions();
  const location = useLocation();
  const path = location.pathname;
  
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);
  const mobileNavRef = React.useRef();
  useOutsideClick(mobileNavRef, () => {
    setMobileNavOpen(false);
  });

  if (!isAuthenticated) return null;

  const navigationItems = (
    <>
      <NavLink to="/" locationpath={path} onClick={() => setMobileNavOpen(false)}>Home</NavLink>
      <NavLink to="/about" locationpath={path} onClick={() => setMobileNavOpen(false)}>About Us</NavLink>
      <NavLink to="/moments" locationpath={path} onClick={() => setMobileNavOpen(false)}>Moments</NavLink>
      <NavLink to="/travel" locationpath={path} onClick={() => setMobileNavOpen(false)}>Travel</NavLink>
      <NavLink to="/schedule" locationpath={path} onClick={() => setMobileNavOpen(false)}>Schedule</NavLink>
      <NavLink to="/registry" locationpath={path} onClick={() => setMobileNavOpen(false)}>Registry</NavLink>
      <NavLink to="/music" locationpath={path} onClick={() => setMobileNavOpen(false)}>Music</NavLink>
      {user.superuser && <NavLink to="/admin" locationpath={path} onClick={() => setMobileNavOpen(false)}>Admin</NavLink>}
    </>
  );

  return (
    <NavWrapper path={path}>
      <NavHeader>Lois & Chris</NavHeader>
      <NavSubHeader>XX.XX.2023 | New York</NavSubHeader>
      <TopMenu>
        <MenuText>{`Welcome ${user.firstName} ${user.lastName}!`}</MenuText>
        <LogoutBtn onClick={() => logoutUser()}>Logout</LogoutBtn>
      </TopMenu>
      <HamburgerWrapper>
        <HamburgerIcon onClick={() => {setMobileNavOpen(true)}}/>
      </HamburgerWrapper>
      <Navigation>
        {navigationItems}
      </Navigation>
      {mobileNavOpen && <MobileNavigation ref={mobileNavRef}>{navigationItems}</MobileNavigation>}
    </NavWrapper>
  )
}

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: ${(props) => getPageColorFromPath(props.path)};
`;

const NavHeader = styled.h1`
  font-size: 36px;
  margin: 100px 0 0 0;
`;

const NavSubHeader = styled.h2`
  margin: 50px 0 0 0;
  font-size: 24px;
  font-weight: 400;

  @media ${device.mobile} {
    margin-bottom: 24px;
  }
  
  @media ${device.tablet} {
    margin-bottom: 24px;
  }
`;

const Navigation = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 36px 48px 24px 48px;
  width: 60%;
  height: 48px;

  @media ${device.mobile} {
    display: none;
  }
  
  @media ${device.tablet} {
    display: none;
  }
`;

const MobileNavigation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #F6F6F6;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  z-index: 10000;

  @media ${device.mobile} {
    width: 80%;
  }
  
  @media ${device.tablet} {
    width: 50%;
  }
`;

const HamburgerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  @media ${device.mobile} {
    svg {
      width: 50px;
      height: 50px;
    }
  }
  
  @media ${device.tablet} {
    svg {
      width: 65px;
      height: 65px;
    }
  }


  @media (min-width: ${sizes.desktop}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-size: 14px;
  color: black;
  text-decoration: ${(props) => props.to === props.locationpath ? 'underline' : 'none'};
  font-weight: ${(props) => props.to === props.locationpath ? '600' : '400'};

  @media ${device.mobile} {
    font-size: 20px;
    padding: 20px 0px;
    width: 100%;
    text-align: center;

    &:hover {
      background-color: #828193;
    }
  }
  
  @media ${device.tablet} {
    font-size: 24px;
    padding: 24px 0px;
    width: 100%;
    text-align: center;

    &:hover {
      background-color: #828193;
    }
  }
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
