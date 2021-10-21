import { useReducer, React, useEffect } from "react";
import CardContext from "./cart-context";
import useHttp from "../hooks/use-http";

const defaultCartState = {
    id: null,
    items: [],
    totalAmount: 0,
    choices: 0,
    url: null,
    postObject: null
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
    const { post, get, data, isLoading } = useHttp();
    var retrievedCartState = defaultCartState;

    useEffect(() => {

        const getCart = async () => {
            var result = await get("https://localhost:44374/api/Cart/4");
            console.log(result);
        };

        getCart();
    }, [get]);

    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        retrievedCartState
    );

    const addItemHandler = async (item) => {
        //dispatchCartAction({ type: "ADD", item: item });

        let newSelection = {
            menuItemId: item.menuItemId,
            cartId: retrievedCartState.id,
            quantity: item.quantity,
        };

        let save = await post("https://localhost:44374/api/Selection", newSelection)
        console.log(save.data);

    };

    const removeItemHandler = async (item) => {
        //dispatchCartAction({ type: "REMOVE", item: item });
        let newSelection = {
            menuItemId: item.menuItemId,
            cartId: retrievedCartState.id,
            quantity: item.quantity,
        };

        let save = await post("https://localhost:44374/api/Selection", newSelection)
        console.log(save.data);
    };

    const refreshChoicesHandler = () => {
        dispatchCartAction({ type: "REFRESH", choices: Date.now() });
    };

    const clearHandler = () => {
        dispatchCartAction({ type: "NEW" });
    };

    // update cart state is data is not null
    retrievedCartState.id = data?.data?.cartId;
    retrievedCartState.items = data?.data?.selections;
    retrievedCartState.totalAmount = data?.data?.totalPrice;

    const cartContext = {
        id: retrievedCartState.id,
        items: retrievedCartState.items,
        totalAmount: retrievedCartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        refreshChoices: refreshChoicesHandler,
        choices: retrievedCartState.choices,
        clear: clearHandler
    };

    return (
        <CardContext.Provider value={cartContext}>
            {props.children}
        </CardContext.Provider>
    );
};

export default CartProvider;
