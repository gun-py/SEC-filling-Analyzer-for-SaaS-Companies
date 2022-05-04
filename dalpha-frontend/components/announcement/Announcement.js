import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styles from "../../styles/Home.module.css";
import ReadMoreReact from "read-more-react";

export default function Announcement({ cpid, cpname, announcement }) {
  let data = announcement[0];
  console.log(data);
  return (
    <React.Fragment>
      <Paper sx={{ padding: "30px" }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Typography variant="h2" component="div" sx={{ color: "#1976d2" }}>
              {cpname}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6" component="div" sx={{ textAlign: "end" }}>
              {cpid}
            </Typography>
            <Typography
              gutterBottom
              variant="p"
              component="div"
              sx={{ textAlign: "end" }}
            >
              {data.date}
            </Typography>
          </Grid>
        </Grid>
        <ReadMoreReact
          className={styles.para_announcements}
          text={data.text}
          min={800}
          ideal={5000}
          max={100000}
          sx={{
            cursor: "pointer",
          }}
        />
        <Box sx={{ marginTop: "20px", padding: "20px" }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                component="h6"
                className={styles.positive_value}
              >
                {data.positive.toFixed(2)}%
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography
                variant="h6"
                component="h6"
                className={styles.negative_value}
              >
                {data.negative.toFixed(2)}%
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </React.Fragment>
  );
}
