import { createTheme } from '@mui/material';
import { ColorSchema } from 'common/types/color.model';

export let theme = createTheme({
  palette: {
    primary: {
      main: ColorSchema.LightGreen,
    },
  },
});
