import { FC } from 'react';
import {
  DeleteOutline,
  HighlightOff,
  ReportOutlined,
} from '@mui/icons-material';
import { Button } from '@mui/material';

import { DashboardColor } from 'common/types/color.model';
import './ConfirmDelete.style.scss';

interface ConfirmDeleteProps {
  handleConfirmDeleteFunction: () => Promise<void>;
}

const ConfirmDelete: FC<ConfirmDeleteProps> = ({
  handleConfirmDeleteFunction,
}) => {
  return (
    <div className="confirm_delete-container">
      <div className="confirm_delete-icon">
        <ReportOutlined
          sx={{ fontSize: 120, color: DashboardColor.LightYellow }}
        />
      </div>
      <div className="confirm_delete-title">Delete?</div>
      <div className="confirm_delete-description">
        Please ensure and then confirm
      </div>
      <div className="confirm_delete-btn">
        <Button
          sx={{ marginLeft: '1rem', marginTop: '1rem' }}
          color="error"
          variant="contained"
          startIcon={<DeleteOutline />}
          onClick={handleConfirmDeleteFunction}
        >
          Yes, delete it
        </Button>
        <Button
          sx={{ marginLeft: '1rem', marginTop: '1rem' }}
          color="inherit"
          variant="contained"
          startIcon={<HighlightOff />}
        >
          No, cancel
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDelete;
