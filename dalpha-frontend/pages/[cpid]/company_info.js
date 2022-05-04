import { useRouter } from "next/router";
import Dashboard from "../../components/DashboardTemplate";
import InfoComponent from "../../components/info/InfoComponent";

export default function Company_Info(props) {
  const router = useRouter();
  const q_cpid = router.query.cpid;
  const { cpid, cpname, infoData, link } = props;

  console.log(cpid, cpname);
  console.log(infoData);
  console.log(link);

  return (
    <Dashboard
      cpid={cpid}
      cpname={cpname}
      activeMenu={"company_info"}
      link={link}
    >
      <InfoComponent cpid={cpid} cpname={cpname} infoData={infoData} />
    </Dashboard>
  );
}

export async function getServerSideProps(context) {
  let { params, query } = context;
  let cpid = params.cpid;
  let cpname = query.cpname;
  console.log(cpid, cpname);
  let data = await fetch(
    `https://dalpha-server-inter-iit.herokuapp.com/api/v1/download.csv?id=${cpid}`
  );
  let infoData = {};

  return {
    props: {
      cpid: cpid,
      cpname: cpname,
      infoData: infoData,
      link: data.url,
    },
  };
}
