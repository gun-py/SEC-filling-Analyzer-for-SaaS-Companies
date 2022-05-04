import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import PeopleIcon from "@mui/icons-material/People";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import styles from "../../styles/Home.module.css";

import Link from "next/link";

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Company Info" />
    </ListItemButton>
    <Link href="/test/testDashboard">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Matris" />
      </ListItemButton>
    </Link>
    <ListItemButton>
      <ListItemIcon>
        <AssessmentIcon />
      </ListItemIcon>
      <ListItemText primary="Balance Sheets" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AnnouncementIcon />
      </ListItemIcon>
      <ListItemText primary="Announcements" />
    </ListItemButton>
  </React.Fragment>
);

// export const getStaticProps = async () => {
//   const res = await fetch('/data');
//   const link = await res.json()
//   return {
//     props: {
//       link : link
//     }
//   }
// }
const link = "http://localhost:8080/api/v1/returnonequity?id=1459417";

export default function secondaryListItems() {
  return (
    <React.Fragment>
      <a href={link} target="_blank" rel="noreferrer" className={styles.link}>
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Dataset" />
        </ListItemButton>
      </a>
    </React.Fragment>
  );
}
