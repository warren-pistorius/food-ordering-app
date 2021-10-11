import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState } from "react";

const MealItemForm = (props) => {
  
  const [quantityIsValid, setQuantityIsValid] = useState(true);
  
  const quantityInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredQuantity = quantityInputRef.current.value;
    if (enteredQuantity.trim().length === 0 || +enteredQuantity < 1 || +enteredQuantity > 5){
      setQuantityIsValid(false);
      return;
    }

    props.onAddToCart(+enteredQuantity);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={quantityInputRef}
        label="Quantity"
        input={{
          id: props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>Set</button>
      {!quantityIsValid && <p>Please enter a valid quantity (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
