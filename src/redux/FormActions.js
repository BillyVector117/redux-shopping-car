// constant
const initialData = {
  isOpen: false,
};
// Actions
const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

// Reducers
export default function shopReducer(state = initialData, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, isOpen: action.payload };
    case CLOSE_MODAL:
      return { ...state, isOpen: action.payload };
    default:
      return state;
  }
}

// Actions open modal
export const openModal = (isOpen) => async (dispatch, getState) => {
  dispatch({
    type: OPEN_MODAL,
    payload: isOpen,
  });
};
// Actions close modal
export const closeModal = (isOpen) => async (dispatch, getState) => {
  dispatch({
    type: CLOSE_MODAL,
    payload: isOpen,
  });
};
