import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { FormLabel } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signInAction } from "../../store/actions/authAction";

const useStyles = makeStyles({
  signIn: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    fontsize: 15,
    backgroundImage: "url(images/bg2.jpg)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  paper: {
    color: "white",
    padding: 50,
    maxWidth: 360,
    position: "relative",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgb(78 5 114)",
  },
  tittle: {
    padding: "20px 0 30px",
  },
  error: {
    color: "red",
    height: 21,
  },
});

const CssTextField = withStyles({
  root: {
    "& .MuiInputBase-input": {
      color: "white",
    },
    "& .MuiInput-underline:before": {
      borderBottomColor: "rgba(0, 0, 0, 0.87)",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottomColor: "white",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
  },
})(TextField);

export default function Signin() {
  const classes = useStyles();
  const inputStyle = { margin: "10px 0", "&>input": { color: "white" } };

  const dispatch = useDispatch();
  const history = useHistory();

  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [authSignIn, setAuthSignIn] = useState({
    taiKhoan: "",
    matKhau: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthSignIn({
      ...authSignIn,
      [name]: value,
    });
    setErrorText("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await dispatch(signInAction(authSignIn, history));
      if (data === true) {
        setErrorText("* Sai t??i kho???n ho???c m???t kh???u!");
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Grid className={classes.signIn}>
      <Paper elevation={10} className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <Grid align="center" className={classes.tittle}>
            <h2>Sign In</h2>
          </Grid>
          <div className={classes.error}>{errorText}</div>
          <div style={inputStyle}>
            <FormLabel style={{ color: "white" }}>T??i kho???n:</FormLabel>
            <CssTextField
              fullWidth
              required
              name="taiKhoan"
              onChange={handleChange}
            ></CssTextField>
          </div>
          <div style={inputStyle}>
            <FormLabel style={{ color: "white" }}>M???t kh???u:</FormLabel>
            <CssTextField
              type="password"
              fullWidth
              required
              name="matKhau"
              onChange={handleChange}
            ></CssTextField>
          </div>
          <Button
            style={{ margin: "20px 0" }}
            type="submit"
            color="primary"
            variant="contained"
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? "??ang ????ng nh???p..." : "????ng nh???p"}
          </Button>
          <Typography>
            <Link href="/forgot-password" color="inherit" underline="always">
              Forgot password?
            </Link>
          </Typography>
          <Typography>
            <span>Ch??a c?? t??i kho???n? </span>
            <Link href="/sign-up" color="inherit" underline="always">
              ????ng k??
            </Link>
          </Typography>
          <Typography>
            <Link href="/" color="inherit" underline="always">
              V??? trang ch???
            </Link>
          </Typography>
        </form>
      </Paper>
    </Grid>
  );
}
