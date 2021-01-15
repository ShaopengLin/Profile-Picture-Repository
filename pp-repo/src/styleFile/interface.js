import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  base: {
    "& svg": {
      fontSize: 40,
    },
  },
  menu: {
    edge: "start",
    color: "inherit",
    ariaLabel: "menu",
  },
  appBar: {
    position: "static",
  },
  appName: {
    variant: "h6",
    flexGrow: 1,
    fontSize: "30px",
  },
  signOut: {
    color: "inherit",
    fontSize: "30px",
  },
  paper: {
    height: "100px",
    width: "100px",
  },
  media: {
    height: "100px",
  },
  avatar: {
    alt: "Remy Sharp",
    width: "140px",
    height: "140px",
    margin: "20px",
  },
  nameCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    height: "200px",
    width: "600px",
  },
  nameCardPos: {
    marginTop: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ImgList: {
    position: "relative",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  gridList: {
    transform: `translate(-30px, 0px)`,
    width: 600,
    height: 400,
  },
  addPhoto: {
    component: "label",
    transform: `translate(-50px, -170px)`,
  },
}));
export default useStyles;
