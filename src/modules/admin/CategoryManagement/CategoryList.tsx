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
import { CATEGORY_TABLE_HEAD } from 'common/constants';
import { capitalizeFirstLetter } from 'common/helper/string';
import { CustomSnackbar } from 'components/Snackbar/CustomSnackbar';
import { useAppDispatch, useAppSelector } from 'common/hooks/ReduxHook';
import { RootState } from 'redux/store';
import {
  ICategoryColumn,
  ICategoryDataTable,
  IdCategoryType,
} from 'common/types/table.mui.model';
import {
  deleteCategoryById,
  getCategoryDetailById,
  getCategoryList,
} from 'redux/features/admin/categorySlice';
import { ClipLoading } from 'components/Loading/ClipLoader';

export const CategoryList = () => {
  const { categoryList, isLoading } = useAppSelector(
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
  }, [dispatch]);

  const categoryColumns = CATEGORY_TABLE_HEAD.map((item): ICategoryColumn => {
    const categoryLabel =
      item === 'id' ? item.toUpperCase() : capitalizeFirstLetter(item);
    return { id: item as IdCategoryType, label: categoryLabel };
  });

  function createCategoryData(id: number, name: string): ICategoryDataTable {
    return { id, name };
  }

  const categoryRows = categoryList?.map((item) => {
    return createCategoryData(item.id, item.categoryName);
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickEditButton = (categoryId: number) => {
    dispatch(getCategoryDetailById(categoryId));
  };

  const handleClickDeleteButton = async (categoryId: number) => {
    setSnackbarType('error');
    setResponseFromAPI(
      `You have deleted ${
        categoryList[categoryId - 1].categoryName
      } from database`,
    );
    setShowSnackbar(true);
    await dispatch(deleteCategoryById(categoryId));
    await dispatch(getCategoryList());
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
        <TableContainer sx={{ maxHeight: '56vh' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '2rem' }} align="center" colSpan={3}>
                  Category Management
                </TableCell>
              </TableRow>
              <TableRow>
                {categoryColumns.map((column) => (
                  <TableCell key={column.id} align="center">
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow sx={{ height: '40vh' }}>
                  <TableCell colSpan={3}>
                    <ClipLoading loading={isLoading} />
                  </TableCell>
                </TableRow>
              ) : (
                categoryRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {categoryColumns.map((column) => {
                          const value = row[column.id];
                          if (value) {
                            return (
                              <TableCell key={column.id} align="center">
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          } else {
                            return (
                              <TableCell key={column.id} align="center">
                                <Link
                                  to={`${routerPath.admin.CATEGORY_LIST}/${row.id}`}
                                  onClick={() => handleClickEditButton(row.id)}
                                >
                                  <Button
                                    sx={{
                                      marginRight: '1rem',
                                    }}
                                    color="info"
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                  >
                                    Edit
                                  </Button>
                                </Link>
                                <Button
                                  onClick={() =>
                                    handleClickDeleteButton(row.id)
                                  }
                                  color="error"
                                  variant="contained"
                                  startIcon={<DeleteIcon />}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            );
                          }
                        })}
                      </TableRow>
                    );
                  })
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Link to={routerPath.admin.CATEGORY_NEW}>
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
          count={categoryRows.length}
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
