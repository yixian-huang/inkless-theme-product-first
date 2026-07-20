/**
 * UMD entry — host loads this script and expects a register callback.
 * Built-in path uses `src/index.ts` via package import instead.
 */
import { productFirstTheme } from "./index";

declare global {
  interface Window {
    __INKLESS_THEME_REGISTER__?: (theme: typeof productFirstTheme) => void;
    __IMPRESS_THEME_REGISTER__?: (theme: typeof productFirstTheme) => void;
  }
}

const register =
  typeof window !== "undefined"
    ? window.__INKLESS_THEME_REGISTER__ ?? window.__IMPRESS_THEME_REGISTER__
    : undefined;

if (typeof register === "function") {
  register(productFirstTheme);
}

export {
  productFirstTheme,
  productFirstTokens,
  PRODUCT_FIRST_THEME_ID,
  PRODUCT_FIRST_CONTRACT_VERSION,
} from "./index";
