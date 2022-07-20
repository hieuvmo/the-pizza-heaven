import { ChangeEvent, useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { AlertColor } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';

import { routerPath } from 'common/config/router/router.path';
import { PRODUCT_TABLE_HEAD } from 'common/constants';
import { convertNumberToVND } from 'common/helper/convertMoney';
import { capitalizeFirstLetter } from 'common/helper/string';
import { useAppDispatch, useAppSelector } from 'common/hooks/ReduxHook';
import { RootState } from 'redux/store';
import { CustomSnackbar } from 'components/Snackbar/CustomSnackbar';
import { getCategoryList } from 'redux/features/admin/categorySlice';
import {
  IdFoodType,
  IFoodColumn,
  IFoodDataTable,
} from 'common/types/table.mui.model';
import {
  deleteFoodById,
  getFoodDetailById,
  getFoodList,
} from 'redux/features/admin/foodSlice';
import { ClipLoading } from 'components/Loading/ClipLoader';

export const ProductList = () => {
  const { foodList, isLoading } = useAppSelector(
    (state: RootState) => state.adminFood,
  );
  const { categoryList } = useAppSelector(
    (state: RootState) => state.adminCategory,
  );
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [responseFromAPI, setResponseFromAPI] = useState('');
  const [snackbarType, setSnackbarType] = useState<AlertColor>();

  useEffect(() => {
    dispatch(getCategoryList());
    dispatch(getFoodList());
  }, [dispatch]);

  const getCategoryNameById = (categoryId: number) => {
    return categoryList[categoryId - 1].categoryName;
  };

  const foodColumns = PRODUCT_TABLE_HEAD.map((item): IFoodColumn => {
    const foodLabel =
      item === 'id' ? item.toUpperCase() : capitalizeFirstLetter(item);
    return { id: item as IdFoodType, label: foodLabel };
  });

  function createFoodData(
    id: number,
    categoryName: string,
    thumbnail: string,
    name: string,
    description: string,
    price: string,
    isStocked: boolean,
  ): IFoodDataTable {
    return { id, categoryName, thumbnail, name, description, price, isStocked };
  }

  const foodRows = foodList?.map((item) => {
    return createFoodData(
      item.id,
      getCategoryNameById(item.categoryId),
      item.thumbnail,
      item.name,
      item.description,
      convertNumberToVND(item.price),
      item.isStock,
    );
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickEditButton = (foodId: number) => {
    dispatch(getFoodDetailById(foodId));
  };

  const handleClickDeleteButton = async (foodId: number) => {
    setSnackbarType('error');
    setResponseFromAPI(
      `You have deleted ${foodList[foodId - 1].name} from database`,
    );
    setShowSnackbar(true);

    await dispatch(deleteFoodById(foodId));
    await dispatch(getFoodList());
  };

  return (
    <Container maxWidth="lg">
      <Paper
        sx={{
          paddingBlock: '3rem',
          paddingInline: '1rem',
          margin: 'auto',
          marginBlock: '2.5rem',
        }}
      >
        <TableContainer sx={{ maxHeight: '55vh' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '2rem' }} align="center" colSpan={8}>
                  Product Management
                </TableCell>
              </TableRow>
              <TableRow>
                {foodColumns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow sx={{ height: '39vh' }}>
                  <TableCell colSpan={8}>
                    <ClipLoading loading={isLoading} />
                  </TableCell>
                </TableRow>
              ) : (
                foodRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {foodColumns.map((column) => {
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

                            if (typeof value === 'boolean') {
                              return (
                                <TableCell key={column.id}>
                                  {value ? <p>Yes</p> : <p>No</p>}
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
                              <Link
                                to={`${routerPath.admin.PRODUCT_LIST}/${row.id}`}
                                onClick={() => handleClickEditButton(row.id)}
                              >
                                <Button
                                  sx={{
                                    marginRight: '1rem',
                                    minWidth: '7rem',
                                  }}
                                  color="info"
                                  variant="contained"
                                  startIcon={<EditIcon />}
                                >
                                  Edit
                                </Button>
                              </Link>
                              <Button
                                sx={{ minWidth: '7rem' }}
                                onClick={() => handleClickDeleteButton(row.id)}
                                color="error"
                                variant="contained"
                                startIcon={<DeleteIcon />}
                              >
                                Delete
                              </Button>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Link to={routerPath.admin.PRODUCT_NEW}>
          <Button
            sx={{ marginLeft: '1rem', marginTop: '1rem' }}
            color="success"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Add new
          </Button>
        </Link>

        <TablePagination
          rowsPerPageOptions={[5, 25, 100]}
          component="div"
          count={foodRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <CustomSnackbar
        snackbarColor={snackbarType}
        res={responseFromAPI}
        open={showSnackbar}
        setOpen={setShowSnackbar}
      />
    </Container>
  );
};
