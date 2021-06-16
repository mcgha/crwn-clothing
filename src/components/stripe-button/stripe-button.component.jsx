import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
//npm i react-stripe-checkout

const StripeCheckoutButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51J37XcJVYuhP08C8HpDJSBvoPMaT931rQfZQtyma6SO4ciO8plR38Q2GXngl7HKHuFiSktexU9KJC6Cv0xsXNbCK00nZVMk2f3';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }

    return (
        <StripeCheckout 
            label='Pay now'
            name='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image='https://svgsilh.com/svg/1157725.svg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;
