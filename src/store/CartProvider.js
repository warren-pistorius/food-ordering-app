import { useReducer } from "react";
import CardContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  let updatedItems = [];
  let updatedTotal = 0;

  if (action.type === "ADD" || action.type === "REMOVE") {
    let itemIndex = state.items.findIndex((f) => f.id === action.item.id);

    if (itemIndex > -1) {
      console.log(`existing item found at: ${itemIndex}`);
      updatedItems = [...state.items];
      let itemToUpdate = updatedItems[itemIndex];

      if (action.item.amount === 0){
        updatedItems = updatedItems.filter(f => f.id !== action.item.id);
      }
      else{
        itemToUpdate.amount = action.item.amount;
      }
      
      
    } else {
      updatedItems = state.items.concat(action.item);
    }

    updatedItems.forEach((item) => {
      updatedTotal += item.price * item.amount;
    });

    return {
      items: updatedItems,
      totalAmount: updatedTotal,
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

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CardContext.Provider value={cartContext}>
      {props.children}
    </CardContext.Provider>
  );
};

export default CartProvider;
