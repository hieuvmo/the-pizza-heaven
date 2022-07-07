import styled from '@emotion/styled';
import { Button } from '@mui/material';

import { ColorSchema } from 'common/types/color.model';

export const AuthButton = styled(Button)({
  background: `${ColorSchema.LightGreen} !important`,
  border: 0,
  borderRadius: '2.5rem !important',
  color: ColorSchema.White,
  fontSize: '1.125rem !important',
  height: '3.5rem',
  letterSpacing: '1px !important',
});
