import React, {useState} from "react";
import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import fire from "../fire";

const useStyles = makeStyles((theme) => ({
  menu: {
    "& svg": {
      fontSize: 40,
    },
  },
  paper: {
    height: "100px",
    width: "100px",
  },
  media: {
    height: "100px",
  },
  avatar: {
    width: "140px",
    height: "140px",
    margin: "20px",
  },
  nameCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    height: "200px",
    width: "30%",
  },
}));



function Interface() {
  const [image, setImage] = useState();
  const [url, setUrl] = useState('');
  const handleChange = e =>{
    if (e.target.files[0]){
      setImage(e.target.files[0]);
    }
  }
  const handleUpload = () => {
    const uploadT = fire.storage().ref('image/'+image.name).put(image);
  };
  fire.storage().ref('image/捕获.PNG').getDownloadURL().then(function(u) {
    setUrl(u);
    console.log(url);
  });
  return (
    <div className={useStyles().menu}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={useStyles().menu}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1, fontSize: "30px" }}>
            Profile Pictures Repository
          </Typography>
          <Button color="inherit" style={{ fontSize: "30px" }}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>

      <div>
        <Card className={useStyles().nameCard}>
          <Avatar
            className={useStyles().avatar}
            alt="Remy Sharp"
            src="https://picsum.photos/id/237/200/300"
          />
        </Card>
        <input
          onChange={handleChange}
          type="file"
          accept="image/*"
          id="cameraInput"
        />
        <button onClick = {handleUpload}> Upload</button>
      </div>

      <div>
        <Card className={useStyles().paper} elevation={5}>
          <CardMedia
            className={useStyles().media}
            image = {url}
            title="Paella dish"
          />
        </Card>
      </div>
    </div>
  );
}

export default Interface;
