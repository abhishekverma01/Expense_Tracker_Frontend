import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AddExpense.css'; // Assume this file contains the necessary styles

const AddExpense = () => {
    const [category, setCategory] = useState('');
    // const [customCategory, setCustomCategory] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState({}); // To handle validation errors

    const validateForm = () => {
        let formErrors = {};
        if (!category ) formErrors.category = 'Category is required';
        if (!date) formErrors.date = 'Date is required';
        if (!amount || isNaN(amount)) formErrors.amount = 'Amount must be a valid number';
        if (!description) formErrors.description = 'Description is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Submit the form
            try{
                const response = await axios.post('http://localhost:8080/api/expenses',{category , date, amount, description });
                navigate('/');
                console.log(response);
            }catch(err){
                console.log(err);
            }
            console.log({ category, date, amount, description });
             // Reset custom category input
        }
    };

    return (
        <div className="form-container">
            <div className='addExpense'>Add New Expense</div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select a category</option>
                        <option value="Food">Food</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Bills">Bills</option>
                        {/* <option value="Custom">Custom</option> */}
                    </select>
                    {errors.category && <span className="error">{errors.category}</span>}
                    { (
                        <input
                            type="text"
                            placeholder="Enter custom category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    )}
                </div>

                <div className="form-group">
                    <label>Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                    {errors.date && <span className="error">{errors.date}</span>}
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                    {errors.amount && <span className="error">{errors.amount}</span>}
                </div>

                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    ></textarea>
                    {errors.description && <span className="error">{errors.description}</span>}
                </div>

                <button type="submit" className="submit-button">Add Expense</button>
            </form>
        </div>
    );
};

export default AddExpense;
