import React from 'react';
import logo from '../../assets/Images/burger-logo.png';
import './Logo.css';

const Logo = props =>(
    <div className = 'Logo' style={{height: props.height}}>
        <img src = {logo} alt = 'My Burger' />
    </div>
);

export default Logo;