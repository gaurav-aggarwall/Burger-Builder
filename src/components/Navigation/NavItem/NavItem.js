import React from 'react';
import { NavLink } from 'react-router-dom';
 
import './NavItem.css';


const navItem = props => (
    <li className='NavItem'>
        <NavLink to={props.link} exact={props.exact}>{props.children}</NavLink>
    </li>
);

export default navItem;