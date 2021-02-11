import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Link from 'next/link'
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Form } from "react-bootstrap";

export default function CheckoutForm(props) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const [purchase, setPurchaseItem] = useState({});
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  useEffect(() => {
    console.log(props);
    // Create PaymentIntent as soon as the page loads
    const purchase = {
        price: props.price, 
        title: props.title,
        id: props.id
    }

    setPurchaseItem(purchase);

    // console.log("On checkout form", purchase);

    window
      .fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_SERVER}/create-payment-intent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(purchase)
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, [props]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleSelectChange = (e) => {
    const sel: HTMLSelectElement = document.getElementById("statesel") as HTMLSelectElement;
    const selectedState: string = sel.options[sel.selectedIndex].value;
    console.log("select state: ", selectedState);
  }

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSuccess = () => {
    window
      .fetch(`${process.env.NEXT_PUBLIC_REACT_APP_API_SERVER}/send-sms-success`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(purchase)
      })
      .then(res => {
        router.push("/checkout/success");
        return res.json();
      })
  }

  const handleSubmit = async ev => {
    ev.preventDefault();
    setProcessing(true);
    const line1el: HTMLInputElement = document.getElementById("line1") as HTMLInputElement;
    const line1: string = line1el.value;
    const line2el: HTMLInputElement = document.getElementById("line2") as HTMLInputElement;
    const line2: string = line2el.value;
    const cityel: HTMLInputElement =  document.getElementById("city") as HTMLInputElement;  
    const city: string = cityel.value;
    // const sel: HTMLInputElement = (document.getElementById('id') as HTMLInputElement).select();
    const sel: HTMLSelectElement = document.getElementById("statesel") as HTMLSelectElement;
    // let selectedState: string = (document.getElementById('id') as HTMLInputElement).select();
    const selectedState: string = sel.options[sel.selectedIndex].value;
    const postal_codeEl: HTMLInputElement = document.getElementById('postal_code') as HTMLInputElement;
    const postal_code = postal_codeEl.value;
    const nameEl: HTMLInputElement = document.getElementById('fullname') as HTMLInputElement;
    let name: string = nameEl.value;
    const emailEl: HTMLInputElement = document.getElementById('emailaddress') as HTMLInputElement;
    let email_address: string = emailEl.value;
    let price = props.price;

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      },
      receipt_email: email_address,
      shipping: {
        name: name,
        address: {
          line1: line1,
          line2: line2,
          city: city,
          state: selectedState,
          postal_code: postal_code
        }
      }
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      handleSuccess();

    }
  };

  return (
      <div>
        <div className="row justify-content-center">
        <div className="details col-md-8">
          <h2>You are purchasing</h2>
          <h3>Artwork: {props.title}</h3>
       <h3>Cost: <span>{props.price_format}</span></h3>
    </div>
        </div>
    <div className="row justify-content-center">
      <div className="col-md-8 align-self-center">
      <Form id="payment-form" onSubmit={handleSubmit}>
      <fieldset>
        <legend>Shipping information:</legend>
        <Form.Group>
          <Form.Label htmlFor="fullname">Full Name</Form.Label>
          <Form.Control name="fullname" id="fullname" className="form-input"></Form.Control>
        </Form.Group>
        <Form.Group>
        <Form.Label htmlFor="line1">Address 1</Form.Label>
        <Form.Control name="line1" id="line1"></Form.Control>
        </Form.Group>
        <Form.Group>
        <Form.Label htmlFor="line2">Address 2</Form.Label>
        <Form.Control name="line2" id="line2"></Form.Control>
        </Form.Group>
        <div className="row">
        <div className="col-md-6">
        <Form.Group>
        <Form.Label htmlFor="inputCity">City</Form.Label>
        <Form.Control name="city" id="city"></Form.Control>
        </Form.Group>
        </div>
        <div className="col-md-4">
          <Form.Group>
          <Form.Label htmlFor="state">State</Form.Label>
          <Form.Control as="select" name="statesel" id="statesel" onChange={handleSelectChange}>
            <option value="AL">Alabama</option>
            <option value="AK">Alaska</option>
            <option value="AZ">Arizona</option>
            <option value="AR">Arkansas</option>
            <option value="CA">California</option>
            <option value="CO">Colorado</option>
            <option value="CT">Connecticut</option>
            <option value="DE">Delaware</option>
            <option value="DC">District Of Columbia</option>
            <option value="FL">Florida</option>
            <option value="GA">Georgia</option>
            <option value="HI">Hawaii</option>
            <option value="ID">Idaho</option>
            <option value="IL">Illinois</option>
            <option value="IN">Indiana</option>
            <option value="IA">Iowa</option>
            <option value="KS">Kansas</option>e
            <option value="KY">Kentucky</option>
            <option value="LA">Louisiana</option>
            <option value="ME">Maine</option>
            <option value="MD">Maryland</option>
            <option value="MA">Massachusetts</option>
            <option value="MI">Michigan</option>
            <option value="MN">Minnesota</option>
            <option value="MS">Mississippi</option>
            <option value="MO">Missouri</option>
            <option value="MT">Montana</option>
            <option value="NE">Nebraska</option>
            <option value="NV">Nevada</option>
            <option value="NH">New Hampshire</option>
            <option value="NJ">New Jersey</option>
            <option value="NM">New Mexico</option>
            <option value="NY">New York</option>
            <option value="NC">North Carolina</option>
            <option value="ND">North Dakota</option>
            <option value="OH">Ohio</option>
            <option value="OK">Oklahoma</option>
            <option value="OR">Oregon</option>
            <option value="PA">Pennsylvania</option>
            <option value="RI">Rhode Island</option>
            <option value="SC">South Carolina</option>
            <option value="SD">South Dakota</option>
            <option value="TN">Tennessee</option>
            <option value="TX">Texas</option>
            <option value="UT">Utah</option>
            <option value="VT">Vermont</option>
            <option value="VA">Virginia</option>
            <option value="WA">Washington</option>
            <option value="WV">West Virginia</option>
            <option value="WI">Wisconsin</option>
            <option value="WY">Wyoming</option>
          </Form.Control>		
          </Form.Group>
        </div>
        <div className="col-md-2">
          <Form.Group>
          <Form.Label htmlFor="postal_code">Zip</Form.Label>
          <Form.Control name="postal_code" id="postal_code"></Form.Control>
          </Form.Group>
        </div>
        </div>
        </fieldset>
        <fieldset>
          <legend>Billing</legend>
          <Form.Group>
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control name="receipt_email" id="emailaddress"></Form.Control>
          </Form.Group>
          
          <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
          <button id="submit-btn" className="btn btn-primary submitBtn"
            disabled={processing || disabled || succeeded}
          >
            <span id="button-text">
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "Pay"
              )}
            </span>
          </button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded, thank you for your order. Return to the <Link href="/art">art page</Link>.
      </p>
        </fieldset>
      
    </Form>
      </div>
    </div>
    
    </div>
  );
}
