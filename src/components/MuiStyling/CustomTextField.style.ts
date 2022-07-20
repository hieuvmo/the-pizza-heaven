import styled from '@emotion/styled';
import { TextField } from '@mui/material';

import { ColorSchema } from 'common/types/color.model';

export const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: `${ColorSchema.LightGreen} !important`,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: `${ColorSchema.LightGreen} !important`,
  },
  '& input:invalid + fieldset': {
    borderColor: '#ff8886 !important',
  },
  '& input:valid:focus + fieldset': {
    borderLeftWidth: 6,
    padding: '0.25rem !important',
    borderColor: `${ColorSchema.LightGreen} !important`,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#909090',
    },
    '&.Mui-focused fieldset': {
      borderColor: ColorSchema.LightGreen,
      padding: '0.25rem !important',
      borderLeftWidth: 6,
    },
  },
});
