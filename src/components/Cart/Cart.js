import { React, useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
    const [showOrder, setShowOrder] = useState(true);

    var cartContext = useContext(CartContext);

    const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;
    const hasItems = cartContext.items.length > 0;

    const cartItemRemoveHandler = (item) => {
        cartContext.removeItem({ ...item, quantity: (item.quantity -= 1) });
    };

    const cartItemAddHandler = (item) => {
        cartContext.addItem({ ...item, quantity: (item.quantity += 1) });
    };

    const orderHandler = () => {
        setShowOrder(() => !showOrder);
    };

    const showCartHandler = () => {
        setShowOrder(true);
    };

    const hideCartHandler = () => {
        setShowOrder(false);
        props.showCart();
    }

    const cartItems = (
        <ul className={classes["cart-items"]}>
            {cartContext.items.map((item) => (
                <CartItem
                    key={item.menuItemId}
                    name={item.menuItem.name}
                    quantity={item.quantity}
                    price={item.menuItem.price}
                    onRemove={cartItemRemoveHandler.bind(null, item)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    return (
        <>
            <Modal showCart={props.showCart}>
                <div style={{ display: showOrder ? "" : "none" }}>
                    {cartItems}
                    <div className={classes.total}>
                        <span>Total Amount</span>
                        <span>{totalAmount}</span>
                    </div>
                    <div className={classes.actions}>
                        <button className={classes["button--alt"]} onClick={props.showCart}>
                            Close
                        </button>
                        {hasItems && (
                            <button className={classes.button} onClick={orderHandler}>
                                Order
                            </button>
                        )}
                    </div>
                </div>

                {!showOrder && <Checkout showCart={showCartHandler} hideCart={hideCartHandler} />}
            </Modal>
        </>
    );
};

export default Cart;
