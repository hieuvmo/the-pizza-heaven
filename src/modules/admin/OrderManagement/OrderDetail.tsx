import {
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
import { Container } from '@mui/system';
import { routerPath } from 'common/config/router/router.path';
import { ADMIN_ORDER_DETAIL_TABLE_HEAD } from 'common/constants';
import { convertNumberToVND } from 'common/helper/convertMoney';
import { capitalizeFirstLetter } from 'common/helper/string';
import { useAppDispatch, useAppSelector } from 'common/hooks/ReduxHook';
import {
  IdOrderDetailType,
  IOrderDetailColumn,
  IOrderDetailDataTable,
} from 'common/types/table.mui.model';
import { GoBack } from 'components/GoBack/GoBack';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTotalPriceInOrderTable } from 'redux/features/admin/orderAdminSlice';
import {
  getFoodListByIdInOrderDetail,
  getOrderDetailByOrderId,
} from 'redux/features/admin/orderDetailAdminSlice';
import { RootState } from 'redux/store';

export const OrderDetail = () => {
  const { id } = useParams();

  const { orderDetailById, foodListInOrderDetail, isLoading } = useAppSelector(
    (state: RootState) => state.adminOrderDetail,
  );
  const { totalPrice } = useAppSelector((state: RootState) => state.adminOrder);
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getOrderDetailByOrderId(parseInt(id as string)));
    dispatch(getTotalPriceInOrderTable(parseInt(id as string)));
  }, [dispatch, id]);

  useEffect(() => {
    const foodIdArr = orderDetailById.map((item) => item.foodId);
    foodIdArr.forEach((item) => {
      dispatch(getFoodListByIdInOrderDetail(item));
    });
  }, [dispatch, orderDetailById.length]);

  const orderDetailColumns = ADMIN_ORDER_DETAIL_TABLE_HEAD.map(
    (item): IOrderDetailColumn => {
      const orderDetailLabel = capitalizeFirstLetter(item);
      return { id: item as IdOrderDetailType, label: orderDetailLabel };
    },
  );

  const orderDetailRows = useMemo(() => {
    function createOrderDetailData(
      ordinalNumber: number,
      thumbnail: string,
      name: string,
      price: string,
      quantity: number,
      total: string,
    ): IOrderDetailDataTable {
      return { ordinalNumber, thumbnail, name, price, quantity, total };
    }

    if (orderDetailById.length === foodListInOrderDetail.length) {
      return orderDetailById.map((item, index) => {
        return createOrderDetailData(
          index + 1,
          foodListInOrderDetail[index].thumbnail,
          foodListInOrderDetail[index].name,
          convertNumberToVND(foodListInOrderDetail[index].price),
          item.quantity,
          convertNumberToVND(
            foodListInOrderDetail[index].price * item.quantity,
          ),
        );
      });
    }
    return [];
  }, [orderDetailById, foodListInOrderDetail]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <GoBack pageLink={routerPath.admin.ORDER_LIST} />
      {!isLoading && (
        <Container maxWidth="lg">
          <Paper
            sx={{
              paddingBlock: '3rem',
              paddingInline: '1rem',
              margin: 'auto',
              marginBlock: '2.5rem',
            }}
          >
            <TableContainer sx={{ maxHeight: '42.5vh' }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{ fontSize: '2rem' }}
                      align="center"
                      colSpan={6}
                    >
                      Order Detail
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    {orderDetailColumns.map((column) => (
                      <TableCell key={column.id}>{column.label}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderDetailRows.length === orderDetailById.length &&
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
                {convertNumberToVND(totalPrice)}
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
        </Container>
      )}
    </>
  );
};
