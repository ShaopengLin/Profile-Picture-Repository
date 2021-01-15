import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import useStyles from "../styleFile/interface";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import fire from "../fire";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Fab from "@material-ui/core/Fab";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import CurrentUser from "./CurrentUser";
import { useHistory } from "react-router-dom";
import GridMenu from "./Menu";
const interfaceStyles = useStyles;

function Interface() {
  const history = useHistory();
  const [image, setImage] = useState();
  const [profileUrl, setProfileUrl] = useState("");
  const [imageLinks, setImageLinks] = useState([]);

  const handleSetLinks = () => {
    CurrentUser.getImageLink().then((links) => {
      setImageLinks(links);
    });
    CurrentUser.getProfileLink().then((link) => {
      setProfileUrl(link);
    });
  };
  const handleSetProfile = (url) => {
    setProfileUrl(url);
    CurrentUser.setProfileLink(url);
  };

  const handleSignOut = () => {
    fire
      .auth()
      .signOut()
      .then(() => {
        history.push("/");
      });
  };

  const handleChange = (e) => {
    if (e.target.files[0] != null) {
      const uploadT = fire
        .storage()
        .ref(fire.auth().currentUser.uid + "/" + e.target.files[0].name)
        .put(e.target.files[0]);
      uploadT.on(
        "state_changed",
        (snapshot) => {},
        (error) => {},
        () => {
          uploadT.snapshot.ref.getDownloadURL().then((u) => {
            var arrayU = [];
            arrayU.push({
              url: u,
              index: imageLinks.length,
            });
            arrayU = imageLinks.concat(arrayU);
            setImageLinks(arrayU);

            CurrentUser.setImageLink(arrayU);
            setImage(null);
          });
        }
      );
    }
  };

  useEffect(() => {
    if (
      fire.auth().currentUser &&
      fire.firestore().collection("UserData").doc(fire.auth().uid)
    ) {
      handleSetLinks();
    }
  }, []);

  return (
    <div className={interfaceStyles().base}>
      <AppBar className={interfaceStyles().appBar}>
        <Toolbar>
          <IconButton className={interfaceStyles().menu}>
            <MenuIcon />
          </IconButton>
          <Typography className={interfaceStyles().appName}>
            Profile Pictures Repository
          </Typography>
          <Button className={interfaceStyles().signOut} onClick={handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>

      <div className={interfaceStyles().nameCardPos}>
        <Card className={interfaceStyles().nameCard} elevation={6}>
          <Avatar className={interfaceStyles().avatar} src={profileUrl} />
        </Card>
      </div>

      <div className={interfaceStyles().ImgList}>
        <Fab color="primary" className={interfaceStyles().addPhoto}>
          <input
            onChange={handleChange}
            type="file"
            accept="image/*"
            id="cameraInput"
            hidden
          />
          <AddAPhotoIcon />
        </Fab>

        <GridList
          cellHeight={130}
          className={interfaceStyles().gridList}
          cols={3}
        >
          {imageLinks.map((tile) => (
            <GridListTile cols={tile.cols || 1} key={tile.url} id={tile.url}>
              <img src={tile.url} alt="ok" />
              <GridListTileBar
                style={{ marginBottom: "83px" }}
                actionIcon={
                  <IconButton>
                    <GridMenu
                      url={tile.url}
                      handleChange={handleChange}
                      handleSetProfile={handleSetProfile}
                    />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    </div>
  );
}

export default Interface;
