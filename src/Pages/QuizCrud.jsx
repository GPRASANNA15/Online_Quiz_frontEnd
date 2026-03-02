import { useState } from "react";
import { createQuestion } from "../Services/QuestionService";
import { addQuiz } from "../Services/QuizService";

function QuizCrud(){
    const[quizId,setQuizId]=useState(0);
    const[question,setQuestion]=useState("");
    const[option1,setOption1]=useState("");
    const[option2,setOption2]=useState("");
    const[option3,setOption3]=useState("");
    const[option4,setOption4]=useState("");
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");
    const[duration,setDuration]=useState(0);
    const[total,setTotal]=useState(0);
    const[correctOption,setCorrectOption]=useState("");

   async function handleQuiz(){
    const data={
        name:title,
        description:description,
        totalDuration:Number(duration),
        totalQuestions:Number(total)
    }
    try{
         const res=await addQuiz(data);
        alert("Quiz created");
         console.log(res);
         setTitle("");
         
    }
    catch(err)
    {
        alert("error in saving quiz");
    }
         
    }
    async function handleAdd()
    {
        const data={
        quizId:quizId,
        question:question,
        option1:option1,
        option2:option2,
        option3:option3,
        option4:option4,
        correctOption:correctOption
    }
    try{
    const res=await createQuestion(data);
    alert("Question added ")
    console.log(res);
    setQuestion("");
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");
        setCorrectOption("");
        setQuizId(0);
    }
    catch(err)
    {
        alert("error in creating the question, check the details");
        console.log(err);
    }

    }
return(
    <>
    <div className="card shadow mb-4">
        <div className="card-body">
            <h4 className="mb-3">Create Quiz</h4>

            <div className="mb-3">
                <label className="form-label">Quiz title</label>
                <input type="text" className="form-control" placeholder="Enter Quiz title" onChange={(e)=>setTitle(e.target.value)} />
            </div>
             <div className="mb-3">
                <label className="form-label">Quiz description</label>
                <input type="text" className="form-control" placeholder="Enter Quiz description"  onChange={(e)=>setDescription(e.target.value)}/>
            </div>
             <div className="mb-3">
                <label className="form-label">Quiz duration</label>
                <input type="text" className="form-control" placeholder="Enter Quiz duration"onChange={(e)=>setDuration(e.target.value)} />
            </div>
             <div className="mb-3">
                <label className="form-label">Quiz total questions</label>
                <input type="text" className="form-control" placeholder="Enter Quiz total questions" onChange={(e)=>setTotal(e.target.value)} />
            </div>

            <button className="btn btn-primary" onClick={handleQuiz}>
                Create Quiz
            </button>
        </div>
    </div>

    <div className="card shadow">
        <div className="card-body">
            <h4 className="mb-3" >Add Question</h4>
             
              <div className="mb-3">
                <label className="form-label">Quiz ID</label>
                <input type="text" className="form-control" placeholder="Enter Quiz ID"m onChange={(e)=>setQuizId(e.target.value)} />
            </div>

            <div className="mb-3">
                <lable className="form-label">Question(only 4 options allowed)</lable>
                <input type="text" className="form-control" placeholder="Enter Question" onChange={(e)=>setQuestion(e.target.value)} />
            </div>

            <div className="mb-3">
                <lable className="form-label">Option 1</lable>
                <input type="text" className="form-control" onChange={(e)=>setOption1(e.target.value)}/>
            </div>

            <div className="mb-3">
                <lable className="form-label">Option 2</lable>
                <input type="text" className="form-control" onChange={(e)=>setOption2(e.target.value)} />
            </div>

            <div className="mb-3">
                <lable className="form-label">Option 3</lable>
                <input type="text" className="form-control"  onChange={(e)=>setOption3(e.target.value)}/>
            </div>

            <div className="mb-3">
                <lable className="form-label">Option 4</lable>
                <input type="text" className="form-control" onChange={(e)=>setOption4(e.target.value)} />
            </div>

            <div className="mb-3">
                <lable className="form-label">Correct Answer</lable>
                <input type="text" className="form-control" placeholder="Enter correct option" onChange={(e)=>setCorrectOption(e.target.value)}/>
            </div>

            <button className="btn btn-success" onClick={handleAdd}>
                Add Question
            </button>
        </div>
    </div>

    </>
)
}
export default QuizCrud;