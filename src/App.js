import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import BooksList from "./container/BookList";
import BorrowHistoryList from "./container/BorrowHistoryList";
import StudentsList from "./container/StudentList";
import { AuthContext, useAuth } from "./auth/auth";

function App() {
  const { isLoggedIn, user, login, logout, role } = useAuth();
  return (<>
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, role}}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route>
            <Route path="/" element={<BooksList />} />
            <Route path="/students" element={<StudentsList />} />
            <Route path="/borrow-history" element={<BorrowHistoryList />} />
            {/* Add more routes as needed */}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  </>
  );
}

export default App;
