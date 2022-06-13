import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';

export const AuthTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#008c7a !important',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#008c7a !important',
  },
  '& input:valid + fieldset': {
    borderColor: '#909090 !important',
    borderWidth: 2,
  },
  '& input:invalid + fieldset': {
    borderColor: '#ff8886 !important',
    borderWidth: 2,
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 6,
    padding: '4px !important',
    borderColor: '#008c7a !important',
  },
});

export const AuthButton = styled(Button)({
  background: '#008c7a !important',
  border: 0,
  borderRadius: '40px !important',
  color: 'white',
  fontSize: '18px !important',
  height: '56px',
  letterSpacing: '1px !important',
});

export const SubmitButtonStyle: React.CSSProperties = {
  marginTop: '0.6rem',
  textTransform: 'capitalize',
  paddingBlock: '8px',
  fontSize: '18px',
  fontWeight: '500',
  letterSpacing: '2px',
};
