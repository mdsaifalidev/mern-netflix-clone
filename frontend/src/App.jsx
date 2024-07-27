import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAuthStore from "./store/authUser";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Watch from "./pages/Watch";
import SearchPage from "./pages/SearchPage";
import SearchHistory from "./pages/SearchHistory";
import NotFoundPage from "./pages/404";

const App = () => {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <Signup /> : <Navigate to={"/"} />}
        />
        <Route
          path="/watch/:id"
          element={!user ? <Navigate to={"/login"} /> : <Watch />}
        />
        <Route
          path="/search"
          element={!user ? <Navigate to={"/login"} /> : <SearchPage />}
        />
        <Route
          path="/history"
          element={!user ? <Navigate to={"/login"} /> : <SearchHistory />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
