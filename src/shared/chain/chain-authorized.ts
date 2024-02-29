import {
  RouteInstance,
  RouteParams,
  RouteParamsAndQuery,
  chainRoute,
} from "atomic-router";
import { Effect, EventCallable, createEvent, sample } from "effector";
import { $hasJwtToken } from "shared/session";

interface ChainParams<Params extends RouteParams> {
  otherwise?:
    | EventCallable<RouteParamsAndQuery<Params>>
    | Effect<RouteParamsAndQuery<Params>, any, any>;
}

export default function chainAuthorized<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams<Params> = {}
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const sessionReceivedAnonymous = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $hasJwtToken,
    filter: (hasJwtToken) => hasJwtToken,
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $hasJwtToken,
    filter: (hasJwtToken) => hasJwtToken === false,
  });

  sample({
    clock: alreadyAnonymous,
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: sessionReceivedAnonymous,
  });

  if (otherwise) {
    sample({
      clock: sessionReceivedAnonymous,
      target: otherwise as EventCallable<RouteParamsAndQuery<Params>>,
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: alreadyAuthenticated,
    cancelOn: sessionReceivedAnonymous,
  });
}
