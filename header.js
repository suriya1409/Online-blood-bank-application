import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, NavbarBrand, DropdownToggle, DropdownMenu, DropdownItem, Dropdown, Button } from "reactstrap";
import logo from '../assets/images/bb.png'
import user1 from "../assets/images/user4.jpg";

const Header = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const myprofile = () => {
    navigate('/myprofile')
  }
  return (
    <Navbar color="white" light expand="md" className="fix-header">
      <div className="d-flex align-items-center justify-content-center w-100">
        <div className="d-flex align-items-center">
          <div className="me-auto">
            <div className="d-flex align-items-center justify-content-center">
              <img src={logo} className="img-fluid me-3" style={{ width: '70px' }} alt="logo" />
              <h3 style={{ fontFamily: 'Poppins', fontWeight: 500 }} className="m-3">Blood Bank Management System</h3>
            </div>
          </div>
        </div>
        
      </div>
    </Navbar>

  );
};

export default Header;