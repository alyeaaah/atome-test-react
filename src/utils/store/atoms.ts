import Cookies from "js-cookie";
import { atomWithStorage, createJSONStorage } from "jotai/utils";
import { clientEnv } from "@/env";
import { atom } from "jotai";
import { userData } from "@/pages/Login/api/schema";
import { CategoryTagData } from "@/pages/Admin/Pet/api/schema";

// Cookie storage that handles string|null
const cookieStorage = {
  getItem: (key: string): string | null => {
    return Cookies.get(key) ?? null;
  },
  setItem: (key: string, newValue: string | null): void => {
    if (newValue === null) {
      Cookies.remove(key); // remove if null
    } else {
      Cookies.set(key, newValue, { expires: 7 });
    }
  },
  removeItem: (key: string): void => {
    Cookies.remove(key);
  },
};

export const unauthorizedErrorMessageAtom = atom<string | null>(null);
unauthorizedErrorMessageAtom.debugLabel = "unauthorizedErrorMessageAtom";

export const UNSAFE_DO_NOT_USE_isLoadingAtom = atom(false);
UNSAFE_DO_NOT_USE_isLoadingAtom.debugLabel = "UNSAFE_DO_NOT_USE_isLoadingAtom";

const USER_COOKIE_NAME = "userInfo";
const CATEGORIES_COOKIE_NAME = "categories";
const TAGS_COOKIE_NAME = "tags";

// Token Atom (string | null)
export const accessTokenAtom = atomWithStorage<string | null>(
  clientEnv.AUTH_COOKIE_NAME,
  null,
  cookieStorage,
  { getOnInit: true },
);
accessTokenAtom.debugLabel = "accessTokenAtom";

// User Atom (User | null) via JSON wrapper
export const userAtom = atomWithStorage<userData | null>(
  USER_COOKIE_NAME,
  null,
  createJSONStorage(() => cookieStorage),
  { getOnInit: true },
);
userAtom.debugLabel = "userAtom";

export const categoriesAtom = atomWithStorage<CategoryTagData[] | null>(
  CATEGORIES_COOKIE_NAME,
  null,
  createJSONStorage(() => cookieStorage),
  { getOnInit: true },
);

export const tagsAtom = atomWithStorage<CategoryTagData[] | null>(
  TAGS_COOKIE_NAME,
  null,
  createJSONStorage(() => cookieStorage),
  { getOnInit: true },
);




