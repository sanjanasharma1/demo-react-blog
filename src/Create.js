import { useState } from "react";
import { useHistory } from "react-router";

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('mario');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, body, author};

        setIsSubmitted(true);

        fetch('http://localhost:8000/blogs/', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(blog)
        })
        .then(()=>{
            setIsSubmitted(false);
            history.push('/');
        })
    }

    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog title:</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange = {(e) => {setTitle(e.target.value)}}
                />

                <label>Blog body:</label>
                <textarea 
                    required
                    value={body}
                    onChange = {(e) => {setBody(e.target.value)}}
                ></textarea>

                <label>Blog author:</label>
                <select
                    value={author}
                    onChange = {(e) => {setAuthor(e.target.value)}}
                >
                    <option value="mario">Mario</option>
                    <option value="yoshi">Yoshi</option>
                    <option value="ryu">Ryu</option>
                    <option value="bob">Bob</option>
                </select>

                {!isSubmitted && <button>Add Blog</button>}
                {isSubmitted && <button disabled>Adding Blog...</button>}
            </form>
        </div>
    );
}
 
export default Create;