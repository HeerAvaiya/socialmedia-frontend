import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

let useSnackbarRef;
export const SnackbarUtilsConfigurator = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

export const CloseButton = ({ id }) => {
  const { closeSnackbar } = useSnackbar();
  return (
    <IconButton
      color="inherit"
      size="small"
      onClick={() => closeSnackbar(id)}
    >
      <Close fontSize="small" />
    </IconButton>
  );
};


const Toast = {
  success(msg) {
    useSnackbarRef.enqueueSnackbar(msg, { variant: "success" });
  },
  error(msg) {
    useSnackbarRef.enqueueSnackbar(msg, { variant: "error" });
  },
  info(msg) {
    useSnackbarRef.enqueueSnackbar(msg, { variant: "info" });
  },
  warning(msg) {
    useSnackbarRef.enqueueSnackbar(msg, { variant: "warning" });
  },
};

export default Toast;