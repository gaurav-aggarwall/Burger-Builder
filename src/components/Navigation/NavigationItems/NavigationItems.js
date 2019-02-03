import React from 'react';
import NavItem from '../NavItem/NavItem';

import './NavigationItems.css';

const NavigationItems = props =>(
    <ul className='NavigationItems'>
        <NavItem link='/' exact>Burger Builder</NavItem>
        <NavItem link='/orders'>Orders</NavItem>
        <NavItem link='/login'>Login</NavItem>
        <NavItem link='/join'>Sign Up</NavItem>
    </ul>
);

export default NavigationItems;