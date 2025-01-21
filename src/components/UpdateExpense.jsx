import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../styles/UpdateExpense.css';

const UpdateExpense = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [expense, setExpense] = useState({});
    // const [isLoading, setIsLoading] = useState(true); 

    const fetchData = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/expenses/${params.id}`);
            // console.log(res.data);
            const [data] = res.data;
            // console.log(data);
            setExpense(data);
        } catch (err) {
            console.error("Error fetching expense data:", err);
        } 
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense((prevExpense) => ({
            ...prevExpense,
            [name]: value,
        }));
    };

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            console.log(expense);
            const res = await axios.patch(`http://localhost:8080/api/expenses/${params.id}`, expense);
            console.log('Expense updated successfully:', res.data);
        } catch (err) {
            console.error("Error updating expense:", err);
        }
        navigate('/');
    };

  

    return (
        <div className="form-container">
            <div className="updateExpense">Update Expense</div>
            <form>
                <div className="form-group">
                    <label>Category</label>
                    <input
                        name="category"
                        type="text"
                        value={expense.category || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input
                        name="date"
                        type="date"
                        value={expense.date || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Amount</label>
                    <input
                        name="amount"
                        type="number"
                        value={expense.amount || ''}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={expense.description || ''}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <button className="submit-button" onClick={(e) => handleClick(e)}>
                    Save
                </button>
            </form>
        </div>
    );
};

export default UpdateExpense;
