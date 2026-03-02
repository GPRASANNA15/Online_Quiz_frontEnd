import { useEffect, useState } from "react";
import { deleteQuestion, editQuestion, getQuestionByQuizId } from "../Services/QuestionService";
import { generateResult } from "../Services/ResultService";

import { useSelector } from "react-redux";

function Quiz(props) {
    let quizid = props.quizId;
    const role=useSelector((state)=>state.user.role);
    const [quiz, setQuiz] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");
    const [answers, setAnswers] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const[score,setScore]=useState(0.0);
    const[result,setResult]=useState(false);
    const userId=useSelector(state=>state.user.id);
    useEffect(() => {
        async function fetchQuiz() {
            const res = await getQuestionByQuizId(quizid);
            console.log(res);
            setQuiz(res.data);
        }
        fetchQuiz();

    }, []);
    const [questionId, setQuestionId] = useState(0);
    const[quizId,setQuizId]=useState(0);
    const [updateData, setUpdateData] = useState({
        quizId: 0,
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctOption: ""
    });


    function handleSave(id) {
    if (!selectedValue) {
        alert("Make a choice");
        return;
    }

    setAnswers(prev => {
        const existingIndex = prev.findIndex(a => a.questionId === id);
        if (existingIndex !== -1) {
          
            const updated = [...prev];
            updated[existingIndex].option = selectedValue;
            return updated;
        } else {
            
            return [...prev, { questionId: id, option: selectedValue }];
        }
    });

    alert("Saved");
}
    async function handleSubmit() {
        const data = {
            totalAnswers: answers,
            quizId: quizid,
            userId: userId
        }
        const res = await generateResult(data);
        setScore(res.data);
        setResult(true);
        console.log(res);
    }
    async function handleDeleteQuestion(id) {
        try {
            const res = await deleteQuestion(id);
            alert("Question deleted successfully");
        }
        catch (err) {
            alert("error in deleting question");
        }
    }


    function handleChange(e) {
        const { name, value } = e.target;
        setUpdateData((prev) => ({
            ...prev,
            [name]: value
        }));

    }
    function handleUpdate(id,quizId) {
        setIsUpdate(true);
        setQuestionId(id);
        setQuizId(quizId);
    }

    async function handleEdit() {
        try {
          
            const data={...updateData,quizId:quizId};
            console.log(data);
            const res = await editQuestion(questionId, data);
            console.log(res);
            alert("Updated successfully");
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <>

            <form id="quizForm">
                {quiz.map((quiz) => (
                    <div class="question-box">
                        <h3>Question:{quiz.id}</h3>
                        <p>{quiz.question}</p>

                        <label><input type="radio" name="q1" value={quiz.option1} onChange={(e) => { setSelectedValue(e.target.value) }} />{quiz.option1}</label><br />
                        <label> <input type="radio" name="q1" value={quiz.option2} onChange={(e) => { setSelectedValue(e.target.value) }} />{quiz.option2}</label> <br />
                        <label><input type="radio" name="q1" value={quiz.option3} onChange={(e) => setSelectedValue(e.target.value)} />{quiz.option3}</label> <br />
                        <label><input type="radio" name="q1" value={quiz.option4} onChange={(e) => setSelectedValue(e.target.value)} />{quiz.option4} </label><br /><br />

                        <button type="button" class="save-btn" onClick={() => handleSave(quiz.id)}>Save</button>
                        {role==="ADMIN" &&(
                        <>
                        <button type="button" className="btn btn-danger" onClick={() => handleDeleteQuestion(quiz.id)}>Delete</button>
                        <button type="button" className="btn btn-secondary" onClick={() => handleUpdate(quiz.id,quiz.quizId)}>Update</button>
                        </>
                        )}
                    </div>
                ))}

                <hr />

                <div class="bottom-buttons">
                    <button type="button" id="submitBtn" onClick={handleSubmit}>Submit</button>
                   
                </div>

            </form>
            {isUpdate && (
                <form>
                    <div class="mb-3">
                        <label class="form-label fw-bold">Question</label>
                        <input
                            className="form-control"
                            name="question"
                            rows="3"
                            value={updateData.question}
                            onChange={handleChange}
                            placeholder="Enter your question here" />

                    </div>

                    <div class="mb-3">
                        <label class="form-label fw-bold">Option 1</label>
                        <input
                            type="text"
                            className="form-control"
                            name="option1"
                            value={updateData.option1}
                            onChange={handleChange}
                            placeholder="Enter option 1" />
                    </div>


                    <div class="mb-3">
                        <label class="form-label fw-bold">Option 2</label>
                        <input
                            type="text"
                            className="form-control"
                            name="option2"
                            value={updateData.option2}
                            onChange={handleChange}
                            placeholder="Enter option 2" />
                    </div>


                    <div class="mb-3">
                        <label class="form-label fw-bold">Option 3</label>
                        <input
                            type="text"
                            className="form-control"
                            name="option3"
                            value={updateData.option3}
                            onChange={handleChange}
                            placeholder="Enter option 3" />
                    </div>


                    <div class="mb-3">
                        <label class="form-label fw-bold">Option 4</label>
                        <input
                            type="text"
                            className="form-control"
                            name="option4"
                            value={updateData.option4}
                            onChange={handleChange}
                            placeholder="Enter option 4" />
                    </div>


                    <div class="mb-4">
                        <label class="form-label fw-bold">Correct Answer</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={handleChange}
                            name="correctOption"
                            value={updateData.correctOption}
                            placeholder="Enter correct answer" />
                    </div>

                    <button type="button" class="btn btn-primary" onClick={handleEdit}>
                        Save Question
                    </button>

                </form>
            )}
            {result &&(
                <div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow-sm">
                    <div class="card-header bg-primary text-white text-center">
                        <h3>Quiz Result</h3>
                    </div>
                    <div class="card-body">
                        
                        <p><strong>Score:</strong>{score.finalScore}</p>
                        <p><strong>Status:</strong> <span class="badge bg-success">{(score.finalScore>50)?"passed":"failed"}</span></p>
                       

                        <div class="mt-4 text-center">
                            <a href="/home" class="btn btn-secondary">Go Home</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
            )}

        </>
    )
}
export default Quiz;