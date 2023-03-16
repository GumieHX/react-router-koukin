// import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useNavigate, useParams, useLocation, Navigate, useResolvedPath, useMatch,   } from "./react-router-dom-kk"
import { AuthProvider, useAuth } from "./react-router-dom-kk/auth"
import { lazy, Suspense } from 'react';
// import { Navigate } from "react-router-dom"

// import About from React.lazy(import) './pages/About';
const About = lazy(() => import('./pages/About'));

function App() {

  return (
    <div className="App">
      <AuthProvider>
      <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='product' element={<Product />} >
                <Route path=':id' element={<ProductDetail />} />
              </Route>
              <Route path='/user' element={
                <RequiredAuth>
                  <User />
                </RequiredAuth>
              } />
              <Route path='/login' element={<Login />} />
              <Route path='/about' element={
              <Suspense fallback={<h1>Loading...</h1>}>
                <About />
              </Suspense>} />
              <Route path='*' element={<NoMatch />} />
            </Route>
          </Routes>
      </Router>
      </AuthProvider>
    </div>
  )
}

const CustomerLink = ({ to, ...rest }) => {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });

  return <Link to={to} {...rest} styles={{ color: match ? 'red' : 'black' }} />
}

const Layout = () => {
  return (
    <div>
      <CustomerLink to="/">首页</CustomerLink>
      <CustomerLink to="/product">商品</CustomerLink>
      <CustomerLink to="/user">用户中心</CustomerLink>
      <CustomerLink to="/login">登录</CustomerLink>
      <CustomerLink to="/about">关于</CustomerLink>
      <Outlet />
    </div>
  )
}

const Home = () => {
  return (
    <div>
      Home
    </div>
  )
}

const Product = () => {
  return (
    <div>
      Product
      <CustomerLink to="/product/123">商品</CustomerLink>
      <Outlet />
    </div>
  )
}

const ProductDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div>
      <b>ProductDetail</b>
      <p>{params.id}</p>
      <button onClick={() => { navigate('/') }}>go home</button>
    </div>
  )
}

const User = () => {

  const auth = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h1>User</h1>
      <p>{auth.user.newUser}</p>
      <button onClick={() => { auth.signout(() => { navigate('/') }) }}>退出登录</button>
    </div>
  )
}

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || '/';

  const submit = (e) => {
    const formData = new FormData(e.currentTarget);
    const newUser = formData.get('username');

    auth.signin({ newUser }, () => {
      navigate(from, { replace: true });
    })
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <input type="text" name="username" />
        <button type="submit" >login</button>
      </form>
    </div>
  )
}

const NoMatch = () => {
  return (
    <div>404</div>
  )
}

const RequiredAuth = ({ children }) => {
  
  const auth = useAuth();
  const location = useLocation();
  if(!auth.user){
    return <Navigate to={'/login'} state={{from: location}} replace={true} />
  }

  return children;
}

export default App
