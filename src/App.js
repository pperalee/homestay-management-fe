import logo from "./logo.svg";
import "./App.css";

import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from "./screens/Login";
import Home from "./screens/Home";
import NotFound from "./screens/NotFound/NotFound";
import CreateHomestay from "./screens/ManageHomestay/CreateHomestay/CreateHomestay";
import HomestayPage from "./screens/ManageHomestay/HomestayPage";
import NavTop from "./layout/components/NavTop";
import HomestayListings from "./screens/ManageHomestay/HomestayListings";
import EditService from "./screens/ManageService/EditService";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import EditHomestay from "./screens/ManageHomestay/EditHomestay";
import BookingForm from "./screens/Booking/CreateBooking/BookingForm";
import BookingList from "./screens/Booking/BookingList";
import EditBooking from "./screens/Booking/EditBooking";
import Statistics from "./screens/Statistics";
import YourBooking from "./screens/Booking/YourBooking";
import Discount from "./screens/Discount";
import Notification from "./screens/Notification";
import ChatPage from "./screens/Chat/ChatPage";
import Chat from "./screens/Chat";
import NavBottom from "./layout/components/NavBottom";
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavTop />
        <Routes>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="notifications" element={<Notification />} />
          <Route path="chats" element={<Chat />} />
          <Route path="chats/:id" element={<ChatPage />} />
          <Route path="homestays" element={<HomestayListings />} />
          <Route path="homestays/create" element={<CreateHomestay />} />
          <Route path="homestays/:id" element={<HomestayPage />} />
          <Route path="homestays/:id/edit" element={<EditHomestay />} />
          <Route path="homestays/:id/statistics" element={<Statistics />} />
          <Route path="services/:id/edit" element={<EditService />} />
          <Route path="bookings/:homestayId/create" element={<BookingForm />} />
          <Route path="bookings/:homestayId" element={<BookingList />} />
          <Route path="bookings/:id/edit" element={<EditBooking />} />
          <Route path="bookings/your-bookings" element={<YourBooking />} />
          <Route path="discounts" element={<Discount />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default App;
