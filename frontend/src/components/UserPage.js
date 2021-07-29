import React, { Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

export default class UserPage extends Component {
  defaultname = "Andhra Pradesh Badminton Assosiation";
  defaultmail = "andhraboard@iba.ac.in";
  defaultnumberofplayers = 5;
  defaultnumberofteams = 21;
  defaultpassword = "aba@123";
  constructor(props) {
    super(props);

    this.state = {
      getname: this.defaultname,
      getmail: this.defaultmail,
      getnumberofplayers: this.defaultnumberofplayers,
      getnumberofteams: this.defaultnumberofteams,
      getpassword: this.defaultpassword,
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMailChange = this.handleMailChange.bind(this);
    this.handleNumberOfPlayersChange = this.handleNumberOfPlayersChange.bind(this);
    this.handleNumberOfTeamsChange = this.handleNumberOfTeamsChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleButtonPressed = this.handleButtonPressed.bind(this);
  };

  handleNameChange(e) {
    this.setState({
      getname: e.target.value,
    });
  }

  handleMailChange(e) {
    this.setState({
      getmail: e.target.value,
    });
  }

  handleNumberOfPlayersChange(e) {
    this.setState({
      getnumberofplayers: e.target.value,
    });
  }

  handleNumberOfTeamsChange(e) {
    this.setState({
      getnumberofteams: e.target.value,
    });
  }

  handlePasswordChange(e) {
    this.setState({
      getpassword: e.target.value,
    });
  }

  handleButtonPressed() {
    const requestOptions = {
      method: "POST",
      cache: "no-cache",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.getname,
        mail: this.state.getmail,
        no_players: this.state.getnumberofplayers,
        no_teams: this.state.getnumberofteams,
        password: this.state.getpassword,
      }),
    };
    fetch("http://127.0.0.1:8000/api/createuser", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }
      /*
      fetch('http://127.0.0.1:8000/api/tadmin')
      .then((response) => response.json())
      .then((responseJson) => {
          console.log(responseJson);
      })*/

  render() {
    return (
      <Container component="main" maxWidth="xs" spacing={7}> 
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
          Sign up
        </Typography>
        </Grid>
        </Grid>
        <form noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Tournament Organizer"
                autoFocus
                onChange={this.handleNameChange}
                defaultValue={this.defaultname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="mail"
                label="Email Address"
                name="mail"
                autoComplete="mail"
                onChange={this.handleMailChange}
                defaultValue={this.defaultmail}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
              type="number"
              variant="outlined"
              fullWidth
              id="no_teams"
              label="Number of Teams"
              inputProps={{
                min: 1,
              }}
              onChange={this.handleNumberOfTeamsChange}
              defaultValue={this.defaultnumberofteams}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
              type="number"
              variant="outlined"
              fullWidth
              id="no_players"
              label="Number of Players"
              inputProps={{
                min: 1,
              }}
              onChange={this.handleNumberOfPlayersChange}
              defaultValue={this.defaultnumberofplayers}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handlePasswordChange}
                defaultValue={this.defaultpassword}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I accept all terms and conditions"
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            spacing={5}
            onClick={this.handleButtonPressed}
            to="/login"
            component={Link}
          >
            Sign Up
          </Button>
          <Box mb={1}></Box>
          <Grid container justify="flex-end" className="classes.pad">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
        </div>
      <Box mt={5}>
      </Box>
    </Container>

      
    );
  }
}