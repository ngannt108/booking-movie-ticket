import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { getProfileAction } from "../../store/actions/profileAction";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {
  AddBox,
  Cancel,
  EditRounded,
  Face,
  InsertChart,
  KeyboardTab,
  MovieCreation,
} from "@material-ui/icons";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import clsx from "clsx";
// import AdminQuanLyMovie from "../components/AdminQuanLyMovie";
// import AdminTaoLichChieuPhim from "../components/AdminTaoLichChieuPhim";
import { Movie } from "../../components/Admin/Movie";
import AddShowTime from "../../components/Admin/AddShowtime";
import { User } from "../../components/Admin/User";
import { ChartAdmin } from "../../components/Admin/Chart";
import { signOutActions } from "../../store/actions/authAction";
import { useHistory } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "white",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function AdminPage() {
  const taiKhoan = JSON.parse(localStorage.getItem("taiKhoan"));
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfileAction(taiKhoan));
  }, [dispatch, taiKhoan]);

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [option, setOption] = useState(1);
  const history = useHistory();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const signOut = () => {
    //dispatch(signOutActions(history))
    localStorage.clear();
    history.push("/");
  };

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          style={{ background: "black", color: "#01d101" }}
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Quản lý
              {/* //Typography */}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem
              button
              onClick={() => {
                setOption(1);
              }}
            >
              <ListItemIcon>
                <Face />
              </ListItemIcon>
              <ListItemText primary="Quản lý người dùng" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setOption(2);
              }}
            >
              <ListItemIcon>
                <MovieCreation />
              </ListItemIcon>
              <ListItemText primary="Quản lý phim" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setOption(3);
              }}
            >
              <ListItemIcon>
                <AddBox />
              </ListItemIcon>
              <ListItemText primary="Tạo lịch chiếu phim" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                setOption(4);
              }}
            >
              <ListItemIcon>
                <InsertChart />
              </ListItemIcon>
              <ListItemText primary="Thống kê" />
            </ListItem>
            <ListItem button onClick={() => signOut()}>
              <ListItemIcon>
                <KeyboardTab />
              </ListItemIcon>
              <ListItemText primary="Đăng xuất" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {option === 1 ? <User /> : ""}
          {option === 2 ? <Movie /> : ""}
          {option === 3 ? <AddShowTime /> : ""}
          {option === 4 ? <ChartAdmin /> : ""}
        </main>
      </div>
    </div>
  );
}
