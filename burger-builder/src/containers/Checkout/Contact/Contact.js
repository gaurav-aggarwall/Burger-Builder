import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import './Contact.css';

class Contact extends Component{
    state={
        name: '',
        age: '',
        email: '',
        address: {
            street: '',
            city: ''
        }
    }

    render(){
        return(
            <div className='Contact'>
                <h4>Enter your Contact Details:</h4>
                <form>
                    <input type='text' name='name' placeholder='Enter your name'/>
                    <input type='email' name='email' placeholder='Enter your email'/>
                    <input type='text' name='street' placeholder='Enter your street'/>
                    <input type='text' name='city' placeholder='Enter your city'/>
                    <Button btnType='Success'>ORDER</Button> 
                </form>
            </div>
        );
    }
}

export default Contact; 