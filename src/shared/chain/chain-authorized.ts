import {
  RouteInstance,
  RouteParams,
  RouteParamsAndQuery,
  chainRoute,
} from "atomic-router";
import { Effect, EventCallable, createEvent, sample } from "effector";

interface ChainParams<Params extends RouteParams> {
  otherwise?: EventCallable<void> | Effect<void, any, any>;
}

export default function chainAuthorized<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams<Params> = {}
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const sessionReceivedAnonymous = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated,
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionRequestFx,
  });

  sample({
    clock: [alreadyAnonymous, sessionRequestFx.fail],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: sessionReceivedAnonymous,
  });

  if (otherwise) {
    sample({
      clock: sessionReceivedAnonymous,
      target: otherwise as EventCallable<void>,
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAuthenticated, sessionRequestFx.done],
    cancelOn: sessionReceivedAnonymous,
  });
}
