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

async function getapi(url, user, password, userid) {
  let userdata = [];
  var flag=false;
  const response = await fetch(url);
  var data = await response.json();
  for(let i=0;i<data.length;i++){
    let obj = data[i];
    userdata.push([obj.mail,obj.password, obj.team_id]);
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
    if (userdata[k][1]!=password){
      value = false;
    }
    else{
      userid[0] = userdata[k][2];
      value = true;
    }
  }
  
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default class login extends Component {
  defaultmail = "";
  defaultpassword = "";
  defaulttext = "";
  constructor(props) {
    super(props);

    this.state = {
      getmail: this.defaultmail,
      getpassword: this.defaultpassword,
      text: this.defaulttext,
    };

    this.handleMailChange = this.handleMailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleButtonPressed = this.handleButtonPressed.bind(this);
  };

  handleMailChange(e) {
    this.setState({
      getmail: e.target.value,
    });
  }

  handlePasswordChange(e) {
    this.setState({
      getpassword: e.target.value,
    });
  }

  handleButtonPressed() {
    let url = "http://127.0.0.1:8000/api/tadmin/";
    let userid = [];
    getapi(url, this.state.getmail, this.state.getpassword, userid);
    sleep(100).then(() => {
      if(value==false){
        this.setState({
            text : "*Either password is incorrect or user is not registered!!",
        });
      }
      else{
        this.setState({
          text : "",
        });
        this.props.history.push("/add/" + userid[0]);
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={this.handleMailChange}
            defaultValue={this.defaultmail}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={this.handlePasswordChange}
            defaultValue={this.defaultpassword}
            autoComplete="current-password"
          />
          <Typography color="secondary">
          {this.state.text}
        </Typography>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
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
          <Box mb={1}></Box>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
    );
  }
}