import { Close } from '@mui/icons-material';
import { ColorSchema } from 'common/types/color.model';
import React from 'react';
import ReactModal from 'react-modal';
import Modal from 'react-modal';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  newStyled?: ReactModal.Styles;
  requestCloseModal?: () => void;
}

export const CustomModal: React.FunctionComponent<ModalProps> = ({
  children,
  isOpen,
  setIsOpen,
  newStyled,
  requestCloseModal,
}) => {
  const currentStyled: ReactModal.Styles = {
    overlay: { marginTop: '3rem', backgroundColor: 'rgba(0,0,0, .8)' },
    content: {
      marginInline: 'auto',
      marginBlock: 'auto',
      height: 'fit-content',
      width: 'fit-content',
      paddingBottom: '2.5rem',
      borderRadius: '1rem',
    },
  };

  const assignResultStyled: React.CSSProperties[] = [];
  for (const [currentKey, currentValue] of Object.entries(currentStyled)) {
    for (const [newKey, newValue] of Object.entries(
      newStyled as ReactModal.Styles,
    )) {
      if (currentKey === newKey)
        assignResultStyled.push(Object.assign(currentValue, newValue));
    }
  }

  //using memo
  const finalStyled: ReactModal.Styles = {
    overlay: assignResultStyled[0],
    content: assignResultStyled[1],
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      style={finalStyled}
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
