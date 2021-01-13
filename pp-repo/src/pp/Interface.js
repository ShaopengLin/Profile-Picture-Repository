import React, { useState , useEffect} from "react";
import { Button } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import fire from "../fire";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Fab from "@material-ui/core/Fab";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import CurrentUser from "./CurrentUser";
import { useHistory } from "react-router-dom";
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
    transform: `translate(-50px, -170px)`,
  },
  subBlocks: {
    position: "relative,",
  },
  editPhoto: {
    position: "absolute",
  },
  deletePhoto: {
    position: "absolute",
  },
}));

function Interface() {


  const history = useHistory();
  const [image, setImage] = useState();
  const [tempUrl, setTempUrl] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [profileUrl, setProfileUrl] = useState('');
  const [imageLinks, setImageLinks] = useState(['']);
  const handleSetLinks= () =>{
    CurrentUser.getImageLink().then((links) => {
      setImageLinks(links);
    });
    CurrentUser.getProfileLink().then((link)=>{setProfileUrl(link)});
  }
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleSignOut = () => {
    fire.auth().signOut().then(()=>{
      history.push("/");
    });
  };
  const handleCloseUpload =()=>{
    setAnchorEl(null);
    if (image != null){
    const uploadT = fire
      .storage()
      .ref("image/1")
      .put(image);
    }
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const indent = [];
  const tileData = [];
 /* tileData.push("https://picsum.photos/id/237/200/300");
  tileData.push("https://picsum.photos/seed/picsum/200/300");
  tileData.push("https://picsum.photos/id/237/200/300");
  tileData.push("https://picsum.photos/id/237/200/300");
  tileData.push("https://picsum.photos/id/237/200/300");
  tileData.push("https://picsum.photos/id/237/200/300");
  tileData.push("https://picsum.photos/id/237/200/300");
  tileData.push("https://picsum.photos/id/237/200/300");
  tileData.push("https://picsum.photos/id/237/200/300");
  tileData.push("https://picsum.photos/id/237/200/300");*/
  let pr = useStyles().paper;
  for (let i = 1; i < 7; i++) {
    indent.push(<Card className={pr} elevation={5} />);
  }

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
    
  };
  const handleUpload = () => {
    if (image != null){
      const uploadT = fire
        .storage()
        .ref(fire.auth().currentUser.uid +"/"+ image.name)
        .put(image);
        uploadT.on(
          "state_changed",
          snapshot=>{},
          error=>{

          },
          ()=>{
          fire.storage().ref(fire.auth().currentUser.uid +'/'+ image.name).getDownloadURL().then((u)=>{
            var arrayU = [];
            arrayU.push(u);
            setImageLinks(imageLinks.concat(arrayU));
          arrayU = imageLinks;
          CurrentUser.setImageLink(arrayU);
          })
          
        })
          
      
    }
  };
  useEffect(() => {
    if (fire.auth().currentUser && fire.firestore().collection('UserData').doc(fire.auth().uid)){
    handleSetLinks();
    }

  }, [])
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
          <Button color="inherit" style={{ fontSize: "30px" }} onClick = {handleSignOut}>
            Sign Out
          </Button>
        </Toolbar>
      </AppBar>

      <div className={useStyles().nameCardPos}>
        <Card className={useStyles().nameCard} elevation = {6}>
          <Avatar
            className={useStyles().avatar}
            alt="Remy Sharp"
            src= {profileUrl}
            />
        </Card>
      </div>

      <div className={useStyles().ImgList}>
        <Fab color="primary" className={useStyles().addPhoto}  component="label" onClick = {handleUpload}>
        <input
                          onChange={handleChange}
                          type="file"
                          accept="image/*"
                          id="cameraInput"
                          hidden
                          
                        />
          <AddAPhotoIcon />
          
        </Fab>

        <GridList cellHeight={130} className={useStyles().gridList} cols={3}>
          {tileData.map((tile) => (
            <GridListTile cols={tile.cols || 1}>
              <img src={tile} />
              <GridListTileBar
                style={{ marginBottom: "80px" }}
                actionIcon={
                  <IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Set as Profile</MenuItem>
                      <MenuItem
                        aria-label="More"
                        aria-owns="long-menu"
                        aria-haspopup="true"
                        onClick={handleCloseUpload}
                        variant="contained"
  component="label"
                      >
                        
                        Upload New
                        <input
                          onChange={handleChange}
                          type="file"
                          accept="image/*"
                          id="cameraInput"
                          hidden
                        />
                      </MenuItem>
                      <MenuItem onClick={handleClose}>Remove</MenuItem>
                      
                    </Menu>
                    <MoreHorizIcon color="primary" onClick={handleClick} />
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
/*<input
          onChange={handleChange}
          type="file"
          accept="image/*"
          id="cameraInput"
        />
        <button onClick = {handleUpload}> Upload</button>*/
/*<Card className={useStyles().paper} elevation={5}>
          <CardMedia
            className={useStyles().media}
            image = {url}
            title="Paella dish"
          />
        </Card>*/
