import React from "react";
import { Box, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import PropTypes from "prop-types";
import { useSpring, animated } from "@react-spring/web";
import getTheme from "../../../theme/Theme";
const theme = getTheme();

const CustomModal = ({ children, open, handleClose, isModalReview }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "8px",
    boxShadow: "0px 8px 24px 0px #2E34790A",
    overflow: "scroll",

    p: 4,
    [theme.breakpoints.down("lg")]: {
      width: "60%",
      height: isModalReview ? "auto" : "600px !important",
      overflow: "scroll",
    },
    [theme.breakpoints.down("md")]: {
      width: "90%",
      height: isModalReview ? "auto" : "600px !important",
      overflow: "scroll",
    },
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          TransitionComponent: Fade,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  );
};

export default CustomModal;

const Fade = React.forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {React.cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};
