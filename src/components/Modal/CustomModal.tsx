import CloseIcon from '@mui/icons-material/Close';
import {
  CSSProperties,
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
} from 'react';
import { Styles } from 'react-modal';
import Modal from 'react-modal';

import { ColorSchema } from 'common/types/color.model';

interface ModalProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  newStyled?: Styles;
  requestCloseModal?: () => void;
}

export const CustomModal: FunctionComponent<ModalProps> = ({
  children,
  isOpen,
  setIsOpen,
  newStyled,
  requestCloseModal,
}) => {
  const currentStyled: Styles = {
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

  const assignResultStyled: CSSProperties[] = [];
  for (const [currentKey, currentValue] of Object.entries(currentStyled)) {
    for (const [newKey, newValue] of Object.entries(newStyled as Styles)) {
      if (currentKey === newKey)
        assignResultStyled.push(Object.assign(currentValue, newValue));
    }
  }

  const finalStyled: Styles = {
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
        <CloseIcon
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
