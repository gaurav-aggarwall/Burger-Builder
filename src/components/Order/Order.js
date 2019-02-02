import React from 'react';
import './Order.css';

const Order = props =>{
    const ing =[];

    for( let ingName in props.ingredients){
        ing.push({
            name: ingName,
            amount: props.ingredients[ingName]
        });
    }

    const ingOutput = ing.map( ig => {
        return <span 
                key={ig.name}
                style={{
                    textTransform: 'capitalize',
                    display: 'inline-block',
                    margin: '0 8px',
                    padding: '5px',
                    border: '1px solid #ccc'
                    }}>{ig.name} ({ig.amount})</span>;
    })
    
    return(
        <div className='Order'>
            <p>Ingridents: {ingOutput}</p>
            <p>Price: <strong>${props.price.toFixed(2)}</strong></p>
        </div>
    );
};

export default Order;