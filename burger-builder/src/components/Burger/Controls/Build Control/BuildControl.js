import React from 'react';
import './BuildControl.css';

const BuildControl = props =>(
    <div className='BuildControl'>
        <div className='Label'>{props.label}</div>
        <button className='More' onClick={props.added}>Add</button>
        <button className='Less' onClick={props.deleted} disabled={props.disabled}>Remove</button>
    </div>
);

export default BuildControl;