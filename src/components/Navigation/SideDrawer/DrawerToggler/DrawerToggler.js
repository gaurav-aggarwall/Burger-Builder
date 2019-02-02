import React from 'react';

import './DrawerToggler.css';

const DrawerToggler = props => (
    <div className='DrawerToggle' onClick = {props.clicked} >
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default DrawerToggler;