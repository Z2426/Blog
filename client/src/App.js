import './App.css';
import {
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom'
import {ToastContainer, Zoom, Slide, Bounce, Flip} from 'react-toastify';

import BlogDetail from './pages/BlogDetail';
import BlogList from './pages/BlogList';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewBlog from './pages/NewBlog';
import PrivateRoute from './pages/PrivateRoute';
import ShowBlog from './pages/ShowBlog'
import ManageBlog from './pages/MangeBlog'
function transitionAnimation () {
    const list = [Zoom, Slide, Bounce, Flip];
    return list[Math.floor(Math.random() * list.length)];
}

function transitionPosition () {
    const list = ['top-right', 'top-center', 'top-left']
    return list[Math.floor(Math.random() * list.length)];
}

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                      {/*Guest */}
                      <Route path="/blogs/guest/show/:id" element={<ShowBlog />} />
                      {/* admin */}
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={<PrivateRoute />} >
                        <Route path="/profile" element={<Profile />} />
                    </Route>
                    <Route path="/manage-posts" element={<PrivateRoute />} >
                        <Route path="/manage-posts" element={<ManageBlog />} />
                    </Route>
                    <Route path="/blogs" element={<PrivateRoute />} >
                        <Route path="/blogs" element={<BlogList />} />
                    </Route>
                    <Route path="/newblog" element={<PrivateRoute />} >
                        <Route path="/newblog" element={<NewBlog />} />
                    </Route>
                    <Route path="/blogs/:id" element={<PrivateRoute />} >
                        <Route path="/blogs/:id" element={<BlogDetail />} />
                    </Route>
                    <Route path="/newblog" element={<PrivateRoute />} >
                        <Route path="/newblog" element={<NewBlog />} />
                    </Route>
                </Routes>
            </Router>

            <ToastContainer
                position={transitionPosition()} autoClose={2000}
                hideProgressBar={false} newestOnTop closeOnClick
                rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover
                transition={transitionAnimation()}
            />
        </div>
    );
}
export default App;
