/*
  Template: SignalStore + request status + rxMethod async flows

  How to use:
  1) Copy this file into your feature as `<feature>.store.ts` (repo convention).
  2) Replace placeholders:
     - <Feature> (PascalCase), <feature> (kebab/camel as used), <State>
     - endpoints, request/response types, state mapping logic
  3) Ensure request-status feature imports resolve (see request-status.feature.template.ts).

  Notes:
  - Reads: use switchMap (cancel/replace)
  - Writes: use exhaustMap (ignore triggers while pending)
*/

import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, tap, switchMap, exhaustMap } from 'rxjs';

// Replace the path to match your repo.
import {
  withRequestStatus,
  setPending,
  setFulfilled,
  setError,
} from '<PATH_TO_SHARED>/request-status.feature';

// 1) State
export type <Feature>State = {
  // Example:
  // ids: string[];
  // entities: Record<string, <Entity>>;
};

// 2) Store
export const <Feature>Store = signalStore(
  // Scope: adjust if feature-scoped (repo convention)
  { providedIn: 'root' },

  withState<<Feature>State>({
    // initial state
    // ids: [],
    // entities: {},
  }),

  withRequestStatus(),

  withComputed((state) => ({
    // Example selectors:
    // count: () => state.ids().length,
    // vm: () => ({ count: state.ids().length, isPending: state.isPending() }),
  })),

  withMethods((store) => {
    const http = inject(HttpClient);

    // Replace with your real base URL/token injection.
    const baseUrl = '/api/<feature>';

    return {
      // READ: cancel/replace on re-trigger
      load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending())),
          switchMap(() =>
            http.get<any[]>(baseUrl).pipe(
              tapResponse({
                next: (data) => {
                  patchState(
                    store,
                    // Map response -> state
                    // (s) => ({ ...s, ids: data.map(x => x.id) }),
                    setFulfilled(),
                  );
                },
                error: (err: any) => patchState(store, setError(err?.message ?? 'Load failed')),
              }),
            ),
          ),
        ),
      ),

      // WRITE: ignore triggers while in-flight
      write: rxMethod<{ payload: any }>(
        pipe(
          exhaustMap(({ payload }) => {
            patchState(store, setPending());

            return http.post(baseUrl, payload).pipe(
              tapResponse({
                next: () => {
                  // Optional: reconcile state after write
                  patchState(store, setFulfilled());
                },
                error: (err: any) => {
                  // Optional: rollback optimistic update here
                  patchState(store, setError(err?.message ?? 'Write failed'));
                },
              }),
            );
          }),
        ),
      ),
    };
  }),

  // Optional: auto-hydration
  withHooks({
    onInit(store) {
      // Only keep this if the feature should load on first injection.
      store.load();
    },
  }),
);
