/* eslint-disable react/jsx-props-no-spreading */
import React, { useRef, useEffect } from 'react';
import { useField } from '@unform/core';
import { Container } from './styles';

function Input({ name, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, error, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container>
      <input
        autoComplete="off"
        {...rest}
        defaultValue={defaultValue}
        ref={inputRef}
      />
      {error && <p>{error}</p>}
    </Container>
  );
}
export default React.memo(Input);
