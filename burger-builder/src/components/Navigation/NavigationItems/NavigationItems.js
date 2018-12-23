import React from 'react';
import NavItem from '../NavItem/NavItem';

import './NavigationItems.css';

const NavigationItems = props =>(
    <ul className='NavigationItems'>
        <NavItem link='/' active>Burger Builder</NavItem>
        <NavItem link='/'>Checkout</NavItem>
    </ul>
);

export default NavigationItems;