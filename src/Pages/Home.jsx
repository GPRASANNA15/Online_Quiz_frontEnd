import { useEffect, useState } from "react";
import { deleteQuiz, getAllQuiz } from "../Services/QuizService";
import { Link, useNavigate } from "react-router-dom";
import Quiz from "./Quiz";
import { useSelector } from "react-redux";
function Home()
{
    const[isStarted,setIsStarted]=useState(false);
    const[isNotStarted,setIsNotStarted]=useState(true);
    const[quiz,setQuiz]=useState([]);
    const[selectedQuiz,setSelectedQuiz]=useState(0);
    const navigate=useNavigate();
    const role=useSelector(state=>state.user.role);
    console.log(role);
    
    useEffect(()=>{
        async function fetchQuiz()
        {
            const res=await getAllQuiz();
            console.log(res);
            setQuiz(res.data);
        }
        fetchQuiz();
    },[]);
    function handleLogOut(){
        localStorage.clear("role");
        localStorage.clear("userId");
        localStorage.clear("token");
        navigate("/");
    }
   function handleStart(id){
       setSelectedQuiz(id); 
    setIsNotStarted(false);
    setIsStarted(true);
   }
   async function handleDelete(id){
   
    try
    {
       const res=await deleteQuiz(id);
      alert("Deleted successfully");
    }
    catch(err){
      console.log(err);
    }
   }
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand fw-bold">Quiz App</span>

       
        <div className="ms-auto d-flex align-items-center gap-3">
          {role==="ADMIN" &&(
          <Link to="/QuizCrud" className="nav-link text-white">
            View Quiz
          </Link>
          )}

          <Link to="/profile">
            <img
              src="/src/assets/profile.jpg"
              alt="Profile"
              className="rounded-circle"
              width="40"
              height="40"
            />
          </Link>

          <button
            className="btn btn-danger btn-sm"
            onClick={handleLogOut}
          >
            Logout
          </button>
        </div>
      </nav>

     
      {isNotStarted && (
        <div className="container mt-4">
          {quiz.length>0?(
          <div className="row">
            {quiz.map((quiz) => (
              <div className="col-md-4 mb-4" key={quiz.id}>
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">{quiz.name}</h5>
                    <p className="card-text">{quiz.description}</p>
                    <p className="mb-1">
                      <strong>Duration:</strong> {quiz.totalDuration}mins
                    </p>
                    <p>
                      <strong>Questions:</strong> {quiz.totalQuestions}
                    </p>

                    <button
                      className="btn btn-primary w-100"
                      onClick={() => handleStart(quiz.id)}
                    >
                      Start Quiz
                    </button>
                    {role==="ADMIN" &&(
                     <button
                      className="btn btn-danger w-100"
                      onClick={() => handleDelete(quiz.id)}
                    >
                      Delete Quiz
                    </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          ):(
            <p align="center">No Quizzes Created</p>
          )}
        </div>
      )}
     {isStarted &&(
                <Quiz quizId={selectedQuiz}/>
            )}
        </>
    )
}
export default Home;