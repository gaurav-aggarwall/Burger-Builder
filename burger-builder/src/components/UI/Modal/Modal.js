import React from 'react';
import HOC from '../../../hocomponents/HOC';
import Backdrop from '../Backdrop/Backdrop';

import './Modal.css'; 

const Modal = props =>(
    <HOC>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div 
        className = 'Modal'
        style = {{
            transform: props.show ? 'translateY(0' : 'translateY(-100vh)',
            opacity: props.show ? '1' : '0'
        }}>
        {props.children}
        </div>
    </HOC>
    
);

export default Modal;