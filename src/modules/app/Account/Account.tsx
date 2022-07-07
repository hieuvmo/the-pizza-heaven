import { useState } from 'react';
import { AccountCircle } from '@mui/icons-material';
import { Container, Grid } from '@mui/material';

import { ColorSchema } from 'common/types/color.model';
import { Profile } from './Profile/Profile';
import { IUser } from 'common/types/user.model';
import { getLocalStorageItem } from 'common/helper/storage';
import { BoughtHistory } from './BoughtHistory/BoughtHistory';
import './Account.style.scss';

export enum AccountTabs {
  PROFILE = 'Profile',
  BOUGHT_HISTORY = 'Bought History',
}

const tabExist = [AccountTabs.PROFILE, AccountTabs.BOUGHT_HISTORY];

export const Account = () => {
  const userInfo: IUser = getLocalStorageItem('user-info');

  const [accountTabs, setAccountTabs] = useState<AccountTabs>(
    AccountTabs.PROFILE,
  );

  const handleClickTabItem = (tabName: AccountTabs) => {
    setAccountTabs(tabName);
  };

  return (
    <Container className="px-4 py-12">
      <Grid
        container
        sx={{
          display: 'flex',
        }}
        spacing={2}
      >
        <Grid
          item
          flexDirection="column"
          justifyContent="center"
          xs={12}
          md={4}
        >
          <div className="account-avatar">
            <AccountCircle
              sx={{ fontSize: '10rem', color: ColorSchema.LightGreen }}
            />
          </div>
          <div className="account-info">
            <div className="full-name">{`${userInfo.firstName} ${userInfo.lastName}`}</div>
            <div className="info-item">
              Account Status:
              <span>ACTIVE</span>
            </div>
            <hr />
            <div className="info-item">
              Email:
              <span>{userInfo.email}</span>
            </div>
            <hr />
          </div>
          <ul className="account-tabs">
            {tabExist.map((item, index) => (
              <li
                key={index}
                className={`tab-item ${accountTabs === item ? 'active' : ''}`}
                onClick={() => handleClickTabItem(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item justifyContent="center" xs={12} md={8}>
          {accountTabs === AccountTabs.PROFILE ? (
            <Profile />
          ) : (
            <BoughtHistory />
          )}
        </Grid>
      </Grid>
    </Container>
  );
};
