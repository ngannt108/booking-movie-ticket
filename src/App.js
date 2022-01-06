import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import SignInPage from "./pages/sign-in/SignInPage";
import SignUpPage from "./pages/sign-up/SignUpPage";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import GuardAdminPage from "./HOC/GuardAdminPage";
import GuardBooking from "./HOC/GuardBooking";
import AdminPage from "./pages/admin/AdminPage";
import { ToastContainer } from "react-toastify";
import ProfilePage from "./pages/profile-user/ProfilePage";
import MovieDetailPage from "./pages/movie-detail/MovieDetailPage";
import BookingPage from "./pages/booking/BookingPage";
import NotFound from "./components/404NotFound";
import { useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import ChangeTicketBookingPage from "./pages/booking/ChangeTicketBookingPage";
// import { SendMail } from "./pages/booking/SendMail";
function App() {
  let date = new Date();
  let getDay = date.getDay();

  useEffect(async () => {
    const res = axios({
      url: `https://api-booking-movie-ticket.herokuapp.com/user/reminderEmail`,
      method: "GET",
    });
  }, [getDay]);

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/:biDanh/booking/:showTimeCode" exact={true}>
            <GuardBooking>
              <BookingPage />
            </GuardBooking>
          </Route>
          <Route
            path="/:biDanh/changeBooking/:IDticket/:showTimeCode"
            exact={true}
          >
            <GuardBooking>
              <ChangeTicketBookingPage />
            </GuardBooking>
          </Route>
          <Route path="/sign-in" exact={true}>
            <SignInPage />
          </Route>

          <Route path="/sign-up" exact={true}>
            <SignUpPage />
          </Route>

          <Route path="/profile" exact={true}>
            <GuardBooking>
              <ProfilePage />
            </GuardBooking>
          </Route>

          <Route path="/forgot-password" exact={true}>
            <ForgotPassword />
          </Route>
          <Route path="/movie-detail/:biDanh" exact={true}>
            <MovieDetailPage />
          </Route>
          <Route path="/admin" exact={true}>
            <GuardAdminPage>
              <AdminPage />
            </GuardAdminPage>
          </Route>
          <Route path="/" exact={true}>
            <HomePage />
          </Route>

          {/* <Route path="/sendmail" exact={true}>
            <SendMail />
          </Route> */}
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
