import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggler from '../SideDrawer/DrawerToggler/DrawerToggler';

import Logo from '../../Logo/Logo';
import './Toolbar.css';

const Toolbar = (props)=> (
    <header className='Toolbar'>
        <DrawerToggler clicked={props.drawerToggleClicked}/>
        <Logo height='80%'/>
        <nav className='DesktopOnly'>
            <NavigationItems/>
        </nav>
    </header>
);

export default Toolbar;