import {
  AccountCircle,
  Group,
  Inventory,
  Paid,
  Sell,
} from '@mui/icons-material';
import { Card, CardActionArea, CardContent, Grid } from '@mui/material';
import { Container } from '@mui/system';
import { convertNumberToVND } from 'common/helper/convertMoney';
import { useAppDispatch, useAppSelector } from 'common/hooks/ReduxHook';
import React, { useEffect } from 'react';
import {
  getLatestOrderList,
  getLatestUserList,
  getTotalOrderAndIncome,
  getTotalProductSold,
  getTotalUsers,
} from 'redux/features/admin/dashboardSlice';
import { RootState } from 'redux/store';
import './Dashboard.style.scss';

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

  return (
    <Container maxWidth="lg">
      {!isLoading && (
        <div className="dashboard-container">
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} sm={6} lg={3}>
              <Card sx={{ backgroundColor: '#ff5370' }}>
                <CardContent
                  sx={{ padding: '1.5rem' }}
                  className="dashboard-card_content"
                >
                  <div className="card-introduction">
                    <div className="intro-title">
                      <span>Total Users</span>
                      <strong>{totalUsers}</strong>
                    </div>
                    <div className="intro-icon">
                      <Group sx={{ color: '#ff5370' }} />
                    </div>
                  </div>
                  <div className="card-description">
                    <label>+12% </label>From Previous Month
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Card sx={{ backgroundColor: '#4099ff' }}>
                <CardContent
                  sx={{ padding: '1.5rem' }}
                  className="dashboard-card_content"
                >
                  <div className="card-introduction">
                    <div className="intro-title">
                      <span>Total Orders</span>
                      <strong>{totalOrders}</strong>
                    </div>
                    <div className="intro-icon">
                      <Inventory sx={{ color: '#4099ff' }} />
                    </div>
                  </div>
                  <div className="card-description">
                    <label>+29% </label>From Previous Month
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Card sx={{ backgroundColor: '#2ed8b6' }}>
                <CardContent
                  sx={{ padding: '1.5rem' }}
                  className="dashboard-card_content"
                >
                  <div className="card-introduction">
                    <div className="intro-title">
                      <span>Product Sold</span>
                      <strong>{productSold}</strong>
                    </div>
                    <div className="intro-icon">
                      <Sell sx={{ color: '#2ed8b6' }} />
                    </div>
                  </div>
                  <div className="card-description">
                    <label>+35% </label>From Previous Month
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Card sx={{ backgroundColor: '#ffb64d' }}>
                <CardContent
                  sx={{ padding: '1.5rem' }}
                  className="dashboard-card_content"
                >
                  <div className="card-introduction">
                    <div className="intro-title">
                      <span>Total Income</span>
                      <strong>{convertNumberToVND(totalIncome)}</strong>
                    </div>
                    <div className="intro-icon">
                      <Paid sx={{ color: '#ffb64d' }} />
                    </div>
                  </div>
                  <div className="card-description">
                    <label>+61% </label>From Previous Month
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={3}
            justifyContent="center"
            sx={{ marginTop: '1.5rem' }}
          >
            <Grid item xs={12} md={6}>
              <Card>
                <CardActionArea>
                  <CardContent
                    sx={{ paddingInline: '1.5rem' }}
                    className="dashboard-card_body"
                  >
                    <div className="card-header">New customer</div>
                    <div className="line-break"></div>
                    {latestUserList.map((user) => (
                      <div className="flex justify-between">
                        <div className="new-customer-item">
                          <div className="customer-avatar">
                            <AccountCircle sx={{ fontSize: '2.5rem' }} />
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
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <CardActionArea>
                  <CardContent
                    sx={{ paddingInline: '1.5rem' }}
                    className="dashboard-card_body"
                  >
                    <div className="card-header">New order</div>
                    <div className="line-break"></div>
                    {latestOrderList.map((order) => (
                      <div className="order-info">
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
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </div>
      )}
    </Container>
  );
};
