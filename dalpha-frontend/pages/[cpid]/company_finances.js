import { useRouter } from "next/router";
import Dashboard from "../../components/DashboardTemplate";
import FinanceComponent from "../../components/finance/FinanceComponent";

export default function Company_Finance(props) {
  const router = useRouter();
  const q_cpid = router.query.cpid;
  const { cpid, cpname, financeData, link } = props;
  return (
    <Dashboard
      cpid={cpid}
      cpname={cpname}
      activeMenu={"company_finances"}
      link={link}
    >
      <FinanceComponent cpid={cpid} cpname={cpname} financeData={financeData} />
    </Dashboard>
  );
}

export async function getServerSideProps(context) {
  let { params, query } = context;
  let cpid = params.cpid;
  let cpname = query.cpname;
  console.log(cpid, cpname);
  let financeData = {};
  const response = await fetch(
    `https://dalpha-server-inter-iit.herokuapp.com/api/v1/financials?id=${cpid}`
  );
  let dataurl = await fetch(
    `https://dalpha-server-inter-iit.herokuapp.com/api/v1/download.csv?id=${cpid}`
  );
  const data = await response.json();
  return {
    props: {
      cpid: cpid,
      cpname: cpname,
      financeData: data,
      link: dataurl.url,
    },
  };
}
