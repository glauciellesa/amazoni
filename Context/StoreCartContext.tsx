import { ReactNode, createContext, useReducer } from "react";

type StoreCartProviderProps = {
  children: ReactNode;
};

export const Store = createContext([]);

const initialState = { cart: { cartItems: [] } };

const reducer = (
  state: { cart: { cartItems: any[] } },
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
};

export function StoreCartProvider({ children }: StoreCartProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
