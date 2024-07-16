import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import storeItems from "../data/items.json";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type storeItemType = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};

type ShoppingCartContextType = {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartItems: CartItem[];
  cartQuantity: number;
  openCart: () => void;
  closeCart: () => void;
  storeItemsData: storeItemType[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [storeItemsData, setStoreItemsData] = useState(storeItems);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  const getItemQuantity = (id: number) => {
    const findItem = cartItems.find((item) => item.id === id);
    return findItem?.quantity || 0;
  };

  const increaseCartQuantity = (id: number) => {
    setCartItems((currItem) => {
      if (!currItem.find((item) => item.id === id)) {
        return [...currItem, { id, quantity: 1 }];
      } else {
        return currItem.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        });
      }
    });
  };

  const decreaseCartQuantity = (id: number) => {
    setCartItems((currItem) => {
      if (currItem.find((item) => item.id === id)?.quantity === 1) {
        return currItem.filter((item) => item.id !== id);
      } else {
        return currItem.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }
          return item;
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((currItem) => currItem.filter((item) => item.id !== id));
  };

  const openCart = () => setIsOpen(true);

  const closeCart = () => setIsOpen(false);

  const cartQuantity = cartItems.reduce(
    (total, curr) => curr.quantity + total,
    0
  );

  useEffect(() => {
    setStoreItemsData(storeItems);
  }, [storeItems]);

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        storeItemsData,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
