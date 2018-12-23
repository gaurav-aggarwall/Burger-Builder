import React from 'react';
import HOC from '../../hocomponents/HOC';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import './Layout.css';

const layout = ( props ) => (
    <HOC>
        <Toolbar />
        <main className="Content">
            {props.children}
        </main>
    </HOC>
);
export default layout;