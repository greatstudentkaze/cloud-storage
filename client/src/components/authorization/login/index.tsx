import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

import { login } from '../../../redux/actions/user';

import '../css/authorization.css';
import Input from '../../input';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(login(email, password));
  }

  return (
    <form className="authorization" onSubmit={handleSubmit}>
      <Input type="email" placeholder="Введите электронную почту" value={email} setValue={setEmail} autoComplete="username" />
      <Input type="password" placeholder="Введите пароль" value={password} setValue={setPassword} autoComplete="current-password" />
      <button type="submit">Войти</button>
    </form>
  );
};

export default Login;
