import { useState } from "react";
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

    async function handleTranslate() {
        if (!sourceText.trim()) return;

        setIsLoading(true);
        try {
            const url = `http://127.0.0.1:8000/translate?word=${encodeURIComponent(sourceText)}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response.ok) {
                const data = await response.json();
                // Backend returns: { "message": "Translated text" }
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

    // --- RENDER ---
    return (
        <div className="translate-page">
            {/* Header */}
            <header className="app-header">
                <button className="logout-btn" onClick={handleLogout}>Log Out</button>
            </header>

            {/* Main Card */}
            <main className="translate-container">

                {/* Static Language Labels (Visual Only) */}
                <div className="language-bar">
                    <span className="lang-static" style={{fontWeight: "bold", color: "#1a73e8"}}>
                        English
                    </span>

                    <span className="lang-static" style={{fontWeight: "bold", color: "#1a73e8"}}>
                        Russian
                    </span>
                </div>

                {/* Text Areas */}
                <div className="translation-box">
                    {/* Input Area */}
                    <div className="text-area-wrapper input-wrapper">
                        <textarea
                            placeholder="Enter text to translate..."
                            value={sourceText}
                            onChange={(e) => setSourceText(e.target.value)}
                            maxLength={5000}
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
                            <div className="loading-overlay">Translating...</div>
                        ) : (
                            <textarea
                                readOnly
                                value={translatedText}
                                placeholder="Перевод"
                            ></textarea>
                        )}
                    </div>
                </div>

                {/* Translate Button */}
                <div className="action-area">
                    <button className="translate-btn" onClick={handleTranslate} disabled={isLoading}>
                        {isLoading ? "Translating..." : "Translate"}
                    </button>
                </div>

            </main>
        </div>
    );
}

export default Translate;