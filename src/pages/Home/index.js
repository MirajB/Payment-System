import React from 'react';
import PayEMIForm from '../../components/forms/PayEMIForm';
import RegistrationForm from '../../components/forms/RegistrationForm';
import useLocalStorage from '../../hooks/useLocalStorage';
import { isEmpty } from '../../utils/isEmpty';

const HomePage = () => {
  const { value } = useLocalStorage('users');
  return <div>{isEmpty(value) ? <RegistrationForm /> : <PayEMIForm />}</div>;
};

export default HomePage;
