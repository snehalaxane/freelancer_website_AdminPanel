import React, { createContext, useContext, useState } from "react";
import { Snackbar, Alert } from "@mui/material";

const NotificationContext = createContext(null);

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [state, setState] = useState({
    open: false,
    message: "",
    severity: "info", // success | error | warning | info
  });

  const showNotification = (message, severity = "info") => {
    setState({ open: true, message, severity });
  };

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setState((prev) => ({ ...prev, open: false }));
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      <Snackbar
        open={state.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={state.severity}
          variant="filled"
          sx={{ borderRadius: 2 }}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};
