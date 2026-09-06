import { createSlice } from "@reduxjs/toolkit";

/**
 * The booking dialog's open state.
 *
 * One dialog is mounted for the whole site (in the root layout) and every
 * "Book" button on every page opens it from here, so the Cloudbeds engine is
 * loaded once and a reader who opens it from the navbar on `/house` gets the
 * same panel as one who opens it from a package. Which button opened it is
 * not state — it is a DOM element, kept in `book-button.tsx` for focus
 * return — so only the boolean lives in the store.
 */
export interface BookingState {
  dialogOpen: boolean;
}

const initialState: BookingState = {
  dialogOpen: false,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    bookingDialogOpened(state) {
      state.dialogOpen = true;
    },
    bookingDialogClosed(state) {
      state.dialogOpen = false;
    },
  },
});

export const { bookingDialogOpened, bookingDialogClosed } =
  bookingSlice.actions;
export default bookingSlice.reducer;
