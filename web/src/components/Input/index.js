import React, { useEffect, useRef, useContext } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';

import { InputText, InputGroup } from './styles';

export default function Input({
  name,
  label,
  icon: Icon,
  exceptTheme,
  ...rest
}) {
  const inputRef = useRef(null);
  const theme = useContext(ThemeContext);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <InputGroup icon={!!Icon} error={error} excepttheme={exceptTheme}>
      <label htmlFor={name}>
        {label}
        <InputText
          data-icon={!!Icon}
          label={label}
          ref={inputRef}
          defaultValue={defaultValue}
          excepttheme={String(exceptTheme)}
          {...rest}
        />
      </label>
      {!!Icon && <Icon size={26} color={theme.colors.secondaryTextColor} />}
      {error && <span className="error">{error}</span>}
    </InputGroup>
  );
}

Input.defaultProps = {
  label: null,
  icon: false,
  exceptTheme: false,
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  exceptTheme: PropTypes.bool,
  icon: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};
