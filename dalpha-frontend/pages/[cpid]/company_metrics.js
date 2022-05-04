import { useRouter } from "next/router";
import Dashboard from "../../components/DashboardTemplate";
import MetricsComponent from "../../components/metrics/MetricsComponent";

export default function Company_Metrics(props) {
  const router = useRouter();
  const q_cpid = router.query.cpid;
  const { cpid, cpname, attributesData, link } = props;
  return (
    <Dashboard
      cpid={cpid}
      cpname={cpname}
      activeMenu={"company_metrics"}
      link={link}
    >
      <MetricsComponent
        cpid={cpid}
        cpname={cpname}
        attributesData={attributesData}
      />
    </Dashboard>
  );
}

export async function getServerSideProps(context) {
  let { params, query } = context;
  let cpid = params.cpid;
  let cpname = query.cpname;
  console.log(cpid, cpname);
  const attributes = [
    "returnonequity",
    "netinventory",
    "liabilities",
    "financialleverage",
    "operatingincome",
    "nonoperatingincomeexpense",
    "depreciation",
    "incometaxesextraordinaryitemsnoncontrollinginterest",
    "netincomeloss",
  ];
  let attributesData = {};
  for (let attrib of attributes) {
    // const response = await fetch(`https://dalpha-server.herokuapp.com/api/v1/${attrib}?id=${cpid}`);
    const response = await fetch(
      `https://dalpha-server-inter-iit.herokuapp.com/api/v1/${attrib}?id=${cpid}`
    );
    const data = await response.json();
    attributesData[attrib] = data;
  }
  let dataurl = await fetch(
    `https://dalpha-server-inter-iit.herokuapp.com/api/v1/download.csv?id=${cpid}`
  );

  return {
    props: {
      cpid: cpid,
      cpname: cpname,
      attributesData: attributesData,
      link: dataurl.url,
    },
  };
}
