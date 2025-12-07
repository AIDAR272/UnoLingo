import {useState} from "react";


function Translate() {
    const [word, setWord] = useState("")
    const [data, setData] = useState("")
    async function translate() {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/word?word=${encodeURIComponent(
                    word
                )}&target_language=${encodeURIComponent("ru")}`
            );
            const data = await response.json();
            console.log(data);
            setData(data.message)
        } catch (error) {
            console.error("Error fetching translation:", error);
        }
    }

    function handleInput(event) {
        setWord(event.target.value)
    }

    return (
        <div>
            <h1>Hello from translate page</h1>
            <input onChange={handleInput}></input>
            <button onClick={translate}>Translate</button>
            <p>{data}</p>
        </div>
    )
}

export default Translate
