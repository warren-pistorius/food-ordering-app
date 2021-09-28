import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

import CartContext from "../../store/cart-context";
import { useContext } from "react";

const HeaderCartButton = (props) => {
  
  var cardContext = useContext(CartContext);
  
  return (
    <button className={classes.button} onClick={props.showCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>{cardContext.items.reduce((curNum, item) => {
        return curNum + item.amount;
      }, 0)}</span>
    </button>
  );
};

export default HeaderCartButton;
