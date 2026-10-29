import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./pages/layout.css";

import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";


import Home from "./components/Home";
import NowShowing from "./components/NowShowing";
import ComingSoon from "./components/ComingSoon";
import Login from "./components/Login";
import { SignUp } from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Order from "./components/Order";
import MyOrder from "./components/MyOrder";
import BookMovie from "./components/BookMovie";
import BookSeat from "./components/BookSeat";
import MovieDetail from "./components/MovieDetail";
import FoodOrder from "./components/FoodOrder";
import User from "./components/User";
import SingleOrder from "./components/SingleOrder";
import AdminMovie from "./components/AdminMovie";
import AdminDashboard from "./components/AdminDashboard"
import MovieOrder from "./components/MovieOrder"
import MovieUpdate from "./components/MovieUpdate"
import MovieAdd from "./components/MovieAdd"
import { Headers } from "./pages/partials/header";
import { AdminLayout } from "./pages/admin/admin-layout.pages";
import AdminLogin from "./pages/admin/admin-login.component";


function getToken() {
  const tokenString = sessionStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  return userToken?.token;
}


function setToken(userToken) {
  sessionStorage.setItem("token", JSON.stringify(userToken));
}


function AdminRoutes({component}) {
  let token = getToken();
  return token && token == 'admin' ? component : <Navigate to="/admin"></Navigate>
}

function App (){
  const token = getToken();
  return (
    <BrowserRouter>
      {/* <Headers setToken={token}></Headers> */}
      
      <Routes>
        <Route path="/coming-soon"    element={<ComingSoon />} />
        <Route path="/now-showing"    element={<NowShowing />} />
        <Route path="/"               element={<Home />} />
        <Route path="/login"          element={<Login setToken={setToken} />} />
        <Route path="/register"       element={<SignUp />} />
        <Route path="/movie/:showId"  component={MovieDetail} />
        <Route path="/about">About</Route>
        
        <Route path="/admin" element={<AdminRoutes component={<AdminLayout />}></AdminRoutes>}>
            

            <Route index element={<AdminLogin  />}></Route>
            
            <Route path="dashboard" element={<AdminDashboard />}></Route>
            <Route path="food-request" render={() => { return <FoodOrder />; }} />
            <Route path="movie-request" render={() => { return <MovieOrder />; }} />
            <Route path="users" render={() => { return <User />; }} />
            <Route path="movie" render={() => { return <AdminMovie />; }} />
            <Route path="person-order/:orderId" component={SingleOrder} />
            <Route path="movie-detail/:showId" component={MovieDetail} />
            <Route path="movie-update/:movieId" component={MovieUpdate} />
            <Route path="add-movie" component={MovieAdd} />
            <Route path="*">Page Not Found</Route>
        </Route>
        {
            token && !(token === "admin") ? (
              <>
                
                <Route path="/login" render={() => { return <Navigate to="/dashboard" /> }} />
                <Route path="/dashboard" render={() => { return <Dashboard />; }} />
                <Route path="/order" render={() => { return <Order />; }} />
                <Route path="/my-order" render={() => { return <MyOrder />; }} />
                <Route path="/book-movie" render={() => { return <BookMovie />; }} />
                <Route path="/movie/:showId" component={BookSeat} />
                <Route path="*">Page Not Found</Route>
              </>
            ) : (
              <>
                
              </>
            )
          
        }
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
export default App;
