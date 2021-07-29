import React, { Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

let value = false;

async function getapi(url, user, userid) {
    let userdata = [];
    var flag=false;
    const response = await fetch(url);
    var data = await response.json();
    for(let i=0;i<data.length;i++){
      let obj = data[i];
      userdata.push([obj.name, obj.team_id]);
    }
    let k = 0;
    for(let i=0; i<userdata.length; i++){
      if(userdata[i][0]==user){
        flag = true;
        k = i;
        break;
      }
    }
    if(flag==false){
        value = false;
    }
    else{
      userid[0] = userdata[k][1];
      value = true;
    }
  
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default class teamlogin extends Component {
  defaultname = "";
  defaulttext = "";
  constructor(props) {
    super(props);

    this.state = {
      getname: this.defaultname,
      text: this.defaulttext,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleButtonPressed = this.handleButtonPressed.bind(this);
  };

  handleNameChange(e) {
    this.setState({
      getname: e.target.value,
    });
  }

  handleButtonPressed() {
    let url = "http://127.0.0.1:8000/api/team/";
    let userid = [];
    getapi(url, this.state.getname, userid);
    sleep(100).then(() => {
      if(value==false){
        this.setState({
            text : "**Team is not registered!!",
        });
      }
      else{
        this.setState({
          text : "",
        });
        this.props.history.push("/playerauction/" + userid[0]);
      }
    })
  }

  render() {
    return (
        <Container component="main" maxWidth="xs" alignContent="center" alignItems="center" justify="center">
      <CssBaseline />
      <div className={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Grid container spacing={7}>
        <Grid item xs={12} align="center">
        <Avatar spacing={5} color="secondary">
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h4">
          Sign In
        </Typography>
        </Grid>
        </Grid>
        <form noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Team Name"
            name="name"
            autoComplete="name"
            onChange={this.handleNameChange}
            defaultValue={this.defaultname}
            autoFocus
          />
          <Typography color="secondary">
            {this.state.text}
          </Typography>
          <Box mt={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            spacing={5}
            onClick={this.handleButtonPressed}
            //to="/user"
            //component={Link}
          >
            Sign In
          </Button>
          </Box>
          <Box mb={1}></Box>
        </form>
      </div>
    </Container>
    );
  }
}