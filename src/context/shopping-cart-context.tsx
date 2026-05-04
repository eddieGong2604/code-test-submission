"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";

import { MAX_SHOPPING_CART_LINE_QUANTITY } from "@/constants/limits";
import { SHOPPING_CART_LOCAL_STORAGE_KEY } from "@/constants/storage-keys";
import type { Book } from "@/lib/books";
import {
  addBookToShoppingCartLines,
  computeShoppingCartGrandTotal,
  computeShoppingCartTotalItemCount,
  removeShoppingCartLineByBookId,
  setShoppingCartLineQuantity,
  type ShoppingCartLineModel,
} from "@/lib/shopping-cart-helpers";

type ShoppingCartState = {
  shoppingCartLines: ShoppingCartLineModel[];
  hasHydratedFromStorage: boolean;
};

type ShoppingCartAction =
  | { type: "HYDRATE"; shoppingCartLines: ShoppingCartLineModel[] }
  | { type: "ADD_BOOK"; book: Book }
  | { type: "REMOVE_LINE"; bookId: number }
  | { type: "CHANGE_QUANTITY"; bookId: number; nextQuantity: number };

function shoppingCartReducer(
  state: ShoppingCartState,
  action: ShoppingCartAction,
): ShoppingCartState {
  switch (action.type) {
    case "HYDRATE":
      return { shoppingCartLines: action.shoppingCartLines, hasHydratedFromStorage: true };
    case "ADD_BOOK":
      return {
        ...state,
        shoppingCartLines: addBookToShoppingCartLines(state.shoppingCartLines, action.book),
      };
    case "REMOVE_LINE":
      return {
        ...state,
        shoppingCartLines: removeShoppingCartLineByBookId(
          state.shoppingCartLines,
          action.bookId,
        ),
      };
    case "CHANGE_QUANTITY":
      return {
        ...state,
        shoppingCartLines: setShoppingCartLineQuantity(
          state.shoppingCartLines,
          action.bookId,
          action.nextQuantity,
        ),
      };
    default:
      return state;
  }
}

const initialShoppingCartState: ShoppingCartState = {
  shoppingCartLines: [],
  hasHydratedFromStorage: false,
};

type ShoppingCartContextValue = {
  shoppingCartLines: ShoppingCartLineModel[];
  shoppingCartGrandTotal: number;
  shoppingCartItemCount: number;
  addBookToShoppingCart: (book: Book) => void;
  removeShoppingCartLine: (bookId: number) => void;
  changeShoppingCartLineQuantity: (bookId: number, nextQuantity: number) => void;
};

export const ShoppingCartContext = createContext<ShoppingCartContextValue | null>(null);

function readShoppingCartFromStorage(): ShoppingCartLineModel[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(SHOPPING_CART_LOCAL_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as ShoppingCartLineModel[];
    if (!Array.isArray(parsed)) {
      return [];
    }
    return parsed
      .filter(
        (line) =>
          line &&
          typeof line.quantity === "number" &&
          line.book &&
          typeof line.book.id === "number",
      )
      .map((line) => ({
        ...line,
        quantity: Math.min(
          Math.max(line.quantity, 1),
          MAX_SHOPPING_CART_LINE_QUANTITY,
        ),
      }));
  } catch {
    return [];
  }
}

function writeShoppingCartToStorage(shoppingCartLines: ShoppingCartLineModel[]): void {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(
    SHOPPING_CART_LOCAL_STORAGE_KEY,
    JSON.stringify(shoppingCartLines),
  );
}

export function ShoppingCartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(shoppingCartReducer, initialShoppingCartState);

  useEffect(() => {
    const storedLines = readShoppingCartFromStorage();
    dispatch({ type: "HYDRATE", shoppingCartLines: storedLines });
  }, []);

  useEffect(() => {
    if (!state.hasHydratedFromStorage) {
      return;
    }
    writeShoppingCartToStorage(state.shoppingCartLines);
  }, [state.hasHydratedFromStorage, state.shoppingCartLines]);

  const addBookToShoppingCart = useCallback((book: Book) => {
    dispatch({ type: "ADD_BOOK", book });
  }, []);

  const removeShoppingCartLine = useCallback((bookId: number) => {
    dispatch({ type: "REMOVE_LINE", bookId });
  }, []);

  const changeShoppingCartLineQuantity = useCallback(
    (bookId: number, nextQuantity: number) => {
      dispatch({ type: "CHANGE_QUANTITY", bookId, nextQuantity });
    },
    [],
  );

  const shoppingCartGrandTotal = useMemo(
    () => computeShoppingCartGrandTotal(state.shoppingCartLines),
    [state.shoppingCartLines],
  );

  const shoppingCartItemCount = useMemo(
    () => computeShoppingCartTotalItemCount(state.shoppingCartLines),
    [state.shoppingCartLines],
  );

  const value = useMemo<ShoppingCartContextValue>(
    () => ({
      shoppingCartLines: state.shoppingCartLines,
      shoppingCartGrandTotal,
      shoppingCartItemCount,
      addBookToShoppingCart,
      removeShoppingCartLine,
      changeShoppingCartLineQuantity,
    }),
    [
      state.shoppingCartLines,
      shoppingCartGrandTotal,
      shoppingCartItemCount,
      addBookToShoppingCart,
      removeShoppingCartLine,
      changeShoppingCartLineQuantity,
    ],
  );

  return (
    <ShoppingCartContext.Provider value={value}>{children}</ShoppingCartContext.Provider>
  );
}
