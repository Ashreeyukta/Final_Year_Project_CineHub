import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/home/home-page";
import { HomepageLayout } from "./pages/home/layout/homepage-layout";
import { Login } from "./pages/home/components/login.component"
import { MovieDetail } from "./pages/home/moviedetail.page";
import { BookTicket } from "./pages/home/components/book-ticket.component";
import { LoggedInUser } from "./pages/home/loggedin-user.page";
import { Register } from "./pages/home/components/register.component";
import { CustomerDashboard } from "./pages/home/components/customer-dashboard.component";
import { NowShowing } from "./pages/home/components/now-showing.component";
import { Upcoming } from "./pages/home/components/upcoming.component";
import { MyTickets } from "./pages/home/components/my-tickets-list.component";
import { MyOrders } from "./pages/home/components/my-orders-list.component";
import { MyPayments } from "./pages/home/components/my-payments-list.component";
import { UserLists } from "./pages/admin/components/userlists";

import { AdminRoutes, PrivateRoute } from "./routes/router.js";
import { AdminLayout } from "./pages/admin/layout/admin-layout.page";
import { AdminDashboard } from "./pages/admin/components/admin-dashboard";
import { AdminLogin } from "./pages/admin/components/admin-login";
import { getToken } from "./helpers/utilities";
import { AdminMovieAdd } from "./pages/admin/components/admin-add-movie";
import MovieUpdate from "./pages/admin/components/admin-update-movie";
import { FoodOrders } from "./pages/admin/components/food-order";
import { AdminMovies } from "./pages/admin/components/admin-movie";

export function App() {
    let token = getToken();
    return (<>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomepageLayout />}>
                    <Route index element={<HomePage />}></Route>
                    <Route path="login" element={<Login />}></Route>
                    <Route path="register" element={<Register />}></Route>
                    <Route path="detail/:id" element={<MovieDetail />}></Route>

                    <Route path="now-showing" element={<NowShowing />}></Route>
                    <Route path="coming-soon" element={<Upcoming />}></Route>
                </Route>

                {/* Logged in user/customer routes */}
                <Route element={<PrivateRoute component={<LoggedInUser />}></PrivateRoute>}>
                    <Route path="book-ticket/:showId/:showTimeId" element={<BookTicket />}></Route>
                    <Route path="/dashboard" element={<CustomerDashboard />}></Route>
                    <Route path="/my-tickets" element={<MyTickets />}></Route>
                    <Route path="/my-orders" element={<MyOrders />}></Route>
                    <Route path="/my-payments" element={<MyPayments />}></Route>
                </Route>

                <Route path="/admin/login" element={<AdminLogin />}></Route>

                {/* Logged in Admin routes */}
                <Route path="/admin" element={<AdminRoutes component={<AdminLayout />}></AdminRoutes>}>
                    <Route index element={<AdminDashboard />}></Route>
                    <Route path="add-movie" element={<AdminMovieAdd />}></Route>
                    <Route path="movie-detail/:id" element={<MovieDetail />}></Route>
                    <Route path="movie-update/:id" element={<MovieUpdate />}></Route>
                    <Route path="food-request" element={<FoodOrders />}></Route>
                    <Route path="movie-request" element={<AdminMovies />}></Route>
                    <Route path="users" element={<UserLists />}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    </>)
}