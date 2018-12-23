import React from 'react';
import logo from '../../assets/Images/burger-logo.png';
import './Logo.css';

const Logo = props =>(
    <div className = 'Logo'>
        <img src = {logo} alt = 'My Burger' />
    </div>
);

export default Logo;