import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Blogs from "./pages/Blogs";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";
import CreateBlog from "./pages/CreateBlog";
import SingleBlog from "./pages/SingleBlog";
import EditBlog from "./pages/EditBlog";

function App() {
  return (
    <>

      <Navbar />
      <div className="pt-16">

      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogs" element={<ProtectedRoute><Blogs /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/create-blog" element={<ProtectedRoute><CreateBlog /></ProtectedRoute>} />
        <Route path="/blogs/:id" element={<ProtectedRoute><SingleBlog /></ProtectedRoute>} />
        <Route path="/blogs/edit-blog/:id" element={<ProtectedRoute><EditBlog /></ProtectedRoute>} />

      </Routes>
    </>


  );
}

export default App;
