import React, { useCallback, useEffect, useState } from 'react';
import { FaFileUpload } from 'react-icons/fa';
import { useUpload } from '../../hooks/upload';
import Upload from '../upload';

import { StyledModal } from './styles';

export default function ModalUploadPhoto() {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const { data, resetValues } = useUpload();

  const toggleModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const afterOpen = useCallback(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 100);
  }, []);

  const beforeClose = useCallback(
    () =>
      new Promise((resolve) => {
        setOpacity(0);
        setTimeout(resolve, 300);
      }),
    []
  );

  useEffect(() => {
    if (data) {
      toggleModal();
      resetValues();
    }
  }, [data, resetValues, toggleModal]);

  return (
    <>
      <FaFileUpload size={30} onClick={toggleModal} />

      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        <Upload />
      </StyledModal>
    </>
  );
}
