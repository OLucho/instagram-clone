/* eslint-disable no-nested-ternary */
import React, { useState, useRef, useCallback } from 'react';
import { useUpload } from '../../hooks/upload';
import {
  Container,
  ImagePreview,
  MessagePreview,
  Body,
  Button,
} from './styles';

export default function Upload() {
  const inputFile = useRef(null);
  const inputBody = useRef(null);

  const { error, loading, resetValues } = useUpload();

  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleUpload = useCallback((e) => {
    e.preventDefault();

    const dataImage = {
      file: inputFile.current,
      body,
    };
    console.log(dataImage);
  }, []);

  const handleInputFile = useCallback(
    (file) => {
      resetValues();
      if (file.target.files[0]) {
        setImage(URL.createObjectURL(file.target.files[0]));
        setDisabled(false);
      } else {
        setImage('');
      }
      inputBody.current.focus();
    },
    [resetValues]
  );

  const handleBody = useCallback(
    (e) => {
      setBody(e.target.value);
      if (body.trim().length > 0) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    },
    [body]
  );

  return (
    <Container onSubmit={handleUpload} enctype="multipart/form-data">
      {image ? (
        <ImagePreview
          src={image}
          title="image preview"
          onClick={() => inputFile.current.click()}
        />
      ) : (
        <MessagePreview onClick={() => inputFile.current.click()}>
          Select your photo
        </MessagePreview>
      )}

      <input
        ref={inputFile}
        type="file"
        onChange={handleInputFile}
        accept="image/*"
        style={{ display: 'none' }}
      />

      <Body
        placeholder="Enter some description"
        value={body}
        onChange={handleBody}
        ref={inputBody}
      />
      <Button type="submit" disabled={disabled} error={error}>
        {loading ? <p>Loading...</p> : error ? 'Image too big' : 'Publish'}
      </Button>
    </Container>
  );
}
