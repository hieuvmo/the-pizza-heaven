import React from 'react';
import Modal from 'react-modal';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  styling: ReactModal.Styles;
  requestCloseModal?: () => void;
}

export const CustomModal: React.FunctionComponent<ModalProps> = ({ children, isOpen, styling, requestCloseModal }) => {
  return (
    <Modal isOpen={isOpen} style={styling} onRequestClose={requestCloseModal}>
      {children}
    </Modal>
  );
};
