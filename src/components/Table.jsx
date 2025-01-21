import { useEffect, useState } from 'react'
import axios from 'axios';
import '../styles/table.css';
import { useNavigate } from 'react-router-dom';

const Table = () => {
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            try {
                const result = await axios.get("http://localhost:8080/api/expenses/");
                const data = result.data;
                setExpenses([...data]);
            } catch (error) {
                console.error("Error fetching expenses:", error);
            }
        }

        fetchData();
    }, []);

     // Handle delete button click
     const handleDeleteClick = async (id) => {
        try {
            // Send DELETE request to the backend
            await axios.delete(`http://localhost:8080/api/expenses/${id}`);
            // Remove the deleted expense from the state
            setExpenses(expenses.filter((expense) => expense.id !== id));
            console.log(`Expense with id ${id} deleted successfully.`);
        } catch (error) {
            console.error("Error deleting expense:", error);
        }
    };
    
  return (
    <div >
        <button id='addExpense' onClick={() => navigate('/expense/new')}>New Expense</button>

        <div className='container'>
            <table id="expenseTable">
            <thead>
                <tr>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody id="expenseTableBody">
                        {expenses.map((expense,index) => (
                            <tr key={index}>
                                <td>{expense.category}</td>
                                <td>{expense.date}</td>
                                <td>{expense.amount}</td>
                                <td>{expense.description}</td>
                                <td className='del_up'><span className='delete' onClick={() => handleDeleteClick(expense.id)}>Delete</span>
                                    <span className='update' onClick={() => navigate(`/expense/update/${expense.id}`)}>Update</span>
                                </td>
                        
                            </tr>
                        ))}
            </tbody>
        </table>
        </div>
    <div id="showAllExpenses">All Expenses...</div>
    </div>
  )
}

export default Table