import React from 'react';
import NavItem from '../NavItem/NavItem';

import HOC from '../../../hocomponents/HOC';
import './NavigationItems.css';

const NavigationItems = props =>(
    <ul className='NavigationItems'>
        <NavItem link='/' exact>Burger Builder</NavItem>
        {!(props.isAuth || props.token) ? 
            <HOC>
                <NavItem link='/login'>Login</NavItem>
                <NavItem link='/join'>Sign Up</NavItem>
            </HOC>
            :
            <HOC>
                <NavItem link='/orders'>Orders</NavItem>
                <NavItem link='/logout'>Log Out</NavItem> 
            </HOC>
        }
    </ul>
);

export default NavigationItems;