import React, { Component } from 'react';
import HOC from '../../../hocomponents/HOC';
import Backdrop from '../Backdrop/Backdrop';

import './Modal.css'; 

class Modal extends Component{
    shouldComponentUpdate(nextProp, nextState){
       return nextProp.show !== this.props.show || nextProp.children !== this.props.children;
    }

    render(){
       return(
        <HOC>
            <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
            <div 
            className = 'Modal'
            style = {{
                transform: this.props.show ? 'translateY(0' : 'translateY(-100vh)',
                opacity: this.props.show ? '1' : '0'
            }}>
            {this.props.children}
            </div>
        </HOC> 
       );
   } 
} 
    

export default Modal;