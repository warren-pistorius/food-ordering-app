import { React, useContext, useRef } from "react";
import useHttp from "../../hooks/use-http";
import classes from "./Checkout.module.css";

import CartContext from "../../store/cart-context";

const Checkout = (props) => {
  var nameRef = useRef();
  var addressRef = useRef();

  const cartContext = useContext(CartContext);

  const confirmOrderHandler = async () => {
    var result = await post("https://localhost:5001/api/orders/add", {
      person: nameRef.current.value,
      address: addressRef.current.value,
      orderItems: cartContext.items,
    });

    if (result?.status === 201) {
      cartContext.clear();
      console.log(result);
      alert("Ordered :)");
      props.hideCart();
    }
  };
  const { post, error } = useHttp();

  return (
    <>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input ref={nameRef} type="text" id="name" />
        </div>
        <div>
          <label htmlFor="address">Address</label>

          <br />
          <input ref={addressRef} type="text" id="address" />
        </div>
        <div className={classes.actions}>
          <button onClick={props.showCart} className={classes.button}>
            Cancel
          </button>

          <button className={classes.button} onClick={confirmOrderHandler}>
            Confirm
          </button>
        </div>
        <div className={classes.error}>
          {JSON.stringify(error?.response?.data.title)}
          <br />
          {JSON.stringify(error?.response?.data.errors)}
        </div>
      </div>
    </>
  );
};

export default Checkout;
