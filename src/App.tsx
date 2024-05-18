import React from 'react';
import './App.css';
import LandingPage from "./pages/LandingPage/LandingPage"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import GridFile from './components/GridFile';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<LandingPage name="bharath" />} />
        <Route path='/' element={<GridFile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;








// import React, { useState, useEffect } from 'react';
// function App() {
//   // Initialize state variables
//   const [todos, setTodos] = useState<any[]>([]); // To store the fetched to-do items
//   const [currentPage, setCurrentPage] = useState(1); // To track the current page
//   const itemsPerPage = 10; // Number of items to display per page
//   const [totalPages, setTotalPages] = useState(0); // To store the total number of pages
//   // useEffect to fetch to-do items based on the currentPage
//   useEffect(() => {
//     // Fetch data from the JSONPlaceholder API
//     fetch(`https://jsonplaceholder.typicode.com/todos?_page=${currentPage}&_limit=${itemsPerPage}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setTodos(data); // Update the todos state with the fetched data
//       });
//   }, [currentPage]); // This effect runs whenever currentPage changes
//   // useEffect to fetch the total number of todos and calculate total pages
//   useEffect(() => {
//     // Fetch the total number of todos from the API
//     fetch('https://jsonplaceholder.typicode.com/todos')
//       .then((response) => response.json())
//       .then((data) => {
//         // Calculate the total number of pages based on total todos and itemsPerPage
//         const totalPages = Math.ceil(data.length / itemsPerPage);
//         setTotalPages(totalPages); // Update the totalPages state
//       });
//   }, []); // This effect runs once when the component mounts
//   // Function to handle page changes
//   const handlePageChange = (newPage: number) => {
//     setCurrentPage(newPage); // Update the currentPage state to the new page
//   };
//   // Slice the todos array to display only items for the current page
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const visibleTodos = todos.slice(startIndex, endIndex);
//   return (
//     <div>
//       {/* Display the to-do list items for the current page */}
//       <ul>
//         {visibleTodos.map((todo) => (
//           <li key={todo.id}>{todo.title}</li>
//         ))}
//       </ul>
//       {/* Implement Pagination */}
//       <ul>
//         {Array.from({ length: totalPages }, (_, index) => (
//           <li
//             key={index}
//             onClick={() => handlePageChange(index + 1)}
//             style={{
//               cursor: 'pointer',  
//               fontWeight: currentPage === index + 1 ? 'bold' : 'normal',
//             }}
//           >
//             {index + 1}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// export default App;
