import { FC } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

import { ColorSchema } from 'common/types/color.model';
import { LoadingPageProps } from './ClipLoader';
import './Loading.style.scss';

export const SyncLoading: FC<LoadingPageProps> = ({ loading }) => {
  return (
    <div className="loading-container">
      <SyncLoader color={ColorSchema.Black} loading={loading} size={20} />
    </div>
  );
};
