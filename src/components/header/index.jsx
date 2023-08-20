import React, { useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import './Header.css'
import Shared from "../../utils/shared";
import { useAuthContext } from "../../context/auth";
import logo from "../../assets/images/logo.jpg"
import { RoutePaths } from "../../utils/enum";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import bookService from "../../service/book.service";
import { AppBar, Button, List, ListItem, TextField } from '@mui/material';
import search1 from '../../assets/images/search1.png'
import { useCartContext } from "../../context/cart";

const Header = () => {
  // const classes = headerStyle();
  const authContext = useAuthContext();
  const cartContext = useCartContext();
  // const [open, setOpen] = useState(false);
  const open = false;
  const [query, setquery] = useState("");
  const [bookList, setbookList] = useState([]);
  const [openSearchResult, setOpenSearchResult] = useState(false);

  const navigate = useNavigate();

  // for mobile menu
  const openMenu = () => {
    document.body.classList.toggle("open-menu");
  };

  const items = useMemo(() => {
    return Shared.NavigationItems.filter(
      (item) =>
        !item.access.length || item.access.includes(authContext.user.roleId)
    );
  }, [authContext.user]);

  console.log(items);
  const logOut = () => {
    authContext.signOut();
    // cartContext.emptyCart();
  };

  const searchBook = async () => {
    const res = await bookService.searchBook(query);
    setbookList(res);
  };

  const search = () => {
    document.body.classList.add("search-results-open");
    searchBook();
    setOpenSearchResult(true);
  };

  const addToCart = (book) => {
    if (!authContext.user.id) {
      navigate(RoutePaths.Login);
      toast.error("Please login before adding books to cart");
    } else {
      Shared.addToCart(book, authContext.user.id).then((res) => {
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.success("Item added in cart");
          // cartContext.updateCart();
        }
      });
    }
  };

  return (
    <div>
      <AppBar style={{ background: "none"}} id="header" position="static">
        <div
          style={{ display: open ? "none" : "block" }}
        ></div>
        <div className="bottom-header" >
          <div className="container">
            <div className="header-wrapper">
              <div className="logo-wrapper">
                <Link to="/" className="site-logo" title="logo">
                  <img style={{ width: "100px", height: "100px" }} src={logo} alt="logo" />
                </Link>
              </div>
              <div className="nav-wrapper">
                <div className="top-right-bar">
                  <List className="top-nav-bar">
                    {!authContext.user.id && (
                      <>
                        <ListItem>
                          <NavLink to={RoutePaths.Login} title="Login">
                            Login
                          </NavLink>
                        </ListItem>
                        <ListItem>
                          <Link to={RoutePaths.Register} title="Register">
                            Register
                          </Link>
                        </ListItem>
                      </>
                    )}
                    {items.map((item, index) => (
                      <ListItem key={index}>
                        <Link className="link" to={item.route} title={item.name}>
                          {item.name}
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                  <List className="cart-country-wrap">
                    <ListItem className="cart-link" >
                      <Link to="/cart" title="Cart" style={{ marginLeft: "20px", marginTop: "16px"  }}>
                      <button style={{fontSize:"1 rem", color: "#f44403", border: "1px solid #f44403",  cursor: "pointer"}}><i style={{color: "#f44403", margin: "5px 5px 5px 5px"}} class="fa fa-cart-arrow-down"></i><span style={{padding: "5px"}}>{cartContext.cartData.length}</span>Cart</button>
                        {/* <img src="" alt="cart.png" /> */}
                        {/* <span>{cartContext.cartData.length}</span> */}
                        
                      </Link>
                    </ListItem>
                    <ListItem className="hamburger" onClick={openMenu}>
                      <span></span>
                    </ListItem>
                  </List>

                  {authContext.user.id && (
                    <List className="right">
                      <Button style={{
                        background: "coral",
                        color: "white",
                        border: "1px solid coral",
                        fontWeight: "600",
                        fontSize: "inherit",
                        marginRight: "20px"
                      }} onClick={() => logOut()} variant="outlined">
                        Log out
                      </Button>
                    </List>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="search-overlay"
          onClick={() => {
            setOpenSearchResult(false);
            document.body.classList.remove("search-results-open");
          }}
        ></div>
        <div className="header-search-wrapper">
          <div className="container" style={{ padding: "25px" }}>
            <div className="header-search-outer">
              <div className="header-search-inner" style={{display: "flex"}}>
                <div className="text-wrapper">
                  <TextField
                    id="textHeader"
                    name="text"
                    placeholder="What are you looking for..."
                    variant="outlined"
                    value={query}
                    onChange={(e) => setquery(e.target.value)}
                  />

                  {openSearchResult && (
                    <>
                      <div style={{background: "black", width: "400px", display: "flex", flexDirection: "row-reverse"}}>
                      <span style={{marginRight: "10px", cursor: "pointer"}}
                        onClick={() => {
                          setOpenSearchResult(false);
                        }}
                      >
                        x
                      </span>
                        {bookList?.length === 0 && (
                          <p className="no-product">No product found</p>
                        )}

                        {/* <p className="loading">Loading....</p> */}
                        <List>
                          {bookList?.length > 0 &&
                            bookList.map((item, i) => {
                              return (
                                <ListItem key={i} >
                                  <div>
                                    <div>
                                      <span>{item.name}</span>
                                      <p style={{fontSize: "15px"}}>{item.description}</p>
                                    </div>
                                    <div style={{display: "flex", justifyItems: "space-between"}}>
                                      <span>
                                        {item.price}
                                      </span>
                                      <Link onClick={() => addToCart(item)}>
                                        Add to cart
                                      </Link>
                                    </div>
                                    <hr/>
                                  </div>
                                </ListItem>
                              );
                            })}
                        </List>
                      </div>
                    </>
                  )}
                </div>
                {/* <Button
                  type="submit"
                  variant="contained"
                  disableElevation
                  onClick={search}
                  style={{marginLeft: "10px", background: "green",fontSize: "12px"}}
                > */}
                {/* <em>
                    <img src={search1} style={{width: "50px", height: "50px"}} alt="search" />
                  </em> */}
                <div>
                <Button type="submit" variant="contained"
                  disableElevation
                  onClick={search} style={{ background: "green", fontSize: "12px", marginLeft: "10px" }}><i class="fa fa-search" style={{ color: "white", marginRight: "5px" }}></i>Search</Button>
                  </div>
                {/* Search */}
                {/* </Button> */}
              </div>
            </div>
          </div>
        </div>
      </AppBar>
    </div>
  );
};

export default Header;