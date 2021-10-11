import classes from "./Checkout.module.css";

const Checkout = (props) => {
  return (
    <>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <br />
          <input type="text" id="name" />
        </div>
        <div>
          <label htmlFor="address">Address</label>

          <br />
          <input type="text" id="address" />
        </div>
        <div className={classes.actions}>
          <button onClick={props.showCart} className={classes.button}>
            Cancel
          </button>

          <button className={classes.button}>Confirm</button>
        </div>
      </div>
    </>
  );
};

export default Checkout;
