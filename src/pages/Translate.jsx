import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Translate.css";

function Translate() {
    const navigate = useNavigate();

    const [sourceText, setSourceText] = useState("");
    const [translatedText, setTranslatedText] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function handleLogout() {
        navigate("/");
    }

    function handleTrainClick() {
        const token = localStorage.getItem("token");
        if(token) navigate("/train");
        else {
            navigate("/login");
            alert("Please log in first!");
        }
    }

    async function handleFavoriteClick() {
        const userId = localStorage.getItem("id");
        if(!userId) {
            alert("Please log in first!");
            return;
        }

        const url = `http://127.0.0.1:8000/word?user_id=${encodeURIComponent(userId)}&word=${encodeURIComponent(sourceText)}&translation=${encodeURIComponent(translatedText)}`;
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });

            if(!response.ok) alert("Error adding word to favorites!");
            else {
                const data = response.json();
                console.log(data.message);
                setSourceText("")
                setTranslatedText("")
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Network error.");
        }
    }

    useEffect(() => {
        if (!sourceText.trim()) {
            setTranslatedText("");
            return;
        }

        const timeoutId = setTimeout(() => {
            fetchTranslation(sourceText);
        }, 800);

        return () => clearTimeout(timeoutId);

    }, [sourceText]);


    async function fetchTranslation(textToTranslate) {
        setIsLoading(true);
        try {
            const url = `http://127.0.0.1:8000/translate?word=${encodeURIComponent(textToTranslate)}`;

            const response = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });

            if (response.ok) {
                const data = await response.json();
                setTranslatedText(data.message);
            } else {
                console.error("Translation failed");
                setTranslatedText("Error translating text.");
            }
        } catch (error) {
            console.error("Error:", error);
            setTranslatedText("Network error.");
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="translate-page">
            <header className="app-header">
                <button className="logout-btn" onClick={handleLogout}>Log Out</button>
            </header>

            <main className="translate-container">

                <div className="language-bar">
                    <span className="lang-static" style={{fontWeight: "bold", color: "#1a73e8"}}>
                        English
                    </span>
                    <span style={{color: "#999"}}>→</span>
                    <span className="lang-static" style={{fontWeight: "bold", color: "#1a73e8"}}>
                        Russian
                    </span>
                </div>

                <div className="translation-box">
                    {/* Input Area */}
                    <div className="text-area-wrapper input-wrapper">
                        <textarea
                            placeholder="Enter text to translate..."
                            value={sourceText}
                            onChange={(e) => setSourceText(e.target.value)}
                            maxLength={5000}
                            autoFocus
                        ></textarea>

                        {sourceText && (
                            <button
                                className="clear-btn"
                                onClick={() => {
                                    setSourceText("");
                                    setTranslatedText("");
                                }}
                            >
                                ❌
                            </button>
                        )}
                    </div>

                    {/* Output Area */}
                    <div className="text-area-wrapper output-wrapper">
                        {isLoading ? (
                            <div className="loading-overlay" style={{color: "#888", fontStyle:"italic", fontSize: "1.5rem"}}>
                                ...
                            </div>
                        ) : (
                            <textarea
                                readOnly
                                value={translatedText}
                                placeholder="Перевод"
                            ></textarea>
                        )}
                    </div>
                </div>
            </main>
            <div className="footer-menu">
                <div className="menu-item" onClick={handleTrainClick}>
                    <img
                        src="/train.jpeg"
                        alt="Train"
                        className="menu-icon"
                    />
                    <p>Train</p>
                </div>

                <div className="menu-item" onClick={handleFavoriteClick}>
                    <img
                        src="/favorite.png"
                        alt="Favorite"
                        className="menu-icon"
                    />
                    <p>Favorite</p>
                </div>
            </div>
        </div>
    );
}

export default Translate;