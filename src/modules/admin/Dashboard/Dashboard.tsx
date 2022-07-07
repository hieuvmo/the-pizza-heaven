import { ReactNode, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import InventoryIcon from '@mui/icons-material/Inventory';
import PaidIcon from '@mui/icons-material/Paid';
import SellIcon from '@mui/icons-material/Sell';
import Skeleton from '@mui/material/Skeleton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Container from '@mui/system/Container';

import { convertNumberToVND } from 'common/helper/convertMoney';
import { useAppDispatch, useAppSelector } from 'common/hooks/ReduxHook';
import { DashboardColor } from 'common/types/color.model';
import {
  getLatestOrderList,
  getLatestUserList,
  getTotalOrderAndIncome,
  getTotalProductSold,
  getTotalUsers,
} from 'redux/features/admin/dashboardSlice';
import { RootState } from 'redux/store';
import './Dashboard.style.scss';

interface DashboardDataAnalysisProps {
  bgColor: DashboardColor;
  analysisTitle: string;
  analysisValue: number | string;
  analysisIcon: ReactNode;
  analysisPercent: string;
}

export const Dashboard = () => {
  const {
    totalUsers,
    totalOrders,
    productSold,
    totalIncome,
    latestUserList,
    latestOrderList,
    isLoading,
  } = useAppSelector((state: RootState) => state.adminDashboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTotalUsers());
    dispatch(getTotalOrderAndIncome());
    dispatch(getTotalProductSold());
    dispatch(getLatestUserList());
    dispatch(getLatestOrderList());
  }, [dispatch]);

  const DASHBOARD_DATA_ANALYSIS: DashboardDataAnalysisProps[] = [
    {
      bgColor: DashboardColor.LightRed,
      analysisTitle: 'Total Users',
      analysisValue: totalUsers,
      analysisIcon: <GroupIcon sx={{ color: DashboardColor.LightRed }} />,
      analysisPercent: '+12%',
    },
    {
      bgColor: DashboardColor.LightBlue,
      analysisTitle: 'Total Orders',
      analysisValue: totalOrders,
      analysisIcon: <InventoryIcon sx={{ color: DashboardColor.LightBlue }} />,
      analysisPercent: '+29%',
    },
    {
      bgColor: DashboardColor.LightGreen,
      analysisTitle: 'Product Sold',
      analysisValue: productSold,
      analysisIcon: <PaidIcon sx={{ color: DashboardColor.LightGreen }} />,
      analysisPercent: '+35%',
    },
    {
      bgColor: DashboardColor.LightYellow,
      analysisTitle: 'Total Income',
      analysisValue: convertNumberToVND(totalIncome),
      analysisIcon: <SellIcon sx={{ color: DashboardColor.LightYellow }} />,
      analysisPercent: '+61%',
    },
  ];

  const renderNewCustomerSkeletonLoading = () => {
    const newCustomerRenderQuantity = [1, 2, 3, 4];
    return newCustomerRenderQuantity.map((item) => (
      <div className="flex justify-between" key={item}>
        <div className="new-customer-item">
          <div className="customer-avatar">
            <Skeleton
              animation="wave"
              variant="circular"
              width={'2.5rem'}
              height={'2.5rem'}
            />
          </div>
          <div className="customer-info">
            <div className="customer-email">
              <Skeleton
                variant="rectangular"
                width={'10rem'}
                height={'1.5rem'}
                sx={{ marginBottom: '0.25rem' }}
              />
            </div>
            <div className="customer-name">
              <Skeleton
                variant="rectangular"
                width={'8rem'}
                height={'1.25rem'}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <Skeleton
            animation="wave"
            variant="circular"
            width={'0.5rem'}
            height={'0.5rem'}
          />
        </div>
      </div>
    ));
  };

  const renderNewOrderSkeletonLoading = () => {
    const newOrderRenderQuantity = [1, 2, 3];
    return newOrderRenderQuantity.map((item) => (
      <div className="order-info" key={item}>
        <div className="flex flex-col">
          <div className="customer-name">
            <Skeleton variant="rectangular" width={'10rem'} height={'1.5rem'} />
          </div>
          <div className="customer-phone">
            <Skeleton variant="rectangular" width={'8rem'} height={'1.25rem'} />
          </div>
          <div className="customer-address">
            <Skeleton variant="rectangular" width={'8rem'} height={'1.25rem'} />
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="order-status">
            <Skeleton variant="rectangular" width={'8rem'} height={'1.5rem'} />
          </div>
          <div className="total-price">
            <Skeleton variant="rectangular" width={'8rem'} height={'1.5rem'} />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <Container maxWidth="lg">
      <div className="dashboard-container">
        <Grid container spacing={3} justifyContent="center">
          {DASHBOARD_DATA_ANALYSIS.map((item, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Card sx={{ backgroundColor: item.bgColor }}>
                <CardContent
                  sx={{ padding: '1rem' }}
                  className="dashboard-card_content"
                >
                  <div className="card-introduction">
                    <div className="intro-title">
                      {isLoading ? (
                        <Skeleton
                          variant="rectangular"
                          width={'10rem'}
                          height={'1.5rem'}
                          sx={{ marginBottom: '0.25rem' }}
                        />
                      ) : (
                        <span>{item.analysisTitle}</span>
                      )}
                      {isLoading ? (
                        <Skeleton
                          variant="rectangular"
                          width={'10rem'}
                          height={'1.75rem'}
                          sx={{ marginBottom: '1rem' }}
                        />
                      ) : (
                        <strong>{item.analysisValue}</strong>
                      )}
                    </div>
                    <div className="intro-icon">
                      {isLoading ? (
                        <Skeleton
                          variant="rectangular"
                          width={'1.5rem'}
                          height={'1.5rem'}
                          sx={{ margin: '0.75rem' }}
                        />
                      ) : (
                        <div>{item.analysisIcon}</div>
                      )}
                    </div>
                  </div>

                  {isLoading ? (
                    <Skeleton
                      variant="rectangular"
                      width={'100%'}
                      height={'1.35rem'}
                    />
                  ) : (
                    <div className="card-description">
                      <label>{item.analysisPercent}</label>From Previous Month
                    </div>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid
          container
          spacing={3}
          justifyContent="center"
          sx={{ marginTop: '1.5rem' }}
        >
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent
                sx={{ paddingInline: '1.5rem' }}
                className="dashboard-card_body"
              >
                <div className="card-header">New customer</div>
                <div className="line-break"></div>

                {isLoading
                  ? renderNewCustomerSkeletonLoading()
                  : latestUserList.map((user) => (
                      <div className="flex justify-between" key={user.id}>
                        <div className="new-customer-item">
                          <div className="customer-avatar">
                            <AccountCircleIcon sx={{ fontSize: '2.5rem' }} />
                          </div>
                          <div className="customer-info">
                            <div className="customer-email">{user.email}</div>
                            <div className="customer-name">{`${user.firstName} ${user.lastName}`}</div>
                          </div>
                        </div>
                        <div className="customer-status"></div>
                      </div>
                    ))}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent
                sx={{ paddingInline: '1.5rem' }}
                className="dashboard-card_body"
              >
                <div className="card-header">New order</div>
                <div className="line-break"></div>
                {isLoading
                  ? renderNewOrderSkeletonLoading()
                  : latestOrderList.map((order) => (
                      <div className="order-info" key={order.id}>
                        <div className="flex flex-col">
                          <div className="customer-name">{`${order.firstName} ${order.lastName}`}</div>
                          <div className="customer-phone">{order.phone}</div>
                          <div className="customer-address">
                            {order.address}
                          </div>
                        </div>
                        <div className="flex flex-col justify-center">
                          <div className="order-status">{order.status}</div>
                          <div className="total-price">
                            {convertNumberToVND(order.totalPrice)}
                          </div>
                        </div>
                      </div>
                    ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};
