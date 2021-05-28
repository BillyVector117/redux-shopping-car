// Dependencies
import React, { useEffect } from "react";
// Elements
import Form from "./Form";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { openModal, closeModal } from "../redux/FormActions";
// Styles
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function ModalTemplate() {
  const classes = useStyles();
  // Global state (Redux)
  const isOpenModal = useSelector((store) => store.openModal.isOpen); // Boolean variable (Default false)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(openModal(true));
  }, [dispatch]);
  const handleClose = () => {
    dispatch(closeModal(false));
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        className={classes.modal}
        open={isOpenModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpenModal}>
          <div className={classes.paper}>
            <Typography
              variant="h4"
              component="h4"
              align="center"
              id="transition-modal-title"
            >
              Log In section
            </Typography>

            <Form handleClose={handleClose} />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
export default ModalTemplate;
