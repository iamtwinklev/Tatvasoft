import React, { useEffect, useState } from 'react'
// import useNavigate from 'react-router-dom'
import {defaultFilter,  RecordsPerPage } from '../../constants/constant'
import categoryService from '../../service/category.service';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import Shared from '../../utils/shared';
import ConfirmationDialog from '../../components/ConfirmationDialog';
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const [filters, setFilters] = useState(defaultFilter);
    const [categoryRecords, setCategoryRecords] = useState({
        pageIndex: 0,
        pageSize: 10,
        totalPages: 1,
        items: [],
        totalItems: 0,
    });
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(0);

    const navigate = useNavigate();
    useEffect(() => {
        const timer = setTimeout(() => {
          if (filters.keyword === "") delete filters.keyword;
          searchAllCategories({ ...filters });
        }, 500);
        return () => clearTimeout(timer);
      }, [filters]);
    
      const searchAllCategories = (filters) => {
        categoryService.getAll(filters).then((res) => {
          setCategoryRecords(res);
        });
      };

      const columns = [{id:"name", label: "Category Name", minWidth: 100}];

      const onConfirmDelete = () => {
        categoryService
          .deleteCategory(selectedId)
          .then((res) => {
            toast.success(Shared.messages.DELETE_SUCCESS);
            setOpen(false);
            setFilters({ ...filters});
          })
          .catch((e) => toast.error(Shared.messages.DELETE_FAIL));
      };
  return (
    <div>
      <div className='container'>
        <Typography variant='h4' style={{marginBottom: "50px", marginTop: "50px", color: "#f44403"}}>Category</Typography>
        <div style={{display: "flex", alignItems: "center",}}>

            <TextField

                id='text'
                name='text'
                placeholder='Search...'
                variant='outlined'
                style={{marginBottom: "20px", marginRight: "20px"}}
                inputProps={{className: "small"}}
                onChange={(e) => {
                    setFilters({...filters, keyword: e.target.value, pageIndex:1})
                }}
            />
            <Button
            type="button"
            // className="btn pink-btn"
            variant="contained"
            style={{background: "#f44403", height: "61px", marginBottom: "auto"}}
            disableElevation
            onClick={() => navigate("/add-category")}
          >
            Add
          </Button>
        </div>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categoryRecords?.items?.map((row, index) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>
                    <Button
                      type="button"
                    //   className="green-btn btn"
                      variant="contained"
                      style={{background: "green", marginRight: "10px"}}
                      disableElevation
                      onClick={() => {
                        navigate(`/edit-category/${row.id}`);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      // className="btn pink-btn"
                      variant="contained"
                      style={{background: "#f44403"}}
                      disableElevation
                      onClick={() => {
                        setOpen(true);
                        setSelectedId(row.id ?? 0);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {!categoryRecords.items.length && (
                <TableRow className="TableRow">
                  <TableCell colSpan={5} className="TableCell">
                    <Typography align="center" className="noDataText">
                      No Category
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={RecordsPerPage}
          component="div"
          count={categoryRecords?.totalItems || 0}
          rowsPerPage={filters.pageSize || 0}
          page={filters.pageIndex - 1}
          onPageChange={(e, newPage) => {
            setFilters({ ...filters, pageIndex: newPage + 1 });
          }}
          onRowsPerPageChange={(e) => {
            setFilters({
              ...filters,
              pageIndex: 1,
              pageSize: Number(e.target.value),
            });
          }}
        />
        <ConfirmationDialog
          open={open}
          onClose={() => setOpen(false)}
          onConfirm={() => onConfirmDelete()}
          title="Delete category"
          description="Are you sure you want to delete this category?"
        />
      </div>
    </div>
  )
}

export default Category;