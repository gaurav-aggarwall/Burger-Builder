import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import './Contact.css';
import axios from '../../../axios';

class Contact extends Component{
    state={
        name: '',
        age: '',
        email: '',
        address: {
            street: '',
            city: ''
        },
        loading: false
    }

    orderHandler = event =>{
        event.preventDefault();
        this.setState({loading: true});

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name: 'Test',
                address: {
                    street: 'ABC',
                    city: 'XYZ',
                    zip: 'JKL'
                },
            email: 'test@test.com'    
            }
        }

        axios.post('/orders.json', order)
        .then(res =>{
            this.setState({loading: false});
            this.props.history.push('/');    
        })
        .catch(res =>{
            this.setState({loading: false});
        });

    }

    render(){
        let form = (
            <form>
                <input type='text' name='name' placeholder='Enter your name'/>
                <input type='email' name='email' placeholder='Enter your email'/>
                <input type='text' name='street' placeholder='Enter your street'/>
                <input type='text' name='city' placeholder='Enter your city'/>
                <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button> 
            </form>
        );

        if(this.state.loading){
            form = <Spinner/>;
        }
 
        return(
            <div className='Contact'>
                <h4>Enter your Contact Details:</h4>
                {form}
            </div>
        );
    }
}

export default Contact; 