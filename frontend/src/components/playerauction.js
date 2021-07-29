import React, { Component } from "react";
import Button from '@material-ui/core/Button';
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


export default class playerauction extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          location: "",
          org_id: "",
          completedplayer: [],
          ongoingplayer: [],
        };
        this.teamCode = this.props.match.params.teamCode;
        this.getTeamDetails();
        this.handleDetailsButtonPressed = this.handleDetailsButtonPressed.bind(this);
        this.handleBidButtonPressed = this.handleBidButtonPressed.bind(this);
      }

      getTeamDetails() {
        fetch("/api/get-team" + "?code=" + this.teamCode)
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              name: data.name,
              location: data.location,
              org_id: data.org_id,
            });
          });
      }

      handleDetailsButtonPressed() {
        let all_players = [];
        fetch("/api/completed")
        .then((response) => response.json())
        .then((data) => {
            for(let i=0;i<data.length;i++){
                let obj = data[i];
                if(obj.org_id==this.state.org_id){
                    all_players.push(obj);
                }
            }
            this.setState({
                completedplayer: all_players,
            });
        });
        let ongoing_player = [];
        fetch("/api/ongoing")
        .then((response) => response.json())
        .then((data) => {
          sleep(100).then(() => {
            //console.log(data, ongoing_player);
            ongoing_player = [];
            for(let i=0;i<data.length;i++){
                let obj = data[i];
                if(obj.org_id==this.state.org_id){
                    ongoing_player.push(obj);
                }
            }
            this.setState({
                ongoingplayer: ongoing_player,
            });
            ongoing_player = [];
          });
        });
      }

      handleBidButtonPressed() {
        let ongoing_player = [];
        fetch("/api/ongoing")
        .then((response) => response.json())
        .then((data) => {
            ongoing_player.push(data[data.length-1]);
          });
        
        sleep(100).then(() => {
          if(ongoing_player[0].price=="NIL"){
            ongoing_player[0].price = "20";
          }
          else{
            var value = parseInt(ongoing_player[0].price)+20;
            var val = value.toString();
            ongoing_player[0].price = val;
          }
          ongoing_player[0].team_name = this.state.name;
          ongoing_player[0].team_id = this.teamCode;
          //console.log(ongoing_player[0]);

          const requestOptions = {
            method: "POST",
            cache: "no-cache",
            headers: { 
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              org_id: ongoing_player[0].org_id,
              name: ongoing_player[0].name,
              skill: ongoing_player[0].skill,
              player_id: ongoing_player[0].player_id,
              team_id: ongoing_player[0].team_id,
              team_name: ongoing_player[0].team_name,
              price: ongoing_player[0].price,
              }),
          };
          fetch("http://127.0.0.1:8000/api/createongoing", requestOptions)
            .then((response) => response.json())
            .then((data) => console.log(data));

        });

      }
    
      render() {
        return (
            <Container component="main" maxWidth="md" align="center">
                <div >
                    <p component="h1" variant="h5"> Team Name : {this.state.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Team Location : {this.state.location} </p>
                </div>
                <Box mt={3} mb={3}>
                  <p component="h1" variant="h5"> Completed Players </p>
                  <TableContainer component={Paper} spacing={9}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell> Player Name </StyledTableCell>
                          <StyledTableCell align="left"> Player Skill </StyledTableCell>
                          <StyledTableCell align="left"> Team Owner </StyledTableCell>
                          <StyledTableCell align="left"> Value </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.completedplayer.map((row) => (    //'org_id', 'player_id', 'name', 'skill', 'team_id', 'team_name', 'price'
                          <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                              {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.skill}</StyledTableCell>
                            <StyledTableCell align="left">{row.team_name}</StyledTableCell>
                            <StyledTableCell align="left">{row.price}</StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Box mt={3} mb={3}>
                  <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={this.handleDetailsButtonPressed}
                  >
                      SHOW PLAYERS DETAILS
                  </Button>
                </Box>
                <Box mt={3} mb={3}>
                <p component="h1" variant="h2"> Ongoing Players </p>
                  <TableContainer component={Paper} spacing={9}>
                    <Table aria-label="customized table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell> Player Name </StyledTableCell>
                          <StyledTableCell align="left"> Player Skill </StyledTableCell>
                          <StyledTableCell align="left"> Team Owner </StyledTableCell>
                          <StyledTableCell align="left"> Current Value </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.ongoingplayer.map((row) => (    //'org_id', 'player_id', 'name', 'skill', 'team_id', 'team_name', 'price'
                          <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                              {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="left">{row.skill}</StyledTableCell>
                            <StyledTableCell align="left">{row.team_name}</StyledTableCell>
                            <StyledTableCell align="left">{row.price}</StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
                <Box mt={3} mb={3}>
                  <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={this.handleBidButtonPressed}
                  >
                      BID CURRENT PLAYER
                  </Button>
                </Box>
            </Container>
        );
      }


}