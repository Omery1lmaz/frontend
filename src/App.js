import Layout from "./components/Layout/Layout";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetUserDetails } from "./store/authenticationSlices";

function App() {
  const dispatch = useDispatch();
  // const { user, isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.auth
  // );
  // let sayac = 0;
  // useEffect(() => {
  //   if (!user && sayac == 0) {
  //     dispatch(GetUserDetails());
  //     sayac++;
  //   }
  // }, []);
  return <Layout />;
}

export default App;
// set NODE_OPTIONS=--openssl-legacy-provider
