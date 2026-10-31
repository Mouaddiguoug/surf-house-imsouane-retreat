import { createSlice } from "@reduxjs/toolkit";

/**
 * The booking dialog's state.
 *
 * One dialog is mounted for the whole site (in the root layout) and every
 * "Book" button with no package in mind opens it from here, on the choice
 * of package. A button that does know its package skips the dialog and
 * links to the shop directly, so all the dialog needs to know is whether
 * it is open. Which button opened it is not state — it is a DOM element,
 * kept in `book-button.tsx` for focus return.
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
