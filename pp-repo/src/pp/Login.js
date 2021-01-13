import React from "react";
import ReactDOM from "react-dom";
import { Button, Input, InputLabel, InputAdornment } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import VpnKeyIcon from '@material-ui/icons/VpnKey';

function Login() {
  return (
    <div
      className="login"
      style={{
        height: "700px",
        width: "200px",
        position: "absolute",
        left: "50%",
        top: "70%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
      <Input
        className="mailF"
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        }
        style={{ marginBottom: "20px" }}
      />

      <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
      <Input
        className="passF"
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">
            <VpnKeyIcon />
          </InputAdornment>
        }
        style={{ marginBottom: "20px" }}
      />

      <Button
        className="lButton"
        variant="contained"
        color="primary"
        size="large"
        style={{
          fontSize: "2em",
          maxWidth: "200px",
          maxHeight: "70px",
          minWidth: "200px",
          minHeight: "70px",
          marginBottom: "20px"
        }}
      >
        Login
      </Button>

      <Button
        className="SButton"
        variant="contained"
        color="primary"
        size="large"
        style={{
          fontSize: "2em",
          maxWidth: "200px",
          maxHeight: "70px",
          minWidth: "200px",
          minHeight: "70px",

        }}
      >
        {" "}
        Sign Up{" "}
      </Button>

    </div>
  );
}

export default Login;