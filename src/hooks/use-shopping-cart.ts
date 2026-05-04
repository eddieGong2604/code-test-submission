"use client";

import { useContext } from "react";

import { ShoppingCartContext } from "@/context/shopping-cart-context";

export function useShoppingCart() {
  const shoppingCartContext = useContext(ShoppingCartContext);
  if (!shoppingCartContext) {
    throw new Error("useShoppingCart must be used within ShoppingCartProvider");
  }
  return shoppingCartContext;
}
