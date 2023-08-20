import React, { useEffect, useState } from "react";
// import { cartStyle } from "./style";
import { Typography, Button, Link } from "@mui/material";
import cartService from "../../service/cart.service";
import { useAuthContext } from "../../context/auth";
import { toast } from "react-toastify";
import orderService from "../../service/order.service";
import Shared from "../../utils/shared";
import { useCartContext } from "../../context/cart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const authContext = useAuthContext();
  const cartContext = useCartContext();
  const navigate = useNavigate();

  const [cartList, setCartList] = useState([]);
  const [itemsInCart, setItemsInCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // const classes = cartStyle();

  const getTotalPrice = (itemList) => {
    let totalPrice = 0;
    itemList.forEach((item) => {
      const itemPrice = item.quantity * parseInt(item.book.price);
      totalPrice = totalPrice + itemPrice;
    });
    setTotalPrice(totalPrice);
  };

  useEffect(() => {
    setCartList(cartContext.cartData);
    setItemsInCart(cartContext.cartData.length);
    getTotalPrice(cartContext.cartData);
  }, [cartContext.cartData]);

  const removeItem = async (id) => {
    try {
      const res = await cartService.removeItem(id);
      if (res) {
        cartContext.updateCart();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const updateQuantity = async (cartItem, inc) => {
    const currentCount = cartItem.quantity;
    const quantity = inc ? currentCount + 1 : currentCount - 1;
    if (quantity === 0) {
      toast.error("Item quantity should not be zero");
      return;
    }

    try {
      const res = await cartService.updateItem({
        id: cartItem.id,
        userId: cartItem.userId,
        bookId: cartItem.book.id,
        quantity,
      });
      if (res) {
        const updatedCartList = cartList.map((item) =>
          item.id === cartItem.id ? { ...item, quantity } : item
        );
        cartContext.updateCart(updatedCartList);
        const updatedPrice =
          totalPrice +
          (inc
            ? parseInt(cartItem.book.price)
            : -parseInt(cartItem.book.price));
        setTotalPrice(updatedPrice);
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const placeOrder = async () => {
    if (authContext.user.id) {
      const userCart = await cartService.getList(authContext.user.id);
      if (userCart.length) {
        try {
          let cartIds = userCart.map((element) => element.id);
          const newOrder = {
            userId: authContext.user.id,
            cartIds,
          };
          const res = await orderService.placeOrder(newOrder);
          if (res) {
            cartContext.updateCart();
            navigate("/");
            toast.success(Shared.messages.ORDER_SUCCESS);
          }
        } catch (error) {
          toast.error(`Order cannot be placed ${error}`);
        }
      } else {
        toast.error("Your cart is empty");
      }
    }
  };

  return (
    <div style={{ display: "flex", justifyItems: "center", alignItems: "center" }}>
      <div className="container">
        <Typography variant="h4" style={{ marginTop: "50px", marginBottom: "50px", color: "#f44403" }}>Cart page</Typography>
        <div className="cart-heading-block" style={{ marginBottom: "20px" }}>
          <Typography variant="h7">
            My Shopping Bag ({itemsInCart} Items)
          </Typography>
          <div className="total-price" style={{
            display: "table-cell",
            border: "1px solid #f44403",
            /* margin-top: -37px; */
            background: "#f44403",
            color: "white",
            borderRadius: "5px",
            padding: "5px"
          }}>Total price: {totalPrice}</div>
        </div>
        <div className="cart-list-wrapper">
          {cartList.map((cartItem) => {
            return (
              <div className="cart-list-item" key={cartItem.id} style={{ display: "flex", marginBottom: "10px" }}>
                <div className="cart-item-img">
                  <Link>
                    <img style={{ width: "250px", height: "200px" }} src={cartItem.book.base64image} alt="dummy-pic" />
                  </Link>
                </div>
                <div style={{ width: "200px", height: "200px", padding: "0" }}>
                  <div style={{ marginLeft: "10px" }}>
                    <div>
                      <p>{cartItem.book.name}</p>
                      {/* <Link>Cart item name</Link> */}
                    </div>
                    <div className="price-block">
                      <span className="current-price">
                        MRP &#8377; {cartItem.book.price}
                      </span>
                    </div>
                  </div>
                  <div className="cart-item-bottom-content">
                    <div className="qty-group" style={{ display: "flex", alignItems: "center" }}>
                      <Button
                        // className="btn pink-btn"
                        onClick={() => updateQuantity(cartItem, true)}
                      >
                        +
                      </Button>
                      <span className="number-count">{cartItem.quantity}</span>
                      <Button
                        // className="btn pink-btn"
                        onClick={() => updateQuantity(cartItem, false)}
                      >
                        -
                      </Button>
                    </div>
                    <button style={{ cursor: "pointer", border: "1px solid #f44403", marginLeft: "10px", padding: "5px", justifyContent: "center" }}><Link style={{ textDecoration: "none", color: "#f44403" }} onClick={() => removeItem(cartItem.id)}>Remove</Link></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <Button style={{ background: "green", color: "white" }} onClick={placeOrder}>
            Place order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
