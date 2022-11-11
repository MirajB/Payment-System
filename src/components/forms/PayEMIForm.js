import React, { useState } from 'react';
import * as Yup from 'yup';
import InputBox from '../InputBox';
import { Formik, Form } from 'formik';
import { isEmpty } from '../../utils/isEmpty';
import { useNavigate } from 'react-router-dom';

Yup.addMethod(Yup.string, 'integer', function () {
  return this.matches(/^\d+$/, 'The field should have digits only');
});

const PayEMIForm = (props) => {
  const history = useNavigate();
  const [showDetails, setShowDetails] = useState(null);
  const [details, setDetails] = useState(null);

  return (
    <>
      <Formik
        initialValues={{
          loanId: '',
        }}
        validationSchema={Yup.object({
          loanId: Yup.string()
            .min(9, 'Must be 9 characters')
            .max(9, 'Must be 9 characters')
            .integer()
            .required('Required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setShowDetails(true);
          const parsedValue = JSON.parse(localStorage.getItem('users'));
          if (!isEmpty(parsedValue)) {
            const getLoanDetails = parsedValue.find(
              (p) => p.loanId == values.loanId
            );
            getLoanDetails ? setDetails(getLoanDetails) : setDetails(null);
          }
          setSubmitting(false);
        }}
      >
        <Form>
          <InputBox
            label='Loan ID'
            name='loanId'
            type='text'
            placeholder='Enter Loan ID'
          />
          <button type='submit'>Get Details</button>
        </Form>
      </Formik>
      {showDetails && details && (
        <div className='columns'>
          <div className='column'>
            <>
              Name: {`${details.firstName} ${details.lastName}`} <br />
              Email: {details.email}
            </>
          </div>
          <div className='column'>
            <> Mobile: {details.mobile}</>
            <br />
            <>EMI: {details.emi}</>
          </div>
          <Formik
            initialValues={{
              your_emi: details.emi,
            }}
            validationSchema={Yup.object({
              your_emi: Yup.string()
                .min(1, 'Must be 0 characters')
                // .max(details.emi, 'EMI cannot exceed the current limit')
                .integer()
                .required('Required'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(false);
              history('/pay', {
                state: {
                  ...details,
                  your_emi: values.your_emi,
                },
              });
            }}
          >
            <Form>
              <InputBox label='EMI' name='your_emi' type='text' />
              <button type='submit'>Proceed to pay</button>
            </Form>
          </Formik>
        </div>
      )}
      {showDetails && !details && <>invalid loan id</>}
    </>
  );
};

export default PayEMIForm;
