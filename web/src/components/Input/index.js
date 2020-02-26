import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';

import { colors } from '~/styles/defaults';
import { InputText, InputGroup } from './styles';

export default function Input({ name, label, icon: Icon, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <InputGroup icon={Icon}>
      <label htmlFor={name}>
        {label}
        <InputText
          icon={Icon}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
      </label>
      {Icon && <Icon size={26} color={colors.lightGrey} />}
      {error && <span className="error">{error}</span>}
    </InputGroup>
  );
}

Input.defaultProps = {
  label: null,
  icon: null,
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  icon: PropTypes.func,
};