import styles from '../styles/Home.module.css'
import styRec from '../styles/Rec.module.css'
import TextField from '@mui/material/TextField';
import Recommendations from '../components/Recommendations'

export default function Home() {
  return (
    <div className={styles.body}>
        <div className={styRec.topSearchBar}>
            <img src="/logo.png" className={styRec.sideLogo} />
        <TextField
          className={styRec.search}
            helperText="Please enter Company name"
            id="demo-helper-text-misaligned"
            label="Search"
            />
        </div>
      <hr />
      <div className={styRec.recommended}>
        <Recommendations />
        <Recommendations />
        <Recommendations />
        <Recommendations />
        <Recommendations />
        <Recommendations />
      </div>
    </div>
  )
}
