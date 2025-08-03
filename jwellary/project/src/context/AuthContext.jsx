@@ .. @@
-import React, { createContext, useContext, useReducer, ReactNode } from 'react';
-import { User, AuthState } from '../types';
+import React, { createContext, useContext, useReducer } from 'react';

-type AuthAction =
-  | { type: 'LOGIN_START' }
-  | { type: 'LOGIN_SUCCESS'; payload: User }
-  | { type: 'LOGIN_FAILURE' }
-  | { type: 'LOGOUT' }
-  | { type: 'REGISTER_START' }
-  | { type: 'REGISTER_SUCCESS'; payload: User }
-  | { type: 'REGISTER_FAILURE' };
-
-const initialState: AuthState = {
+const initialState = {
   user: null,
   isAuthenticated: false,
   isLoading: false,
 };

-const authReducer = (state: AuthState, action: AuthAction): AuthState => {
+const authReducer = (state, action) => {
   switch (action.type) {
     case 'LOGIN_START':
     case 'REGISTER_START':
@@ .. @@
 };

-const AuthContext = createContext<{
-  state: AuthState;
-  dispatch: React.Dispatch<AuthAction>;
-  login: (email: string, password: string) => Promise<void>;
-  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
-  logout: () => void;
-} | null>(null);
+const AuthContext = createContext(null);

-export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
+export const AuthProvider = ({ children }) => {
   const [state, dispatch] = useReducer(authReducer, initialState);

-  const login = async (email: string, password: string) => {
+  const login = async (email, password) => {
     dispatch({ type: 'LOGIN_START' });
     
     try {
       // Simulate API call
       await new Promise(resolve => setTimeout(resolve, 1000));
       
       // Mock user data
-      const user: User = {
+      const user = {
         id: '1',
         email,
         firstName: 'John',
@@ .. @@
   };

-  const register = async (email: string, password: string, firstName: string, lastName: string) => {
+  const register = async (email, password, firstName, lastName) => {
     dispatch({ type: 'REGISTER_START' });
     
     try:
       // Simulate API call
       await new Promise(resolve => setTimeout(resolve, 1000));
       
-      const user: User = {
+      const user = {
         id: Date.now().toString(),
         email,
         firstName,