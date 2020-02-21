import React from 'react';

import { InputText, InputGroup } from './styles';

export default function Input({ name, label, ...rest }) {
  return (
    <InputGroup>
      <label htmlFor={name}>
        {label}
        <InputText id={name} name={name} {...rest} />
      </label>
    </InputGroup>
  );
}
