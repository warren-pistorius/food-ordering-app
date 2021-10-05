import { useRef, useState, useContext } from "react";
import classes from "./AddMeal.module.css";
import useHttp from "../../../hooks/use-http";
import CartContext from "../../../store/cart-context";

const AddMeal = (props) => {
  const [nameTouched, setNameTouched] = useState(false);
  const [descriptionTouched, setDescriptionTouched] = useState(false);

  const [nameInvalid, setNameInvalid] = useState(false);
  const [descriptionInvalid, setDescriptionInvalid] = useState(false);
  //   const [amountInvalid, setAmountInvalid] = useState(false);

  const { post } = useHttp();

  const cartContext = useContext(CartContext);

  const formIsInvalid =
    nameInvalid || descriptionInvalid || !nameTouched || !descriptionTouched;

  const nameRef = useRef();
  const descriptionRef = useRef();

  const submitFormHandler = async (event) => {
    event.preventDefault();

    console.log(event);

    let newMeal = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      amount: 99,
    };

    const save = await post("https://localhost:5001/api/Meals/add", newMeal);
    console.log(save);

    cartContext.refreshChoices();
  };

  const validateName = (event) => {
    setNameTouched(true);

    if (event.target.value.trim() === "") {
      setNameInvalid(true);
    } else {
      setNameInvalid(false);
    }
  };

  const validateDescription = (event) => {
    setDescriptionTouched(true);

    if (event.target.value.trim() === "") {
      setDescriptionInvalid(true);
    }

    if (event.target.value.trim().length < 5) {
      setDescriptionInvalid(true);
    } else {
      setDescriptionInvalid(false);
    }
  };

  return (
    <section className={classes.meals}>
      <h1>Add your own meal</h1>

      <form onSubmit={submitFormHandler}>
        <label className={classes["input-label"]} htmlFor="name">
          Name
        </label>
        <br />
        <input
          ref={nameRef}
          name="name"
          type="text"
          onBlur={validateName}
          onKeyUp={validateName}
        />
        {nameInvalid && (
          <p className={classes.error}>Please capture a name for the meal</p>
        )}
        <br />
        <label className={classes["input-label"]} htmlFor="description">
          Description
        </label>
        <br />
        <input
          ref={descriptionRef}
          name="description"
          type="text"
          onBlur={validateDescription}
          onKeyUp={validateDescription}
        />
        {descriptionInvalid && (
          <p className={classes.error}>
            Please capture a description greater than 4 characters
          </p>
        )}
        <br />
        <br />
        <input type="submit" value="Add meal" disabled={formIsInvalid} />
      </form>
    </section>
  );
};

export default AddMeal;
