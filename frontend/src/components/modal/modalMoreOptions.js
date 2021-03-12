/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMoreHorizontal } from 'react-icons/fi';
import { StyledModal, MoreOptions } from './styles';
import { useFollow } from '../../hooks/follow';
import { useFeed } from '../../hooks/feed';

export default function ModalMoreOptions({ isAuthor, photo }) {
  const [isOpen, setIsOpen] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const { removeFollow } = useFollow();
  const { deletePhotoAction, deleteFollowAction } = useFeed();

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
  const toggleModal = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const handleDelete = useCallback(
    (_photo) => {
      deletePhotoAction(_photo);
      toggleModal();
    },
    [toggleModal]
  );

  const handleFollow = useCallback(
    (idUser) => {
      deleteFollowAction(idUser);
      removeFollow(idUser);
      toggleModal();
    },
    [deleteFollowAction, removeFollow, toggleModal]
  );
  return (
    <>
      <FiMoreHorizontal size={20} onClick={toggleModal} />
      <StyledModal
        isOpen={isOpen}
        afterOpen={afterOpen}
        beforeClose={beforeClose}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
        opacity={opacity}
        backgroundProps={{ opacity }}
      >
        {isAuthor ? (
          <MoreOptions>
            <li>
              <Link to={`/photo/${photo.id}`}>Go to Publication</Link>
            </li>
            <li className="red" onClick={() => handleDelete(photo)}>
              Delete Publication
            </li>
            <li onClick={toggleModal}>Cancel</li>
          </MoreOptions>
        ) : (
          <MoreOptions>
            <li>
              <Link to={`/photo/${photo.id}`}>Go to Publication</Link>
            </li>
            <li className="red" onClick={() => handleFollow(photo.user_id)}>
              Stop Following
            </li>
            <li onClick={toggleModal}>Cancel</li>
          </MoreOptions>
        )}
      </StyledModal>
    </>
  );
}
