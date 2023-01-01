import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import HomeScreen from "./pages/HomeScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import PostsScreen from "./pages/PostsScreen";
import SearchScreen from "./pages/SearchScreen";
import ProfileScreen from "./pages/ProfileScreen";
import SettingsScreen from "./pages/SettingsScreen";
import AdminScreen from "./pages/AdminScreen";
import AddPostScreen from "./pages/AddPostScreen";
import UpdateScreen from "./pages/UpdateScreen";
import LikedPostScreen from "./pages/LikedPostScreen";

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <ToastContainer
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route exact path="/login" element={<LoginScreen />} />
          <Route exact path="/register" element={<RegisterScreen />} />
          <Route exact path="/search" element={<SearchScreen />} />
          <Route exact path="/profile/:username" element={<ProfileScreen />} />
          <Route exact path="/profile/:username/posts" element={<PostsScreen />} />
          <Route exact path="/posts" element={<PostsScreen/>} />
          <Route exact path="/settings" element={<SettingsScreen />} />
          <Route exact path="/addpost" element={<AddPostScreen />} />
          <Route exact path="/updateUser" element={<UpdateScreen />} />
          <Route exact path="/likedPost" element={<LikedPostScreen />} />
          <Route exact path="/admin" element={<AdminScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
