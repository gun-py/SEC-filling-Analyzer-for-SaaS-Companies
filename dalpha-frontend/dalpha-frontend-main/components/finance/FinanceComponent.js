import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";

import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styles from "../../styles/Home.module.css";

function date_formater(s) {
  let d = new Date(s);
  return `${d.getDay() + 1}-${d.getMonth() + 1}-${d.getFullYear()}`;
}

function process_word(s) {
  let ans = "";
  for (let i = 0; i < s.length; i++) {
    if (s[i].toUpperCase() === s[i]) ans = ans + " ";
    ans = ans + s[i];
  }
  return ans;
}

function abs(value) {
  if (value < 0) return -value;
  return value;
}
function curr_formater(value) {
  if (abs(value) > 1e9) {
    return `${(value / 1e9).toFixed(2)} B`;
  } else if (abs(value) > 1e6) {
    return `${(value / 1e6).toFixed(2)} M`;
  } else if (abs(value) > 1e3) {
    return `${(value / 1e3).toFixed(2)} K`;
  } else {
    return value;
  }
}

function NestDisplay({ nest }) {
  const ad = [];
  for (let item in nest)
    ad.push(
      // <Grid container spacing={3}>
      //     <Grid item xs={12} md={8}>
      //         <b>{item} </b>
      //     </Grid>
      //     <Grid item xs={12} md={4}>
      //         {nest[item]}
      //     </Grid>
      // </Grid>
      <TableRow>
        <TableCell align="left">
          <Typography
            variant="h6"
            component="h6"
            className={styles.finance_element}
          >
            {item}
          </Typography>
        </TableCell>
        <TableCell align="right">USD {curr_formater(nest[item])}</TableCell>
      </TableRow>
    );
  return <div>{ad}</div>;
}

function FinancialHead({ financeData }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  let financeArr = [];
  for (let item in financeData) {
    financeArr.push({
      itemName: item,
      itemValue: financeData[item],
    });
  }

  const acc = financeArr.map((item, i) => (
    // <li key={i}>
    <Accordion
      key={i}
      expanded={expanded === `panel${i}`}
      onChange={handleChange(`panel${i}`)}
      className={styles.acc_element}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${i}bh-content`}
        id={`panel${i}bh-header`}
      >
        <Grid container spacing={2}>
          <Grid item md={12} lg={9}>
            <Typography>{process_word(item.itemName)}</Typography>
          </Grid>
          <Grid item md={12} lg={3}>
            <Typography sx={{ color: "text.secondary" }}>
              {/* <b>Date: </b> */}
              <span>
                {item.itemValue.date
                  ? date_formater(item.itemValue.date)
                  : date_formater(item.itemValue.to)}
              </span>
            </Typography>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer className={styles.border_left}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              <NestDisplay nest={item.itemValue.value} />
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
    // </li>
  ));

  return <div>{acc}</div>;
}

export default function FinanceComponent({ cpid, cpname, financeData }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <FinancialHead financeData={financeData} />
      </Grid>
    </Grid>
  );
}
