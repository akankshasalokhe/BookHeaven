import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';

import Home from './assets/Home';
import Navbar from './assets/components/Navbar';
import Footer from './assets/components/Footer';
import AllBooks from './assets/AllBooks';
import Login from './assets/Login';
import SignUp from './assets/SignUp';
import Cart from './assets/Cart';
import Profile from './assets/Profile';
import ViewBookDetails from './assets/components/ViewBookDetails';
import Favourites from './assets/components/Profile/Favourites';
import UserOrderHistory from './assets/components/Profile/UserOrderHistory';
import Setting from './assets/components/Profile/Setting';
import AllOrders from './assets/AllOrders';
import AddBook from './assets/AddBook';
import UpdateBook from './assets/updateBook';

function App() {
  // const dispatch = useDispatch();
  const role =  useSelector((state)=>state.auth.role) 

  // useEffect(() => {
  //   const id = localStorage.getItem('id');
  //   const token = localStorage.getItem('token');
  //   const role = localStorage.getItem('role');

  //   if (id && token && role) {
  //     dispatch(authActions.login());
  //     dispatch(authActions.changeRole(role));
  //   }
  // }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/allBooks" element={<AllBooks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          {role === 0 ? (
            <Route index element={<Favourites />} />
          ) :(
          <Route index element={<AllOrders />}/>
          )}
          {role === 1 && <Route path="/profile/AddBook" element={<AddBook />} />
        }
          <Route path="/profile/orderHistory" element={<UserOrderHistory />} />
          <Route path="/profile/settings" element={<Setting />} />
        </Route>
        <Route path="updateBook/:id" element={<UpdateBook />} />

        <Route path="ViewBookDetails/:id" element={<ViewBookDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
