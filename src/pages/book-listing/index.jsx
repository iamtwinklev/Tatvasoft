import React, { useEffect, useMemo, useState } from 'react'
import Typography from '@mui/material/Typography';
import { FormControl, Grid, InputLabel, MenuItem, Pagination, Select, TextField } from '@mui/material';
import categoryService from '../../service/category.service';
import { useAuthContext } from '../../context/auth';
import { defaultFilter } from '../../constants/constant';
import bookService from '../../service/book.service';
import { toast } from 'react-toastify';
import shared from '../../utils/shared';
import './style.css'
import { useCartContext } from '../../context/cart';

const BookListing = () => {

  const authContext = useAuthContext();
  const cartContext = useCartContext();
  // const classes = productListingStyle();
  // const materialClasses = materialCommonStyles();
  const [bookResponse, setBookResponse] = useState({
    pageIndex: 0,
    pageSize: 10,
    totalPages: 1,
    items: [],
    totalItems: 0,
  });
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState();
  const [filters, setFilters] = useState(defaultFilter);

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.keyword === "") delete filters.keyword;
      searchAllBooks({ ...filters });
    }, 500);
    return () => clearTimeout(timer);
  }, [filters]);

  const searchAllBooks = (filters) => {
    bookService.getAll(filters).then((res) => {
      setBookResponse(res);
    });
  };

  const getAllCategories = async () => {
    await categoryService.getAll().then((res) => {
      if (res) {
        setCategories(res);
      }
    });
  };

  const books = useMemo(() => {
    const bookList = [...bookResponse.items];
    if (bookList) {
      bookList.forEach((element) => {
        element.category = categories.find(
          (a) => a.id === element.categoryId
        )?.name;
      });
      return bookList;
    }
    return [];
  }, [categories, bookResponse]);

  const addToCart = (book) => {
    shared.addToCart(book, authContext.user.id).then((res) => {
      if (res.error) {
        toast.error(res.message);
      } else {
        toast.success(res.message);
        cartContext.updateCart();
      }
    });
  };

  const sortBooks = (e) => {
    setSortBy(e.target.value);
    const bookList = [...bookResponse.items];

    bookList.sort((a, b) => {
      if (a.name < b.name) {
        return e.target.value === "a-z" ? -1 : 1;
      }
      if (a.name > b.name) {
        return e.target.value === "a-z" ? 1 : -1;
      }
      return 0;
    });
    setBookResponse({ ...bookResponse, items: bookList });
  };

  return (
    <div >
      <div className="container">
        <Typography variant="h4" style={{textAlign: "center", margin: "50px 0 50px 0", color: "#f44403"}}>Book Listing</Typography>
        <Grid  style={{margin: "0", padding: "0"}}container className="title-wrapper">
          <Grid item xs={6}>
            <Typography variant="h6">
              Total
              <span> - {bookResponse.totalItems} items</span>
            </Typography>
          </Grid>
          <div className="dropdown-wrapper">
            <TextField
              id="text"
              className="dropdown-wrapper"
              name="text"
              placeholder="Search..."
              variant="outlined"
              inputProps={{ className: "small" }}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  keyword: e.target.value,
                  pageIndex: 1,
                });
              }}
            />
          </div>
          <div style={{display: "flex", alignItems: "baseline",
    marginRight: "50px"}}>
            <InputLabel htmlFor="select" style={{marginRight: "10px"}}>Sort By</InputLabel>
          <FormControl className="dropdown-wrapper" variant="outlined">
            <Select
              // className={materialClasses.customSelect}
              // MenuProps={{
              //   classes: { paper: materialClasses.customSelect },
              // }}
              onChange={sortBooks}
              value={sortBy}
            >
              <MenuItem value="a-z">a - z</MenuItem>
              <MenuItem value="z-a">z - a</MenuItem>
            </Select>
          </FormControl>
          </div>
        </Grid>
        <div className="product-list-wrapper">
          <div className="product-list-inner-wrapper">
            {books.map((book, index) => (
              <div className="product-list" key={index}>
                <div className="product-list-inner">
                  <em>
                    <img
                      src={book.base64image}
                      // style={{width: "250px", height: "250px"}}
                      className="image"
                      alt="dummyimage"
                    />
                  </em>
                  <div className="content-wrapper">
                    <Typography variant="h3" style={{fontSize: "1rem"}}>{book.name}</Typography>
                    <span className="category">({book.category})</span>
                    <p className="description">{book.description}</p>
                    <p className="price">
                      <span className="discount-price">
                        MRP &#8377; {book.price}
                      </span>
                    </p>
                    <button style={{cursor: "pointer", background: "#f44403", color:"white", border: "1px solid #f44403"}} className="MuiButtonBase-root MuiButton-root MuiButton-contained btn pink-btn MuiButton-containedPrimary MuiButton-disableElevation">
                      <span
                        className="MuiButton-label"
                        onClick={() => addToCart(book)}
                      >
                        ADD TO CART
                      </span>
                      <span className="MuiTouchRipple-root"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pagination-wrapper">
          <Pagination
            count={bookResponse.totalPages}
            page={filters.pageIndex}
            onChange={(e, newPage) => {
              setFilters({ ...filters, pageIndex: newPage });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BookListing

