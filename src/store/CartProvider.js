import { useReducer, React, useEffect } from "react";
import CardContext from "./cart-context";
import useHttp from "../hooks/use-http";

const defaultCartState = {
    id: null,
    items: [],
    totalAmount: 0
};

const cartReducer = async (state, action) => {
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

        /*let newSelection = {
            menuItemId: item.menuItemId,
            cartId: retrievedCartState.id,
            quantity: item.quantity,
        };

        let save = await post("https://localhost:44374/api/Selection", newSelection)
        console.log(save.data);

        retrievedCartState.items = data?.data?.selections;
        retrievedCartState.totalAmount = data?.data?.totalPrice;
        

        return {
            id: data?.data?.cartId,
            items: data?.data?.selections,
            totalAmount: data?.data?.totalPrice
        };*/
    }

    throw new Error(`Unhandled action type: ${action.type}`);
};

const CartProvider = (props) => {
    const { post, conditionalGet, get, data, isLoading } = useHttp();
    var retrievedCartState = defaultCartState;

    useEffect(() => {

        /*const getCartId = async () => {
            var needNewCart = (retrievedCartState.id == null);
            var result = await conditionalGet("https://localhost:44374/api/NewCart", needNewCart);
            console.log(result);
            if (result == null){
                console.log("same cart");
                return retrievedCartState.id;
            }else{
                console.log("new cart");
                return result.data.cartId;
            }

            var result = await get("https://localhost:44374/api/NewCart");
            console.log(result);
            console.log("new cart");
            return result.data.cartId;
        };
        
        const getCart = async (cartId) => {
            console.log("getting cart w id: " + cartId);
            var result = await get("https://localhost:44374/api/Cart/" + cartId);
            console.log(result);
        };

        getCartId().then((value) => getCart(value));*/


        const getNewCart = async () => {
            var result = await get("https://localhost:44374/api/NewCart");
            console.log(result);
            console.log("new cart");
        };

        getNewCart();

    }, [get]);

    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
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

    const clearHandler = async () => {
        //dispatchCartAction({ type: "NEW" });
        
        var result = await get("https://localhost:44374/api/NewCart");
        console.log(result);
        console.log("new cart");
        
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
