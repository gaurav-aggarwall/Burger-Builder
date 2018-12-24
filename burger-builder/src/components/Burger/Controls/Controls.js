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
        <p>Current Price: $ <strong>{props.price.toFixed(2)}</strong></p>
        {controlsArray.map(ctrl => (
            <BuildControl 
                key = {ctrl.label} 
                label = {ctrl.label}
                added = {() => props.ingAdder(ctrl.type)}
                deleted = {() => props.ingDeleter(ctrl.type)}
                disabled = {props.disable[ctrl.type]}
            />
        ))};
        <button 
            className = 'OrderNow'
            onClick = {props.Ordering}
            disabled = {!props.purchaseable}>ORDER NOW</button>
    </div>
);

export default Controls;