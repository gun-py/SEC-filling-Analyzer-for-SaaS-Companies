import styles from "../styles/Home.module.css";
import MiniCard from "/components/MiniCard";
import SearchInput from "/components/Search";

export default function Home() {
  return (
    <div className={styles.body} style={{ height: "100vh" }}>
      <div className={styles.element_svg}></div>
      <div className={styles.container}>
        <img src="/logo.png" className={styles.logoMain} />
        <SearchInput />
        <div className={styles.grid}>
          <MiniCard
            link="/1459417/company_info?cpname=2U%20INC"
            name="2U INC"
          />
          <MiniCard
            link="/1023731/company_info?cpname=8X8%20INC"
            name="8X8 INC"
          />
          <MiniCard
            link="/1082324/company_info?cpname=VIRNETX%20HOLDING%20CORP"
            name="VIRNETX HOLDING CORP"
          />
          <MiniCard
            link="/317788/company_info?cpname=DIGITAL%20TURBINE%20INC"
            name="DIGITAL TURBINE INC"
          />
        </div>
      </div>
    </div>
  );
}
