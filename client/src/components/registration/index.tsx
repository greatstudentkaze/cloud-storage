import React, { useState } from 'react';

import './css/registration.css';
import Input from '../input';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className="registration" method="post" action="/">
      <Input type="email" placeholder="Введите электронную почту" value={email} setValue={setEmail} />
      <Input type="password" placeholder="Введите пароль" value={password} setValue={setPassword} />
      <button type="submit">Регистрация</button>
    </form>
  );
};

export default Registration;
