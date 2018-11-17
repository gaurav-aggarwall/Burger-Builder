import React from 'react';
import HOC from '../../hocomponents/HOC';

import './Layout.css';

const layout = ( props ) => (
    <HOC>
        <div>Toolkit, Sidebar, Backdrop</div>
        <main className="Content">
            {props.children}
        </main>
    </HOC>
);
export default layout;