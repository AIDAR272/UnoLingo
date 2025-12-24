import { useState, useEffect, useCallback } from "react";
import "../styles/Train.css";

const API_BASE_URL = "http://127.0.0.1:8000";

function Train() {
    const [wordData, setWordData] = useState({ word: "", translation: "" });
    const [userInput, setUserInput] = useState("");
    const [score, setScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [feedback, setFeedback] = useState({ message: "", isError: false });

    const userId = localStorage.getItem("id");

    const fetchScore = useCallback(async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/score?user_id=${userId}`);
            if (response.ok) {
                const data = await response.json();
                setScore(data);
            }
        } catch (error) { console.error(error); }
    }, [userId]);

    const fetchNextWord = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/word?user_id=${userId}`);
            const data = await response.json();
            setWordData({ word: data.word, translation: data.translation });
            setUserInput("");
        } catch (error) {
            setFeedback({ message: "Error loading word.", isError: true });
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        if (userId) {
            fetchScore();
            fetchNextWord();
        }
    }, [userId, fetchScore, fetchNextWord]);

    const handleSubmit = async (e) => {
        e?.preventDefault();
        const isCorrect = userInput.trim().toLowerCase() === wordData.translation.toLowerCase();

        if (isCorrect) {
            setFeedback({ message: "Correct!", isError: false });
            await fetch(`${API_BASE_URL}/score?user_id=${userId}`, { method: "PUT" });
            setScore(prev => prev + 1);
        } else {
            setFeedback({ message: `Wrong! Answer: ${wordData.translation}`, isError: true });
        }
        fetchNextWord();
    };

    return (
        <div className="train-container">
            {/* Score is now fixed to the page corner */}
            <div className="score-badge">
                Score: <span>{score}</span>
            </div>

            <form className="train-card" onSubmit={handleSubmit}>
                {feedback.message && (
                    <div className={`feedback-text ${feedback.isError ? "error" : "success"}`}>
                        {feedback.message}
                    </div>
                )}

                <div className="input-row">
                    {/* Changed from h1 to div to style it as a box */}
                    <div className="word-box">{wordData.word}</div>

                    <input
                        className="main-input"
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Type here..."
                        autoFocus
                    />
                </div>

                <button className="submit-button" type="submit" disabled={isLoading}>
                    {isLoading ? "Loading..." : "Check Answer"}
                </button>
            </form>
        </div>
    );
}

export default Train;