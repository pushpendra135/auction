import React, { Component } from "react";
import Avatar from '@material-ui/core/Avatar';
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
import Typography from '@material-ui/core/Typography';

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

export default class serverauction extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: "",
          text: "",
          alert: "",
          completedplayer: [],
          ongoingplayer: [],
        };
        this.addCode = this.props.match.params.addCode;
        this.getHostDetails();
        this.handleFinishButtonPressed = this.handleFinishButtonPressed.bind(this);
        this.handleShowButtonPressed = this.handleShowButtonPressed.bind(this);
        this.handleNextButtonPressed = this.handleNextButtonPressed.bind(this);
      }

      handleShowButtonPressed() {
        let all_players = [];
        fetch("/api/completed")
        .then((response) => response.json())
        .then((data) => {
            for(let i=0;i<data.length;i++){
                let obj = data[i];
                if(obj.org_id==this.addCode){
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
            for(let i=0;i<data.length;i++){
                let obj = data[i];
                if(obj.org_id==this.addCode){
                    ongoing_player.push(obj);
                }
            }
            this.setState({
                ongoingplayer: ongoing_player,
            });
        });
      }
      
      handleFinishButtonPressed() {
        let ongoing_player = [];
        fetch("/api/ongoing")
        .then((response) => response.json())
        .then((data) => {
          console.log(data[data.length-1]);
          if(data.length>0){
            ongoing_player.push(data[data.length-1]);
          }
        });
        sleep(100).then(() => {

          if (ongoing_player.length!=0){
            const requestOptions = {
              method: "POST",
              cache: "no-cache",
              headers: { 
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                org_id: this.addCode,
                name: ongoing_player[0].name,
                skill: ongoing_player[0].skill,
                player_id: ongoing_player[0].player_id,
                team_id: ongoing_player[0].team_id,
                team_name: ongoing_player[0].team_name,
                price: ongoing_player[0].price,
                }),
            };
            fetch("http://127.0.0.1:8000/api/createcompleted", requestOptions)
              .then((response) => response.json())
              .then((data) => console.log(data));

              const requests = {
                method: "POST",
                cache: "no-cache",
                headers: { 
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  org_id: this.addCode,
                  }),
              };
              fetch("http://127.0.0.1:8000/api/deleteongoing", requests)
                .then((response) => response.json())
                .then((data) => console.log(data));
          }
          
        });
      }

      handleNextButtonPressed() {
        fetch("/api/ongoing")
        .then((response) => response.json())
        .then((data) => {
          if(data.org_id==this.addCode && data.length!=0){
            this.setState({
              alert : "Already A Player's auction is going on",
            });
          }
          else{
            this.setState({
              alert : "",
            });
            let completed_players = [];
            fetch("/api/completed")
            .then((response) => response.json())
            .then((data) => {
                for(let i=0;i<data.length;i++){
                    let obj = data[i];
                    if(obj.org_id==this.addCode){
                        completed_players.push(obj);
                    }
                }
            });
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
            });
            sleep(100).then(() => {
              console.log(completed_players.length,all_players);
              let current_player = [];
              let k = -99;
              if(completed_players.lenth==0){
                console.log("Working");
                k = 0;
                current_player = all_players[0];
              }
              else{
                for(let i=0;i<all_players.length;i++){
                  let flag=0;
                  for (let j=0;j<completed_players.length;j++){
                    if(all_players[i].player_id==completed_players[j].player_id){
                      flag = 1;
                    }
                  }
                  if(flag==0){
                    k = i;
                    break;
                  }
                }
              }
              if(k==-99){
                this.setState({
                  text : "ALL PLAYERS' AUCTION IS COMPLETED",
              });
              }
              else{
                current_player = all_players[k];
                console.log(current_player);
              
                const requestOptions = {
                  method: "POST",
                  cache: "no-cache",
                  headers: { 
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    org_id: current_player.org_id,
                    name: current_player.name,
                    skill: current_player.skill,
                    player_id: current_player.player_id,
                    team_id: "None",
                    team_name: "Not Bided",
                    price: "NIL",
                    }),
                };
                fetch("http://127.0.0.1:8000/api/createongoing", requestOptions)
                  .then((response) => response.json())
                  .then((data) => console.log(data));
              }
            });
            
          }
        });
      }

      getHostDetails() {
        fetch("/api/get-add" + "?code=" + this.addCode)
          .then((response) => response.json())
          .then((data) => {
            this.setState({
              name: data.name,
            });
          });
      }
    
      render() {
        return (
            <Container component="main" maxWidth="md" align="center">
                <div >
                    <p component="h1" variant="h5"> Host Name : {this.state.name} </p>
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
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={this.handleShowButtonPressed}
                    >
                      SHOW DETAILS
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={this.handleFinishButtonPressed}
                    >
                      FINISH BIDING
                    </Button>
                  </Grid>
                </Grid>
                <Box mt={3} mb={3}>
                  <Typography variant="h3" color="secondary">
                    {this.state.alert}
                  </Typography>
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
                  <Typography variant="h3" color="secondary">
                    {this.state.text}
                  </Typography>
                </Box>
                <Box mt={3} mb={3}>
                  <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={this.handleNextButtonPressed}
                  >
                      NEXT PLAYER
                  </Button>
                </Box>
            </Container>
        );
      }


}