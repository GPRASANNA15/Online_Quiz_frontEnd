import { BrowserRouter,Routes,Route} from "react-router-dom";
import Admin from "../Pages/Admin";
import Login from "../Pages/Login";
import Participant from "../Pages/Particpant";
import Home from "../Pages/Home";
import QuizCrud from "../Pages/QuizCrud";
import Profile from "../Pages/Profile";
import Quiz from "../Pages/Quiz";
function AppRouter(){
    return(
        <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Admin/>}></Route>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/participant" element={<Participant/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/quizcrud" element={<QuizCrud/>}></Route>
          <Route path="/quiz" element={<Quiz/>}></Route>
        </Routes>
        </BrowserRouter>
    )
}
export default AppRouter;