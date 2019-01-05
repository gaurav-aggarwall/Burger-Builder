import React from 'react';
import './Input.css';

const Input = props =>{
    let inputElement = null;

    switch(props.elemType){
        case ('input'):
            inputElement = <input className='InputElement' {...props.elemConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement = <textarea className='InputElement' {...props.elemConfig} value={props.value} onChange={props.changed}/>;
            break;
        case ('select'):
            inputElement = (
                <select className='InputElement' value={props.value} onChange={props.changed}>
                    {props.elemConfig.options.map( option =>(
                        <option key={option.value} value={option.value}>{option.display}</option>
                    ))}
                </select>
            );    
            break;
        default:
            inputElement = <input className='InputElement' {...props.elemConfig} value={props.value} onChange={props.changed}/>;  
    }

    return(
        <div className='Input'>
            <label className='Label'>{props.label}</label>
            {inputElement} 
        </div>
    );
}

export default Input;