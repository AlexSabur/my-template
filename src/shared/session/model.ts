import { createEffect, createEvent, createStore, sample } from "effector";
import cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";

const JWT_TOKEN_SID = "jwtToken";

type Token = string | null;

const writeCookieFx = createEffect((value: Token) => {
  if (value) {
    cookie.set(JWT_TOKEN_SID, value);

    return;
  }

  cookie.remove(JWT_TOKEN_SID);
});

export const setJwtToken = createEvent<Token>();

export const $jwtToken = createStore<Token>(null, { sid: JWT_TOKEN_SID }).on(
  setJwtToken,
  (_, jwtToken) => jwtToken
);

export const $jwtData = sample({
  clock: $jwtToken,
  fn: (token) => {
    if (token === null) {
      return null;
    }

    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  },
});

export const $hasJwtToken = $jwtToken.map((token) => token !== null);

sample({
  clock: setJwtToken,
  target: writeCookieFx,
});
