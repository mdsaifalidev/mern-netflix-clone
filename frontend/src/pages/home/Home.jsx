import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";
import useAuthStore from "../../store/authUser";

const Home = () => {
  const user = useAuthStore((state) => state.user);

  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default Home;
