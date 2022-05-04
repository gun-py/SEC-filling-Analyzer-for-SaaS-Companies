import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InfoIcon from "@mui/icons-material/Info";
import AddChartIcon from "@mui/icons-material/Addchart";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import CampaignIcon from "@mui/icons-material/Campaign";

export function MainListItems(props) {
  const { cpid, cpname, activeMenu } = props;
  const activeStyle = {
    backgroundColor: "#c1c8d9",
  };
  return (
    <React.Fragment>
      <Link href={`/${cpid}/company_info?cpname=${cpname}`}>
        <ListItemButton style={activeMenu == "company_info" ? activeStyle : {}}>
          <ListItemIcon>
            <InfoIcon />
          </ListItemIcon>
          <ListItemText primary="Company Info" />
        </ListItemButton>
      </Link>

      <Link href={`/${cpid}/company_metrics?cpname=${cpname}`}>
        <ListItemButton
          style={activeMenu == "company_metrics" ? activeStyle : {}}
        >
          <ListItemIcon>
            <AddChartIcon />
          </ListItemIcon>
          <ListItemText primary="Company Metrics" />
        </ListItemButton>
      </Link>

      <Link href={`/${cpid}/company_finances?cpname=${cpname}`}>
        <ListItemButton
          style={activeMenu == "company_finances" ? activeStyle : {}}
        >
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Finances" />
        </ListItemButton>
      </Link>

      <Link href={`/${cpid}/company_announcement?cpname=${cpname}`}>
        <ListItemButton
          style={activeMenu == "company_announcement" ? activeStyle : {}}
        >
          <ListItemIcon>
            <CampaignIcon />
          </ListItemIcon>
          <ListItemText primary="Announcements" />
        </ListItemButton>
      </Link>
    </React.Fragment>
  );
}

export function SecondaryListItems(props) {
  const { link } = props;
  console.log(link);
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Reports
      </ListSubheader>
      <a href={link} rel="noreferrer" target="_blank" className={styles.link}>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="DataSet" />
        </ListItemButton>
      </a>
      <br /><br />
      <Link href={`/`}>
      {/* <a href="/" rel="noreferrer" className={styles.link}> */}
        <ListItemButton className="primary">
          <ListItemIcon>
            <HomeIcon />
            {/* <img src="/logo.png" width="90%" style={{padding: "20px"}}/> */}
          </ListItemIcon>
          <ListItemText primary="Back to Home" />
        </ListItemButton>
      {/* </a> */}
      </Link>
      
    </React.Fragment>
  );
}
