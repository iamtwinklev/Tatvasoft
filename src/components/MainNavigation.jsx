import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/login/index'
import Register from '../pages/Register'
import { RoutePaths } from '../utils/enum'
import BookListing from '../pages/book-listing/index'
import { useAuthContext } from '../context/auth'
import Book from '../pages/book/index'
import EditBook from '../pages/book/editBook/index'
import User from '../pages/user'
import EditUser from '../pages/user/editUser'
import UpdateProfile from '../pages/update-profile'
import Category from '../pages/category'
import EditCategory from '../pages/category/editCategory'
import AddCategory from '../pages/category/addCategory'
import AddBook from '../pages/book/addBook'
import Cart from '../pages/cart'

const MainNavigation = () => {
  const authContext = useAuthContext();
  const Redirect = <Navigate to={RoutePaths.Login} />;
  return (
    <Routes>
      <Route exact path={RoutePaths.Login} element={<Login />} />
      <Route exact path={RoutePaths.Register} element={!authContext.user.id ? <Register /> : Redirect} />
      <Route exact path={RoutePaths.BookListing} element={authContext.user.id ? <BookListing /> : Redirect} />
      <Route exact path={RoutePaths.Book} element={authContext.user.id ? <Book /> : Redirect} />
      {/* <Route exact path={RoutePaths.BookEdit} element={<BookEdit />} /> */}
      <Route
        exact
        path={RoutePaths.EditBook}
        element={authContext.user.id ? <EditBook /> : Redirect}
      />
      <Route exact path={RoutePaths.User} element={authContext.user.id ? <User /> : Redirect} />
      <Route
        exact
        path={RoutePaths.UpdateProfile}
        element={authContext.user.id ? <UpdateProfile /> : Redirect}
      />
      <Route exact path={RoutePaths.EditUser} element={authContext.user.id ? <EditUser /> : Redirect} />


      <Route
        exact
        path={RoutePaths.User}
        element={authContext.user.id ? <User /> : Redirect}
      />
      <Route
        exact
        path={RoutePaths.EditUser}
        element={authContext.user.id ? <EditUser /> : Redirect}
      />
      <Route
        exact
        path={RoutePaths.Category}
        element={authContext.user.id ? <Category /> : Redirect}
      />
      <Route
        exact
        path={RoutePaths.EditCategory}
        element={authContext.user.id ? <EditCategory /> : Redirect}
      />
      <Route
        exact
        path={RoutePaths.AddCategory}
        element={authContext.user.id ? <AddCategory /> : Redirect}
      />
      <Route
        exact
        path={RoutePaths.AddBook}
        element={authContext.user.id ? <AddBook /> : Redirect}
      />
      <Route
        exact
        path={RoutePaths.Cart}
        element={authContext.user.id ? <Cart /> : Redirect}
      />
    </Routes>

  )
}

export default MainNavigation
