import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price, confirmOrder, totalAmount, cartob, address }) => {
  const priceForStripe = price * 100
  const publishableKey = 'pk_test_MQZ7qGlUkuJYuYORZLYRduQW008WmFtzTe';

  const onToken = token => {
    console.log(token)
    confirmOrder(totalAmount, cartob, address)
    alert('Payment Successful')
  }


  return (
    <StripeCheckout 
    label="Pay Now"
    name="Hola Bella Ltd."
    billingAddress
    shippingAddress
    image="https://svgshare.com/i/Cuz.svg"
    description={`Your total is ${priceForStripe / 100} KSH`}
    amount={priceForStripe}
    panelLabel="Pay Now"
    token={onToken}
    stripeKey={publishableKey}
    currency={'KSH'}
    />
  )
}

export default StripeCheckoutButton;