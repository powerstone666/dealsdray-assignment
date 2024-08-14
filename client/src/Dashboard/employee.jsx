import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link,useNavigate } from 'react-router-dom';
const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'mobile', headerName: 'Mobile', width: 150 },
  { field: 'designation', headerName: 'Designation', width: 180 },
  { field: 'course', headerName: 'Course', width: 150 },
  { field: 'gender', headerName: 'Gender', width: 120 },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params) => (
      <div>
        <IconButton color="primary" >
                <Link to={`/update/${params.row.id}`}>
                    <EditIcon />
                </Link>

        </IconButton>
        <IconButton color="secondary" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      </div>
    ),
  },
];
const handleDelete = async (id) => {
    // Add your delete functionality here
    try {
       
        const res = await axios.delete(`http://localhost:3000/delete/${id}`, { withCredentials: true })
        window.alert("Deleted Successfully")
        window.location.reload()
    }
    catch (err) {
        console.log(err)
        window.alert("Something went wrong")
    }
}


export default function Employee() {

  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/view', { withCredentials: true })
      .then(res => {
          // Transform the data if needed
          console.log(res)
        const transformedRows = res.data.map(item => ({
          id: item.f_id, // Ensure the id field is correctly set
          name: item.f_name,
          email: item.f_email,
          mobile: item.f_mobile,
          designation: item.f_designation,
          course: item.f_course,
          gender: item.f_gender,
        }));
        setRows(transformedRows);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = rows.filter(row =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.mobile.includes(searchQuery) ||
    row.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.gender.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  

  return (
    <div>
      <div className="h-12 bg-gray-400 flex justify-between p-4 items-center">
        <h1 className="font-bold md:text-2xl">Employee List</h1>
        <h1 className="font-bold md:text-2xl">Total Count: {filteredRows.length}</h1>
      </div>
      <div className="h-24 bg-gray-200 flex justify-between p-4">
        <div>
          <input
            type="text"
            placeholder="Search Employee"
            value={searchQuery}
            onChange={handleSearch}
            className="w-48 md:w-96 h-10 ml-4 mt-4 border-2 border-gray-400 rounded-md p-2"
          />
        </div>
              <div className="rounded-lg w-24 md:w-56">
                  <Link to="/add" > <button className="bg-red-500 h-10 mr-4 mt-4 rounded-lg text-sm md:w-56">Create Employee</button></Link>
        </div>
      </div>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
        />
      </div>
    </div>
  );
}
