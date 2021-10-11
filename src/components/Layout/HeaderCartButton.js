import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

import CartContext from "../../store/cart-context";
import { useContext, useEffect, useState } from "react";

const HeaderCartButton = (props) => {
  var cardContext = useContext(CartContext);
  const [btnIsHighlighted, setButtonIsHighlighted] = useState(false);

  const btnClasses = `${classes.button} ${
    btnIsHighlighted ? classes.bump : ""
  }`;

  useEffect(() => {
    if (cardContext.items.length === 0) return;

    setButtonIsHighlighted(true);

    const timer = setTimeout(() => {
      setButtonIsHighlighted(false);
    }, 300);

    //Cleanup
    return () => {
      clearTimeout(timer);
    }
  }, [cardContext.items]);

  return (
    <button className={btnClasses} onClick={props.showCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your cart</span>
      <span className={classes.badge}>
        {cardContext.items.reduce((curNum, item) => {
          return curNum + item.quantity;
        }, 0)}
      </span>
    </button>
  );
};

export default HeaderCartButton;
