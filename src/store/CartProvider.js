import { useReducer } from "react";
import CardContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
  choices: 0
};

const cartReducer = (state, action) => {
  let updatedItems = [];
  let updatedTotal = 0;
  let choices = 0;

  if (action.type === "NEW") {
    //do nothing
  }
  
  else if (action.type === "REFRESH") {
    choices = action.choices;

    return {
      items: [],
      totalAmount: state.totalAmount,
      choices
    };
  }

  else if (action.type === "ADD" || action.type === "REMOVE") {
    let itemIndex = state.items.findIndex((f) => f.id === action.item.id);

    if (itemIndex > -1) {
      console.log(`existing item found at: ${itemIndex}`);
      updatedItems = [...state.items];
      let itemToUpdate = updatedItems[itemIndex];

      if (action.item.quantity === 0) {
        updatedItems = updatedItems.filter((f) => f.id !== action.item.id);
      } else {
        itemToUpdate.quantity = action.item.quantity;
      }
    } else {
      updatedItems = state.items.concat(action.item);
    }

    updatedItems.forEach((item) => {
      updatedTotal += item.price * item.quantity;
    });

    return {
      items: updatedItems,
      totalAmount: updatedTotal,
      choices
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemHandler = (item) => {
    dispatchCartAction({ type: "REMOVE", item: item });
  };

  const refreshChoicesHandler = () => {
    dispatchCartAction({ type: "REFRESH", choices: Date.now() });
  };

  const clearHandler = () => {
    dispatchCartAction({ type: "NEW" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    refreshChoices: refreshChoicesHandler,
    choices: cartState.choices,
    clear: clearHandler
  };

  return (
    <CardContext.Provider value={cartContext}>
      {props.children}
    </CardContext.Provider>
  );
};

export default CartProvider;
