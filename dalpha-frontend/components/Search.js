import styles from "../styles/Home.module.css";
import React from "react";

import { useRouter } from "next/router";
import Link from "next/link";

export default function SearchInput() {
  let theInput = React.createRef();
  const router = useRouter();

  async function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log(theInput.current.value);

      // <Link href={$thInput.current.value}>
      //     <a>

      //     </a>
      // </Link>

      // const res = await fetch('https://dalpha-server.herokuapp.com/api/v1/liabilities?id=1084048');
      const res = await fetch(
        `https://dalpha-server-inter-iit.herokuapp.com/api/v1/search?name=${theInput.current.value
          .trim()
          .toUpperCase()}`
      );
      const data = await res.json();
      console.log(data);
      theInput.current.value = "";

      if (data) {
        let cpid = data.results[0].id;
        let cpname = data.results[0].name;
        router.push(`/${cpid}/company_info?cpname=${cpname}`);
      }
    }
  }
  return (
    <form className={styles.form}>
      <img src="/searchLogo.svg" className={styles.searchLogo} />
      <input
        type="text"
        ref={theInput}
        onKeyPress={handleKeyPress}
        className={styles.input}
        placeholder="Search Company Name"
      ></input>
    </form>
  );
}
