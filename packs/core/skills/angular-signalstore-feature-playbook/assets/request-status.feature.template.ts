/*
  Template: reusable request status SignalStore feature

  How to use:
  1) Copy into a shared store-features folder (repo convention).
  2) Export `withRequestStatus` + patch helpers.
  3) In stores: add `withRequestStatus()` and use `patchState(store, setPending())` etc.

  This avoids ad-hoc `isLoading/isSaving` flags and keeps status semantics consistent.
*/

import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';

export type RequestStatus = 'idle' | 'pending' | 'fulfilled' | { error: string };
export type RequestStatusState = { requestStatus: RequestStatus };

export function withRequestStatus() {
  return signalStoreFeature(
    withState<RequestStatusState>({ requestStatus: 'idle' }),
    withComputed(({ requestStatus }) => ({
      isPending: () => requestStatus() === 'pending',
      isFulfilled: () => requestStatus() === 'fulfilled',
      error: () => {
        const status = requestStatus();
        return typeof status === 'object' ? status.error : null;
      },
    })),
  );
}

export function setPending(): RequestStatusState {
  return { requestStatus: 'pending' };
}

export function setFulfilled(): RequestStatusState {
  return { requestStatus: 'fulfilled' };
}

export function setError(error: string): RequestStatusState {
  return { requestStatus: { error } };
}
