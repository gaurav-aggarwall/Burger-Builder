import React from 'react';
import BuildControl from './Build Control/BuildControl';

import './Controls.css';

const controlsArray = [
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Patty', type: 'patty'},
    {label: 'Tomato', type: 'tomato'}
];

const Controls = props => (
    <div className='Controls'>
        {controlsArray.map(ctrl => (
            <BuildControl key={ctrl.label} label={ctrl.label}/>
        ))};
    </div>
);

export default Controls;