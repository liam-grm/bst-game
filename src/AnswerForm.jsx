import { useState } from 'react';

function AnswerForm(){
    const [name, setName] = useState("");

    function handleChange(e){
        setName(e.target.value);
    }

    return(
        <form>
            <label> Enter your pokemon:
                <input
                    type="text" 
                    value = {name}
                    onChange={handleChange}
                />
            </label>
            <p> Current value: {name}</p>
        </form>
    )
}

export default AnswerForm