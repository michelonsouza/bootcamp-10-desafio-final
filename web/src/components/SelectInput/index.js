import React, { useRef, useEffect, useMemo, memo, useContext } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import { lighten, darken } from 'polished';
import { ThemeContext } from 'styled-components';

import { Container } from './styles';

function SelectInput({
  selected,
  name,
  label,
  placeholder,
  onSearch,
  ...rest
}) {
  const animatedComponents = makeAnimated();
  const { fieldName, registerField } = useField(name);
  const selectRef = useRef(null);
  const theme = useContext(ThemeContext);

  async function loadOptions(inputValue) {
    const data = await onSearch(inputValue);
    return data;
  }

  const customStyles = {
    input: () => ({
      color: theme.colors.textColor,
      background: theme.colors.background,
    }),
    indicatorSeparator: () => ({
      background: 'transparent',
    }),
    control: provided => ({
      ...provided,
      marginTop: theme.spacing.margin / 2,
      height: theme.metrics.height,
      borderColor: theme.colors.borderColor,
      paddingLeft: theme.spacing.padding / 2,
      color: theme.colors.textColor,
      background: theme.colors.background,
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected
        ? theme.colors.white
        : theme.colors.secondaryTextColor,
      padding: theme.spacing.padding / 2,
    }),
    menu: provided => ({
      ...provided,
      background: theme.colors.background,
    }),
    singleValue: provided => ({
      ...provided,
      color: theme.colors.textColor,
    }),
    noOptionMessage: provided => ({
      ...provided,
      color: theme.colors.textColor,
    }),
  };

  const colorTheme = useMemo(() => {
    return theme.title === 'light' ? lighten : darken;
  }, [theme.title]);

  function computedTheme(defaultTheme) {
    return {
      ...defaultTheme,
      colors: {
        ...defaultTheme.colors,
        primary: theme.colors.primary,
        primary75: colorTheme(0.25, theme.colors.primary),
        primary50: colorTheme(0.3, theme.colors.primary),
        primary25: colorTheme(0.4, theme.colors.primary),
      },
    };
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'select.state.value.value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <label htmlFor={name}>
        <b>{label}</b>
        <AsyncSelect
          ref={ref => {
            selectRef.current = ref;
          }}
          styles={customStyles}
          components={animatedComponents}
          id={name}
          loadOptions={loadOptions}
          defaultInputValue={selected ? selected.label : ''}
          defaultValue={selected}
          theme={computedTheme}
          defaultOptions
          placeholder={placeholder}
          {...rest}
        />
      </label>
    </Container>
  );
}

SelectInput.defaultProps = {
  label: '',
  placeholder: '',
  selected: null,
};

SelectInput.propTypes = {
  selected: PropTypes.shape({
    value: PropTypes.any,
    label: PropTypes.string,
  }),
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default memo(SelectInput);
