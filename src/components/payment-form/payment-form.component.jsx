import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAppSelector } from '../../redux-store/redux-hooks';

import { selectCartAmount } from '../../redux-store/cart/cart.selector';
import { selectCurrentUser } from '../../redux-store/user/user.selector';

import Button from '../button/button.component';
import './payment-form.styles.scss';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useAppSelector(selectCartAmount);
  const currentUser = useAppSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      console.log('no stripe or no elements');
      return;
    }
    setIsProcessingPayment(true);
    try {
      const response = await fetch(
        '/.netlify/functions/create-payment-intent',
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: amount * 100 }),
        }
      ).then((res) => {
        return res.json();
      });
      const clientSecret = response.paymentIntent.client_secret;

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: currentUser ? currentUser.email : 'Guest',
          },
        },
      });
      setIsProcessingPayment(false);
      if (paymentResult.error) {
        alert(paymentResult.error.message);
      } else {
        if (paymentResult.paymentIntent.status === 'succeeded') {
          alert('Payment Successful!');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='payment-form-container'>
      <form onSubmit={paymentHandler} className='payment-form'>
        <CardElement className='cart' />
        <Button
          isLoading={isProcessingPayment}
          onClick={paymentHandler}
          buttonType='inverted'
        >
          Pay Now
        </Button>
      </form>
    </div>
  );
};

export default PaymentForm;
