import React, { FormEvent, useState } from 'react';

import { registration } from '../../../redux/actions/user';

import '../css/authorization.css';
import Input from '../../input';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    registration(email, password);
  }

  return (
    <form className="authorization" onSubmit={handleSubmit}>
      <Input type="email" placeholder="Введите электронную почту" value={email} setValue={setEmail} autoComplete="username" />
      <Input type="password" placeholder="Введите пароль" value={password} setValue={setPassword} autoComplete="current-password" />
      <button type="submit">Регистрация</button>
    </form>
  );
};

export default Registration;
