//React
import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

interface IProps {
    openSnackBar: boolean;
    snackBarType: string;
    snackBarMessage: string;
    setOpenSnackBar: any;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SnackbarAlert(props: IProps) {
    const { openSnackBar, snackBarType, snackBarMessage, setOpenSnackBar } = props;

    const handleCloseSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnackBar(false);
      };

    return (
        <Snackbar
            open={openSnackBar}
            autoHideDuration={4000}
            onClose={handleCloseSnackBar}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
            {snackBarType === "success" ? 
            <Alert
                onClose={handleCloseSnackBar}
                severity="success"
                sx={{ width: "100%", backgroundColor: "rgba(152, 222, 98, 0.9)", color: "#292828" }}
            >
                {snackBarMessage}
            </Alert> 
            : 
            snackBarType === "error" ?
            <Alert
                onClose={handleCloseSnackBar}
                severity="error"
                sx={{ width: "100%", backgroundColor: "rgba(255, 72, 81, .90)" }}
            >
                {snackBarMessage}
            </Alert>
            :
            <Alert
            onClose={handleCloseSnackBar}
            severity="info"
            sx={{ width: "100%", backgroundColor: "rgba(173, 221, 245, 0.9)", color: "#505050" }}
            >
            {snackBarMessage}
            </Alert>
            }
        </Snackbar>
    );
}

export { 
    SnackbarAlert
}