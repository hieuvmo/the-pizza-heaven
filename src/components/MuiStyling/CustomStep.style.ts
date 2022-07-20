import styled from '@emotion/styled';
import { Step } from '@mui/material';

import { ColorSchema } from 'common/types/color.model';

export const CustomStep = styled(Step)({
  '&-MuiStepIcon-root .Mui-active': {
    color: `${ColorSchema.LightGreen} !important`,
  },
});
