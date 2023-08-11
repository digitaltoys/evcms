import Layout from "../../../components/layouts/layout";
import { Uselist } from "../../../components/user/uselist";

const UselistPage = () => {
  return <Uselist />;
};

UselistPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default UselistPage;
