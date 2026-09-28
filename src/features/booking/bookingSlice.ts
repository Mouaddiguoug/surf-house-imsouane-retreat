import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 * The booking dialog's state.
 *
 * One dialog is mounted for the whole site (in the root layout) and every
 * "Book" button on every page opens it from here. Which button opened it is
 * not state — it is a DOM element, kept in `book-button.tsx` for focus
 * return — but *what* it was opened for is: a button on a package page knows
 * which week it is selling and opens the dialog on that package's rate
 * plans, while the one in the navbar does not and opens on the choice of
 * package. `slug` carries that distinction.
 */
export interface BookingState {
  dialogOpen: boolean;
  /** The package the dialog opened for, or null to ask which one. */
  slug: string | null;
}

const initialState: BookingState = {
  dialogOpen: false,
  slug: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    bookingDialogOpened(
      state,
      action: PayloadAction<string | null | undefined>,
    ) {
      state.dialogOpen = true;
      state.slug = action.payload ?? null;
    },
    /** Stepping back from a package's rate plans to the choice of package. */
    bookingPackageCleared(state) {
      state.slug = null;
    },
    bookingPackageChosen(state, action: PayloadAction<string>) {
      state.slug = action.payload;
    },
    bookingDialogClosed(state) {
      state.dialogOpen = false;
    },
  },
});

export const {
  bookingDialogOpened,
  bookingDialogClosed,
  bookingPackageChosen,
  bookingPackageCleared,
} = bookingSlice.actions;
export default bookingSlice.reducer;
