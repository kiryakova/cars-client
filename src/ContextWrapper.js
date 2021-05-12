import { useState, createContext } from 'react';

export const PageContext = createContext({
  currentHeaderItem: 1,
  setCurrentHeaderItem: () => {}
});

export const CartContext = createContext({
  cartItems: {},
  setCartItems: () => {}
});

const ContextWrapper = (props) => {
  
  const [currentHeaderItem, setCurrentHeaderItem] = useState(1);
  const [cartItems, setCartItems] = useState({});

  return (
    <PageContext.Provider value={[
      currentHeaderItem,
      setCurrentHeaderItem
    ]}>
    <CartContext.Provider value={[
      cartItems,
      setCartItems
    ]}>
      {props.children}
    </CartContext.Provider>
    </PageContext.Provider>
  );
}

export default ContextWrapper;