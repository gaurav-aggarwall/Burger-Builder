import React from 'react';
import './Input.css';

const Input = props =>{
    let inputElement = null;
    const inputClasses = ['InputElement'];
    
    if(! props.valid && props.edited){
        inputClasses.push('Invalid');
    }

    switch(props.elemType){
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elemConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elemConfig} value={props.value} onChange={props.changed}/>;
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elemConfig} value={props.value} onChange={props.changed}/>;  
    }

    return(
        <div className='Input'>
            <label className='Label'>{props.label}</label>
            {inputElement} 
        </div>
    );
}

export default Input;