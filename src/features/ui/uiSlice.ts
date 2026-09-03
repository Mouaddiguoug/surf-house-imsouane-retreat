import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 * Chrome-level UI state that outlives a single component — the pieces a
 * header, a drawer and a page all need to agree on.
 *
 * Anything that belongs to one domain (a booking in progress, an enquiry
 * form) gets its own slice under `src/features/<domain>` instead.
 */
export interface UiState {
  mobileNavOpen: boolean;
}

const initialState: UiState = {
  mobileNavOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    mobileNavToggled(state) {
      state.mobileNavOpen = !state.mobileNavOpen;
    },
    mobileNavSet(state, action: PayloadAction<boolean>) {
      state.mobileNavOpen = action.payload;
    },
  },
});

export const { mobileNavToggled, mobileNavSet } = uiSlice.actions;
export default uiSlice.reducer;
