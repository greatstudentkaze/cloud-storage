import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

type Props = {
  type: 'text' | 'email' | 'password',
  placeholder: string,
  value: string,
  setValue: Dispatch<SetStateAction<string>>,
  autoComplete?: string,
};

const Input = ({ type, placeholder, value, setValue, ...rest }: Props) => {

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => setValue(evt.target.value);

  return (
    <input type={type} placeholder={placeholder} value={value} onChange={handleChange} {...rest} />
  );
};

export default Input;