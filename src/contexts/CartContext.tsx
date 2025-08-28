import { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Cart, Brand, CatalogItem } from '../types/catalog';

interface CartState {
  cart: Cart;
}

type CartAction =
  | { type: 'ADD_TO_CART'; payload: { brand: Brand; catalogItem: CatalogItem; amount: number; recipient?: { name: string; email: string }; message?: string } }
  | { type: 'REMOVE_FROM_CART'; payload: { id: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'UPDATE_CART_ITEM'; payload: { id: string; updates: Partial<CartItem> } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  cart: {
    items: [],
    totalAmount: 0,
    totalItems: 0,
  },
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { brand, catalogItem, amount, recipient, message } = action.payload;
      const newItem: CartItem = {
        id: `${brand.brandKey}-${catalogItem.utid}-${Date.now()}`,
        brand,
        catalogItem,
        amount,
        recipient,
        message,
        quantity: 1,
      };

      const newItems = [...state.cart.items, newItem];
      const totalAmount = newItems.reduce((sum, item) => sum + (item.amount * item.quantity), 0);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        cart: {
          items: newItems,
          totalAmount,
          totalItems,
        },
      };
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.cart.items.filter(item => item.id !== action.payload.id);
      const totalAmount = newItems.reduce((sum, item) => sum + (item.amount * item.quantity), 0);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        cart: {
          items: newItems,
          totalAmount,
          totalItems,
        },
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      const newItems = state.cart.items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item
      ).filter(item => item.quantity > 0);

      const totalAmount = newItems.reduce((sum, item) => sum + (item.amount * item.quantity), 0);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        cart: {
          items: newItems,
          totalAmount,
          totalItems,
        },
      };
    }

    case 'UPDATE_CART_ITEM': {
      const { id, updates } = action.payload;
      const newItems = state.cart.items.map(item =>
        item.id === id ? { ...item, ...updates } : item
      );

      const totalAmount = newItems.reduce((sum, item) => sum + (item.amount * item.quantity), 0);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        cart: {
          items: newItems,
          totalAmount,
          totalItems,
        },
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        cart: {
          items: [],
          totalAmount: 0,
          totalItems: 0,
        },
      };

    default:
      return state;
  }
}

interface CartContextType {
  cart: Cart;
  addToCart: (brand: Brand, catalogItem: CatalogItem, amount: number, recipient?: { name: string; email: string }, message?: string) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateCartItem: (id: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (brand: Brand, catalogItem: CatalogItem, amount: number, recipient?: { name: string; email: string }, message?: string) => {
    dispatch({ type: 'ADD_TO_CART', payload: { brand, catalogItem, amount, recipient, message } });
  };

  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id } });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const updateCartItem = (id: string, updates: Partial<CartItem>) => {
    dispatch({ type: 'UPDATE_CART_ITEM', payload: { id, updates } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{
      cart: state.cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateCartItem,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
