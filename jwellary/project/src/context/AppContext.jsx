@@ .. @@
-import React, { createContext, useContext, useReducer, ReactNode } from 'react';
-import { Product, CartItem } from '../types';
+import React, { createContext, useContext, useReducer } from 'react';

-interface AppState {
-  cart: CartItem[];
-  wishlist: Product[];
-  searchQuery: string;
-  selectedCategory: string;
-}
-
-type AppAction =
-  | { type: 'ADD_TO_CART'; payload: Product }
-  | { type: 'REMOVE_FROM_CART'; payload: string }
-  | { type: 'UPDATE_CART_QUANTITY'; payload: { productId: string; quantity: number } }
-  | { type: 'CLEAR_CART' }
-  | { type: 'ADD_TO_WISHLIST'; payload: Product }
-  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
-  | { type: 'SET_SEARCH_QUERY'; payload: string }
-  | { type: 'SET_SELECTED_CATEGORY'; payload: string };
-
-const initialState: AppState = {
+const initialState = {
   cart: [],
   wishlist: [],
   searchQuery: '',
   selectedCategory: 'all',
 };

-const appReducer = (state: AppState, action: AppAction): AppState => {
+const appReducer = (state, action) => {
   switch (action.type) {
     case 'ADD_TO_CART': {
       const existingItem = state.cart.find(item => item.product.id === action.payload.id);
@@ .. @@
 };

-const AppContext = createContext<{
-  state: AppState;
-  dispatch: React.Dispatch<AppAction>;
-} | null>(null);
+const AppContext = createContext(null);

-export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
+export const AppProvider = ({ children }) => {
   const [state, dispatch] = useReducer(appReducer, initialState);

   return (