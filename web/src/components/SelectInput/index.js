import React, { useRef, useEffect, memo } from 'react';
import { useField } from '@unform/core';
import PropTypes from 'prop-types';
import AsyncSelect from 'react-select/async';
import makeAnimated from 'react-select/animated';
import { lighten } from 'polished';

import { colors, defaults } from '~/styles/defaults';

import { Container } from './styles';

const customStyles = {
  input: () => ({
    color: colors.light.colorDefault,
  }),
  indicatorSeparator: () => ({
    background: 'transparent',
  }),
  control: provided => ({
    ...provided,
    marginTop: defaults.spacing.margin / 2,
    height: defaults.metrics.height,
    borderColor: colors.gray,
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? colors.white : colors.light.colorDefault,
  }),
  singleValue: provided => ({
    ...provided,
    color: colors.light.colorDefault,
  }),
  noOptionMessage: provided => ({
    ...provided,
    color: colors.light.colorDefault,
  }),
};

function theme(defaultTheme) {
  return {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      primary: colors.primary,
      primary75: lighten(0.25, colors.primary),
      primary50: lighten(0.3, colors.primary),
      primary25: lighten(0.4, colors.primary),
    },
  };
}

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

  async function loadOptions(inputValue) {
    const data = await onSearch(inputValue);
    return data;
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
          theme={theme}
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
