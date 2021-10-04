import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";

import CartProvider from "./store/CartProvider";

function App() {
  const [cartVisible, setCartVisible] = useState(false);

  

  const showCartHandler = () => {
    console.log("show cart...");

    setCartVisible(!cartVisible);
  };

  return (
    <CartProvider>
      {cartVisible && <Cart showCart={showCartHandler} />}
      <Header showCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
