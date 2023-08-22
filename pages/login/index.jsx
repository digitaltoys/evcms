import Layout from "../../components/layouts/layout";
import { Login } from "../../components/login";

const LoginPage = () => {
  return <Login />;
};

LoginPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default LoginPage;
