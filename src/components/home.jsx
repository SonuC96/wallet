import React, { Component } from "react";
import {
  Box,
  Button,
  Typography,
  CardActions,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";
//import { blueGrey } from "@material-ui/core/colors";
class Home extends React.Component {
  render() {
    return (
      <div>
        <Box>
          {/* <Card
            style={{
              width: 1200,
              height: 480,
              backgroundColor: "light",
              marginLeft: 33,
              marginTop: 30,
              marginRight: 20,
              borderColor: "green",
            }}
          > */}
          <CardContent>
            <Typography
              style={{ fontSize: 40 }}
              color="textSuccess"
              gutterBottom
              variant="h1"
            >
              Wallet Payment App
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              style={{
                color: "black",
              }}
            >
              Welcome
            </Typography>
            <Typography
              style={{
                marginBottom: 12,
                color: "grey",
                marginTop: 20,
              }}
              variant="h4"
            >
              <i></i>
            </Typography>
            <Typography variant="body2" component="p"></Typography>
          </CardContent>
          <CardActions>
            <Button
              className="mx-auto"
              size="large"
              style={{ textAlign: "center" }}
            >
              {
                <Link
                  to="/login"
                  className="btn btn-outline-success btn-large  float-end  "
                >
                  LOGIN
                </Link>
              }

              {
                <Link
                  to="/createAcc"
                  className="btn btn-outline-success btn-large  float-start ms-5"
                >
                  CREATE ACCOUNT
                </Link>
              }
            </Button>
          </CardActions>
          {/* </Card> */}
        </Box>
      </div>
    );
  }
}

export default Home;
