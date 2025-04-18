import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/banjos.png';
import { FaFileDownload } from 'react-icons/fa'; // Import download icon from react-icons

// Styled components
const HeaderWrapper = styled.header`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: all 0.3s ease;
  padding: 20px 0;

  &.scrolled {
    position: fixed;
    background: rgba(32, 32, 32, 0.95);
    padding: 10px 0;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    animation: fadeInDown 0.5s ease;

    @keyframes fadeInDown {
      0% {
        opacity: 0;
        transform: translateY(-20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.a`
  img {
    max-width: 180px;
    transition: all 0.3s ease;

    .scrolled & {
      max-width: 150px;
    }
  }
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: center;

  @media (max-width: 992px) {
    position: fixed;
    top: 0;
    right: -100%;
    width: 300px;
    height: 100vh;
    background: #202020;
    flex-direction: column;
    justify-content: center;
    transition: all 0.5s ease;
    z-index: 999;

    &.active {
      right: 0;
    }
  }
`;

const NavList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 992px) {
    flex-direction: column;
    width: 100%;
    padding: 20px;
  }
`;

const NavItem = styled.li`
  position: relative;
  margin: 0 10px;

  @media (max-width: 992px) {
    margin: 10px 0;
  }

  &.active a {
    color:rgb(255, 193, 7);
  }
`;

const NavLink = styled.a`
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 10px 15px;
  position: relative;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    color: rgb(255, 193, 7);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 15px;
    width: calc(100% - 30px);
    height: 2px;
    background:rgb(255, 193, 7);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1);
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  @media (max-width: 992px) {
    display: block;
    padding: 15px 0;
    font-size: 16px;
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 10px;
  z-index: 1000;

  @media (max-width: 992px) {
    display: block;
  }

  .icon-bar {
    display: block;
    width: 25px;
    height: 3px;
    background: #fff;
    margin: 5px 0;
    transition: all 0.3s ease;
  }

  &.active .icon-bar:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  &.active .icon-bar:nth-child(2) {
    opacity: 0;
  }

  &.active .icon-bar:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 998;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;

  &.active {
    opacity: 1;
    visibility: visible;
  }
`;

// New styled component for the download button
const DownloadButton = styled.a`
  display: flex;
  align-items: center;
  color: #fff;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 10px 15px;
  margin-left: 20px;
  transition: all 0.3s ease;
  font-size: 14px;
  cursor: pointer;
  text-decoration: none;
  border: 1px solid rgb(255, 193, 7);
  border-radius: 4px;

  &:hover {
    background: rgb(255, 193, 7);
    color: #000;
  }

  svg {
    margin-right: 8px;
    font-size: 16px;
  }

  @media (max-width: 992px) {
    margin: 20px 0 0 0;
    justify-content: center;
    width: 80%;
  }
`;

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to handle PDF download
  const handleDownload = () => {
    // Replace this URL with the actual path to your PDF file
    const pdfUrl = '/path/to/your/file.pdf';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'Banjos_Menu.pdf'; // Name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <HeaderWrapper className={isScrolled ? 'scrolled' : ''}>
      <NavContainer>
        <Logo href="#">
          <img src={logo} alt="Logo" />
        </Logo>

        <MobileMenuButton 
          className={isMenuOpen ? 'active' : ''} 
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </MobileMenuButton>

        <NavMenu className={isMenuOpen ? 'active' : ''}>
          <NavList>
            <NavItem className="active">
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/WebIndex/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/WebIndex/menu">Menu</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/WebIndex/Branches">Branches</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/WebIndex/Galleryin">Gallery</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/WebIndex/Job">Career</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/WebIndex/contact">Contact</NavLink>
            </NavItem>
          </NavList>
          
          {/* Download PDF Button */}
          <DownloadButton onClick={handleDownload}>
            <FaFileDownload />
           
          </DownloadButton>
        </NavMenu>

        <Overlay 
          className={isMenuOpen ? 'active' : ''} 
          onClick={toggleMenu}
        />
      </NavContainer>
    </HeaderWrapper>
  );
};

export default Header;