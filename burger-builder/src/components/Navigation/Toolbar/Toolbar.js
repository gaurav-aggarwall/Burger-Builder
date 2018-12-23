import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';

import Logo from '../../Logo/Logo';
import './Toolbar.css';

const Toolbar = (props)=> (
    <header className='Toolbar'>
        Menu
        <Logo />
        <nav>
            <NavigationItems/>
        </nav>
    </header>
);

export default Toolbar;