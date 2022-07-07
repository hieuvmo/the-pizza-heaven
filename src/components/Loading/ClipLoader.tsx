import { FC } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import { ColorSchema } from 'common/types/color.model';
import './Loading.style.scss';

export interface LoadingPageProps {
  loading: boolean;
}

export const ClipLoading: FC<LoadingPageProps> = ({ loading }) => {
  return (
    <div className="loading-container">
      <ClipLoader color={ColorSchema.Black} loading={loading} size={50} />
    </div>
  );
};
