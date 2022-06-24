import { Close } from '@mui/icons-material';
import { ColorSchema } from 'common/types/color.model';
import React from 'react';
import Modal from 'react-modal';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  styling: ReactModal.Styles;
  requestCloseModal?: () => void;
}

export const CustomModal: React.FunctionComponent<ModalProps> = ({
  children,
  isOpen,
  setIsOpen,
  styling,
  requestCloseModal,
}) => {
  const styledModal = {
    ...styling,
    marginTop: '5rem',
    width: '80%',
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      style={styling}
      onRequestClose={requestCloseModal}
    >
      <div
        className="flex justify-end cursor-pointer text-[#e0e0e0]"
        onClick={handleCloseModal}
      >
        <Close
          sx={{
            fontSize: '3rem',
            ':hover': {
              color: ColorSchema.LightGreen,
            },
          }}
        />
      </div>
      {children}
    </Modal>
  );
};
