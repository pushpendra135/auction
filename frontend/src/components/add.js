import React, { Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

export default class add extends Component {
  defaultlocation = "";
  defaultname = "";
  defaultplayer = "";
  defaultskill = "";
  constructor(props) {
    super(props);
    this.state = {
        gettname: this.defaultname,
        getlocation: this.defaultlocation,
        getplayer: this.defaultplayer,
        getskill: this.defaultskill,
        name: "",
        rows: [],
        players: [],
    };
    this.addCode = this.props.match.params.addCode;
    this.getRoomDetails();
    this.getDetails = this.getDetails.bind(this);
    this.getPlayerDetails = this.getPlayerDetails.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleButtonPressed = this.handleButtonPressed.bind(this);
    this.handlePlayerChange = this.handlePlayerChange.bind(this);
    this.handleSkillChange = this.handleSkillChange.bind(this);
    this.handleSecondButtonPressed = this.handleSecondButtonPressed.bind(this);
    this.handleThirdButtonPressed = this.handleThirdButtonPressed.bind(this);
  }

  handleNameChange(e) {
    this.setState({
      gettname: e.target.value,
    });
  }

  handleLocationChange(e) {
    this.setState({
      getlocation: e.target.value,
    });
  }

  handlePlayerChange(e) {
    this.setState({
      getplayer: e.target.value,
    });
  }

  handleSkillChange(e) {
    this.setState({
      getskill: e.target.value,
    });
  }

  getRoomDetails() {
    fetch("/api/get-add" + "?code=" + this.addCode)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          name: data.name,
        });
      });
  }

  getDetails(){
    let teams = [];
    fetch("/api/team")
    .then((response) => response.json())
    .then((data) => {
        for(let i=0;i<data.length;i++){
            let obj = data[i];
            if(obj.org_id==this.addCode){
                teams.push(obj);
            }
        }
        this.setState({
            rows: teams,
        });
    });
  }

  getPlayerDetails(){
    let all_players = [];
    fetch("/api/player")
    .then((response) => response.json())
    .then((data) => {
        for(let i=0;i<data.length;i++){
            let obj = data[i];
            if(obj.org_id==this.addCode){
                all_players.push(obj);
            }
        }
        this.setState({
            players: all_players,
        });
    });
  }

  handleThirdButtonPressed() {
    this.props.history.push("/serverauction/" + this.addCode);
  }

  handleSecondButtonPressed() {
    const requestOptions = {
      method: "POST",
      cache: "no-cache",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        org_id: this.addCode,
        name: this.state.getplayer,
        skill: this.state.getskill,
        }),
    };
    fetch("http://127.0.0.1:8000/api/createplayer", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  handleButtonPressed() {
    const requestOptions = {
      method: "POST",
      cache: "no-cache",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        org_id: this.addCode,
        name: this.state.gettname,
        location: this.state.getlocation,
        }),
    };
    fetch("http://127.0.0.1:8000/api/createteam", requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  render() {
    return (
        <Container component="main" maxWidth="sm" align="center">
            <div >
                <p component="h1" variant="h5"> Tournament Host : {this.state.name} </p>
            </div>
            <div >
                <p component="h1" variant="h5" color="secondary"> Add Teams Field </p>
            </div>
            <Grid>
                <form noValidate>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="tname"
                      label="Team Name"
                      name="tname"
                      autoComplete="tname"
                      onChange={this.handleNameChange}
                      defaultValue={this.defaultname}
                      autoFocus
                    />
                </form>
            </Grid>
            <Grid>
                <form noValidate>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="location"
                      label="Team Location"
                      name="location"
                      autoComplete="location"
                      onChange={this.handleLocationChange}
                      defaultValue={this.defaultlocation}
                      autoFocus
                    />
                </form>
            </Grid>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                spacing={5}
                onClick={this.handleButtonPressed}
            >
                Submit
            </Button>
            <Box mt={3} mb={3}>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={this.getDetails}
            >
                Show Teams
            </Button>
            </Box>

            <TableContainer component={Paper} spacing={9}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell> Team Id </StyledTableCell>
                      <StyledTableCell align="left"> Team Name </StyledTableCell>
                      <StyledTableCell align="left"> Team Location </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.rows.map((row) => (
                      <StyledTableRow key={row.team_id}>
                        <StyledTableCell component="th" scope="row">
                          {row.team_id}
                        </StyledTableCell>
                        <StyledTableCell align="left">{row.name}</StyledTableCell>
                        <StyledTableCell align="left">{row.location}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
            </TableContainer>
            <Box mt={3} mb={3}></Box>
            <div >
                <p component="h1" variant="h5" color="secondary"> Add Players Field </p>
            </div>
            <Grid>
                <form noValidate>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="pname"
                      label="Player Name"
                      name="pname"
                      autoComplete="pname"
                      onChange={this.handlePlayerChange}
                      defaultValue={this.defaultplayer}
                      autoFocus
                    />
                </form>
            </Grid>
            <Grid>
                <form noValidate>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="skill"
                      label="Player Skill"
                      name="skill"
                      autoComplete="skill"
                      onChange={this.handleSkillChange}
                      defaultValue={this.defaultskill}
                      autoFocus
                    />
                </form>
            </Grid>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                spacing={5}
                onClick={this.handleSecondButtonPressed}
            >
                Submit
            </Button>
            <Box mt={3} mb={3}>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={this.getPlayerDetails}
            >
                Show Players
            </Button>
            </Box>
            <TableContainer component={Paper} spacing={9}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell> Player Id </StyledTableCell>
                      <StyledTableCell align="left"> Player Name </StyledTableCell>
                      <StyledTableCell align="left"> Player Skill </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {this.state.players.map((row) => (
                      <StyledTableRow key={row.player_id}>
                        <StyledTableCell component="th" scope="row">
                          {row.player_id}
                        </StyledTableCell>
                        <StyledTableCell align="left">{row.name}</StyledTableCell>
                        <StyledTableCell align="left">{row.skill}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
            </TableContainer>
            <Box mb={3}></Box>
            <Box mt={3} mb={3}>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                spacing={5}
                onClick={this.handleThirdButtonPressed}
            >
                GO TO AUCTION PAGE
            </Button>
            </Box>
        
        </Container>
    );
  }
}