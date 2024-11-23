import React, { useState, useEffect } from "react";
import "./App.css";
import { TextField, Button, Typography, LinearProgress, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import axios from "axios";
import editimg from "./images/images.jpg";
import deleteimg from "./images/download.png";

const API_URL = "https://abcd-12.onrender.com/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", status: "pending", description: ""});
  const [editingId, setEditingId] = useState(null);

  // Fetch Tasks
  const fetchTasks = () => {
    axios.get(API_URL)
      .then(res => setTasks(res.data))
      .catch(error => console.error("Error while fetching Data : ", error))
  }
  useEffect(() => {
    fetchTasks();
  }, [])

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }


  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      axios.put(`${API_URL}/${editingId}`, form)
        .then(() => {
          setEditingId(null);
          fetchTasks();
        })
    }
    else {
      axios.post(`${API_URL}`, form)
        .then(() => fetchTasks());
    }
    setForm({ task: "", description: "", status: "" })
  }


  // Handle Edit
  const handleEdit = (task) => {
    setForm(task);
    setEditingId(task._id)
  }

  // Handle Delete
  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => fetchTasks());
  };

  return (
    <div class="container">
      <h2>To-Do Application</h2>

      {/* Form to Add/Edit Task */}
      <form class="form" onSubmit={handleSubmit}>
        <div>
          <TextField
            name="title"
            label="Task Title"
            value={form.title}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>
        <div>
          <TextField
            name="description"
            label="Task Description"
            value={form.description}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={form.status}
              onChange={handleChange}
              required
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button variant="contained" color="primary" type="submit">
          {editingId ? "Update" : "Add"}
        </Button>
      </form>

      {/* Display Tasks */}
      <div class="cards">
        {tasks.map((task) => (
          <div key={task._id}>
            <div class="card">
              <div>
                <Typography variant="h6">{task.title}</Typography>
                <Typography color={task.status === "Completed" ? "green" : "orange"} > Status: {task.status} </Typography>
                <LinearProgress variant="determinate" value={task.status === "Completed" ? 100 : task.status === "In Progress" ? 50 : 0} />
                <div class="action">
                  <img src={editimg} alt="Edit" onClick={() => handleEdit(task)} />
                  <img src={deleteimg} alt="Delete" onClick={() => handleDelete(task._id)} />
                </div>
              </div>
            </div>
          </div>
        ))
        }
      </div>
    </div >
  );
}

export default App;















// import React, { useState, useEffect } from "react";
// import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from "@mui/material";
// import axios from "axios";

// const API_URL = "http://localhost:5000/contacts";

// function App() {
//   const[contacts , setContacts] = useState([])
//   const [form, setForm] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//     company: "",
//     jobTitle: "",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [page, setPage] = useState(1);

//   const itemsPerPage = 5;

//   // Fetch Contacts
//   const fetchContacts = () => {
//     axios.get(API_URL)
//       .then((res) => setContacts(res.data))
//       .catch(error => console.error("Error to fetch Data : ", error))
//   }

//   useEffect(() => {
//     fetchContacts()
//   }, [])

//   // Handle Input Change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value })
//   }

//   // Handle Submit
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editingId) {
//       axios.put(`${API_URL}/${editingId}`, form)
//         .then(() => {
//           setEditingId(null)
//           fetchContacts()
//         })
//     }
//     else {
//       axios.post(API_URL, form)
//         .then(() => fetchContacts())
//     }
//     setForm({
//       firstName: "",
//       lastName: "",
//       email: "",
//       phone: "",
//       company: "",
//       jobTitle: "",
//     })
//   }

//   // Handle Edit
//   const handleEdit = (contact) => {
//     setForm(contact);
//     setEditingId(contact._id);
//   };

//   // Handle Delete
//   const handleDelete = (id) => {
//     axios.delete(`${API_URL}/${id}`)
//       .then(() => fetchContacts());
//   };

//   // Pagination Logic
//   const paginatedContacts = contacts.slice(
//     (page - 1) * itemsPerPage,
//     page * itemsPerPage
//   );

//   return (
//     <Container>
//       <h1>Contact Management</h1>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           name="firstName"
//           label="FirstName"
//           value={form.firstName}
//           onChange={handleChange}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <TextField
//           name="lastName"
//           label="LastName"
//           value={form.lastName}
//           onChange={handleChange}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <TextField
//           name="email"
//           label="E-mail"
//           value={form.email}
//           onChange={handleChange}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <TextField
//           name="phone"
//           label="Phone Number"
//           value={form.phone}
//           onChange={handleChange}
//           fullWidth
//           required
//           margin="normal"
//         />
//         <TextField
//           name="company"
//           label="Company"
//           value={form.company}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           name="jobTitle"
//           label="Job Title"
//           value={form.jobTitle}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//         />
//         <Button variant="contained" color="primary" type="submit">
//           {editingId ? "Update Contact" : "Add Contact"}
//         </Button>
//       </form>

//       <TableContainer component={Paper} style={{ marginTop: 20 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>First Name</TableCell>
//               <TableCell>Last Name</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Company</TableCell>
//               <TableCell>Job Title</TableCell>
//               <TableCell>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedContacts.map((contact) => (
//               <TableRow key={contact._id}>
//                 <TableCell>{contact.firstName}</TableCell>
//                 <TableCell>{contact.lastName}</TableCell>
//                 <TableCell>{contact.email}</TableCell>
//                 <TableCell>{contact.phone}</TableCell>
//                 <TableCell>{contact.company}</TableCell>
//                 <TableCell>{contact.jobTitle}</TableCell>
//                 <TableCell>
//                   <Button onClick={() => handleEdit(contact)}>Edit</Button>
//                   <Button
//                     onClick={() => handleDelete(contact._id)}
//                     color="error"
//                   >
//                     Delete
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Pagination
//         count={Math.ceil(contacts.length / itemsPerPage)}
//         page={page}
//         onChange={(e, value) => setPage(value)}
//         style={{ marginTop: 20 }}
//       />
//     </Container>
//   );
// }

// export default App;
