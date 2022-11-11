import React from 'react';
import * as Yup from 'yup';
import InputBox from '../InputBox';
import useLocalStorage from '../../hooks/useLocalStorage';
import { Formik, Form } from 'formik';
import { isEmpty } from '../../utils/isEmpty';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const { setItem: setUserDetails, value } = useLocalStorage('users');
  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          mobile: '',
          emi: '',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email addresss`')
            .required('Required'),
          mobile: Yup.number().required('Required'),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const parsedValue = JSON.parse(localStorage.getItem('users'));
          if (isEmpty(parsedValue)) {
            const stringValues = JSON.stringify([
              { loanId: 123456789, ...values },
            ]);
            setUserDetails(stringValues);
            navigate("/emi");
          }
          setSubmitting(false);
        }}
      >
        <Form>
          <InputBox
            label='First Name'
            name='firstName'
            type='text'
            placeholder='Enter first name'
          />
          <InputBox
            label='Last Name'
            name='lastName'
            type='text'
            placeholder='Enter last name'
          />
          <InputBox
            label='Email Address'
            name='email'
            type='email'
            placeholder='Enter email id'
          />
          <InputBox
            label='Mobile No'
            name='mobile'
            type='number'
            placeholder='Enter mobile No'
          />
          <InputBox
            label='EMI'
            name='emi'
            type='number'
            placeholder='Enter EMI to be paid'
          />
          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    </>
  );
};

export default RegistrationForm;
