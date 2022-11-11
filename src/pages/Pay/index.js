import React, { useState } from 'react';
import * as Yup from 'yup';
import InputBox from '../../components/InputBox';
import styled from '@emotion/styled';
import { Formik, Form } from 'formik';
import { useLocation } from 'react-router-dom';

const ButtonWrapper = styled.div`
  display: flex;
  margin-top: 1rem;
  align-items: center;
  button {
    margin-top: unset;
  }
`;

const Pay = () => {
  let location = useLocation();
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMode, setPaymentMode] = useState('');
  const handleClick = (mode) => {
    setShowPaymentDetails(true);
    setPaymentSuccess(false);
    setPaymentMode(mode);
  };

  const handleCancel = () => {
    setShowPaymentDetails(false);
  };
  return (
    <>
      <h2>Select Mode of Payment</h2>
      {!showPaymentDetails && (
        <div>
          <button onClick={() => handleClick('Credit Card')}>
            Credit Card
          </button>
          <button onClick={() => handleClick('Debit Card')}>Debit Card</button>
          <button onClick={() => handleClick('Net Banking')}>
            Net Banking
          </button>
        </div>
      )}
      {showPaymentDetails && (
        <div>
          <Formik
            initialValues={{
              your_emi: `${location?.state?.your_emi}`,
              name: `${location?.state?.firstName} ${location?.state?.lastName}`,
              bankName: '',
            }}
            validationSchema={Yup.object({
              bankName: Yup.string().required('Required'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              const data = {
                ...values,
                location: { ...location.state },
                paymentMode,
              };
              setSubmitting(false);
              setShowPaymentDetails(false);
              setPaymentSuccess(true);
              fetch('http://localhost:4000/posts', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              })
                .then((response) => response.json())
                .then((data) => {
                  console.log('Success:', data);
                })
                .catch((error) => {
                  console.error('Error:', error);
                });
            }}
          >
            <Form>
              <InputBox label='Name' name='name' type='text' readOnly />
              <InputBox
                label='Amount to be paid'
                name='your_emi'
                type='text'
                readOnly
              />
              <InputBox
                label='Bank Name'
                name='bankName'
                type='text'
                placeholder='Enter bank name'
              />
              <ButtonWrapper>
                <button type='submit'>Pay</button>
                <button onClick={handleCancel}>Cancel</button>
              </ButtonWrapper>
            </Form>
          </Formik>
        </div>
      )}
      {paymentSuccess && (
        <>
          <div>Your Payment is successful</div>
        </>
      )}
    </>
  );
};

export default Pay;
