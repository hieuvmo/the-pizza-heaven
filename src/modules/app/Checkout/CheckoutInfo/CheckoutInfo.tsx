import { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { Cancel, CheckCircle, Reviews } from '@mui/icons-material';
import {
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import { ORDER_DETAIL_TABLE_HEAD } from 'common/constants';
import { convertDateNowToDayMonthYear } from 'common/helper/convertDate';
import { convertNumberToVND } from 'common/helper/convertMoney';
import { capitalizeFirstLetter } from 'common/helper/string';
import { IFood } from 'common/types/food.model';
import { IOrder, IOrderDetail, IOrderStatus } from 'common/types/order.model';
import {
  IdOrderDetailType,
  IOrderDetailColumn,
  IOrderDetailDataTable,
} from 'common/types/table.mui.model';
import appService from 'services/appService';
import './CheckoutInfo.style.scss';

interface CheckoutInfoProps {
  orderId: string;
}

export const CheckoutInfo: FC<CheckoutInfoProps> = ({ orderId }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [orderById, setOrderById] = useState<IOrder>({
    id: 0,
    userId: 0,
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    totalPrice: 0,
    status: IOrderStatus.NEW,
  });
  const [orderDetailByOrderId, setOrderDetailByOrderId] = useState<
    IOrderDetail[]
  >([]);
  const [foodByIdInOrderDetail, setFoodByIdInOrderDetail] = useState<IFood[]>(
    [],
  );

  useEffect(() => {
    const fetchOrderByIdAPI = async () => {
      try {
        const response = await appService.getOrderById(
          parseInt(orderId as string),
        );
        setOrderById(response);
      } catch (error) {
        console.log('Error when getOrderById', error);
      }
    };
    const fetchOrderDetailByOrderIdAPI = async () => {
      try {
        const response = await appService.getOrderDetailByOrderId(
          parseInt(orderId as string),
        );
        setOrderDetailByOrderId(response);
      } catch (error) {
        console.log('Error when getOrderDetailByOrderId', error);
      }
    };

    fetchOrderByIdAPI();
    fetchOrderDetailByOrderIdAPI();
  }, [orderId]);

  useEffect(() => {
    const foodIdArr = orderDetailByOrderId.map((item) => item.foodId);
    const fetchFoodListAPI = async () => {
      try {
        foodIdArr.forEach(async (item) => {
          const response = await appService.getFoodDetailById(item);
          setFoodByIdInOrderDetail((prevState) => [...prevState, response]);
        });
      } catch (error) {
        console.log('Error when getFoodDetailById', error);
      }
    };
    fetchFoodListAPI();
  }, [orderDetailByOrderId.length]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const orderDetailColumns = ORDER_DETAIL_TABLE_HEAD.map(
    (item): IOrderDetailColumn => {
      const orderDetailLabel = capitalizeFirstLetter(item);
      return { id: item as IdOrderDetailType, label: orderDetailLabel };
    },
  );

  const orderDetailRows = useMemo(() => {
    function createProductInCartData(
      ordinalNumber: number,
      thumbnail: string,
      name: string,
      price: string,
      quantity: number,
      total: string,
    ): IOrderDetailDataTable {
      return { ordinalNumber, thumbnail, name, price, quantity, total };
    }
    if (orderDetailByOrderId.length > 0) {
      return foodByIdInOrderDetail.map((item, index) => {
        return createProductInCartData(
          index + 1,
          item.thumbnail,
          item.name,
          convertNumberToVND(item.price),
          orderDetailByOrderId[index].quantity,
          convertNumberToVND(item.price * orderDetailByOrderId[index].quantity),
        );
      });
    }
    return [];
  }, [foodByIdInOrderDetail, orderDetailByOrderId]);

  const handleClickCompleteOrder = async () => {
    try {
      const response = await appService.changeOrderStatusById(
        parseInt(orderId as string),
        {
          ...orderById,
          status: IOrderStatus.COMPLETE,
        },
      );
      setOrderById(response);
    } catch (error) {
      console.log('Error when changeOrderStatusById', error);
    }
  };

  const handleClickCancelOrder = async () => {
    try {
      const response = await appService.changeOrderStatusById(
        parseInt(orderId as string),
        {
          ...orderById,
          status: IOrderStatus.CANCEL,
        },
      );
      setOrderById(response);
    } catch (error) {
      console.log('Error when changeOrderStatusById', error);
    }
  };
  return (
    <div className="checkout_success-container">
      <div className="checkout_success-order_no">
        <img
          className="done-img"
          src="https://res.cloudinary.com/duitozhul/image/upload/v1656607145/the-pizza-heaven/other/order-done.svg"
          alt=""
        />
        <h3>
          Order information no:
          <span>{orderId}</span>
        </h3>
      </div>
      <div className="checkout_success-order_client_order">
        <div className="success_order-bg">
          <div className="success_order-title">
            1. Customer order information
          </div>
          <Grid
            container
            sx={{
              display: 'flex',
            }}
            spacing={2}
          >
            <Grid item justifyContent="center" xs={12} md={6}>
              First name: <span>{orderById.firstName}</span>
            </Grid>
            <Grid item justifyContent="center" xs={12} md={6}>
              Last name: <span>{orderById.lastName}</span>
            </Grid>
            <Grid item justifyContent="center" xs={12} md={6}>
              Phone number: <span>{orderById.phone}</span>
            </Grid>
            <Grid item justifyContent="center" xs={12} md={6}>
              Address: <span>{orderById.address}</span>
            </Grid>
            <Grid item justifyContent="center" xs={12} md={6}>
              Payment method: <span>Payment when getting product</span>
            </Grid>
            <Grid item justifyContent="center" xs={12} md={6}>
              Transportation: <span>Free shipping</span>
            </Grid>
            <Grid item justifyContent="center" xs={12} md={6}>
              Order date:{' '}
              <span>{convertDateNowToDayMonthYear(orderById.id)}</span>
            </Grid>
            <Grid item justifyContent="center" xs={12} md={6}>
              Order status:{' '}
              <span className="text-[#d30e15] font-bold">
                {orderById.status.toUpperCase()}
              </span>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className="checkout_success-product_order_list">
        <div className="success_order-bg">
          <div className="success_order-title">2. Product list in order</div>

          <Paper
            sx={{
              paddingBlock: '2rem',
              paddingInline: '1rem',
              margin: 'auto',
            }}
          >
            <TableContainer sx={{ maxHeight: '32vh' }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {orderDetailColumns.map((column) => (
                      <TableCell key={column.id}>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetailRows.length > 0 &&
                    orderDetailRows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage,
                      )
                      .map((row, index) => {
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            {orderDetailColumns.map((column) => {
                              const value = row[column.id];
                              if (value !== undefined) {
                                if (
                                  typeof value === 'string' &&
                                  value.includes('https')
                                ) {
                                  return (
                                    <TableCell
                                      key={column.id}
                                      sx={{ width: '7rem' }}
                                    >
                                      <img src={`${value}`} alt="123" />
                                    </TableCell>
                                  );
                                }
                                return (
                                  <TableCell key={column.id}>
                                    {column.format && typeof value === 'number'
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                                );
                              }
                              return (
                                <TableCell key={column.id}>
                                  <Button
                                    // onClick={() => handleClickDeleteButton(index)}
                                    variant="contained"
                                    startIcon={<Reviews />}
                                    disabled={
                                      orderById.status ===
                                        IOrderStatus.CONFIRM ||
                                      orderById.status === IOrderStatus.CANCEL
                                    }
                                  >
                                    Review
                                  </Button>
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
            </TableContainer>
            <Typography
              sx={{
                fontWeight: 500,
                textAlign: 'center',
                fontSize: '1.125rem',
                paddingTop: '1rem',
              }}
            >
              Total price:{' '}
              <strong className="checkout_success-total_price">
                {convertNumberToVND(orderById.totalPrice)}
              </strong>
            </Typography>
            <TablePagination
              rowsPerPageOptions={[5, 25, 100]}
              component="div"
              count={orderDetailRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          <div className="confirm-order">
            <Button
              sx={{ marginRight: '1rem' }}
              color="success"
              onClick={handleClickCompleteOrder}
              variant="contained"
              startIcon={<CheckCircle />}
              disabled={
                orderById.status === IOrderStatus.COMPLETE ||
                orderById.status === IOrderStatus.CANCEL
              }
            >
              Completed
            </Button>
            <Button
              color="error"
              onClick={handleClickCancelOrder}
              variant="contained"
              startIcon={<Cancel />}
              disabled={
                orderById.status === IOrderStatus.COMPLETE ||
                orderById.status === IOrderStatus.CANCEL
              }
            >
              Canceled
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
