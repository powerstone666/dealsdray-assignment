import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { Avatar } from '@mui/material'
import axios from 'axios'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import User from '../../../../dbms-front/src/user';

export default function Update() {
    const { id } = useParams();
    const [users,setUsers]=useState({
        name:'',
        email:'',
        no:'',
        designation:'',
        course:'',
        gender:''
    });
    const [designation, setDesignation] = useState(''); // Step 1: Define a state variable
    const [rad,setRad]=useState('')
    const [gen, setGen] = useState('')


    const setName=(e)=>{
        setUsers({...users,[e.target.name]: e.target.value})
    }
    useEffect(() => {
        axios.get(`http://localhost:3000/user/${id}`, { withCredentials: true })
            .then((res) => {
                const data = res.data;
                setUsers({
                    name: data[0].f_name,
                    email: data[0].f_email,
                    no: data[0].f_mobile,
                    designation: data[0].f_designation,
                    course: data[0].f_course,
                    gender: data[0].f_gender
                });
                 // Log the fetched data
            })
            .catch(err => console.log(err));
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
      
    
        try {
            const res = await axios.put(`http://localhost:3000/edit/${id}`, users, {
                withCredentials: true,
            });
            window.alert("Updated Sucessfully")
        } catch (err) {
            console.log("Error:", err);
            window.alert("Something went wrong")
        }
    

    };
    
    return (
        <div>
             <div className="h-12 bg-gray-400 flex justify-between p-4 items-center">
             <h1 className=" font-bold md:text-2xl">Employee List</h1>
             </div>
             <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         <img src="https://cdn-icons-png.flaticon.com/128/9069/9069049.png"  className="mx-auto h-12 w-auto"/>
          
          <input type="file" className="mt-10 text-center text-md font-bold leading-9 tracking-tight text-gray-900"/><span>Due Time Constriants as exams were clashing i was unable to complete image other all work is done</span>
           
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={(e=>handleSubmit(e))} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                                    autoComplete="text"
                                    value={users.name}
                  onChange={(e)=>{setName(e)}}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                                    type="email"
                                    value={users.email}
                  required
                  autoComplete="email"
                  onChange={(e)=>setName(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="mobileno" className="block text-sm font-medium leading-6 text-gray-900">
                Mobile Number
              </label>
              <div className="mt-2">
                <input
                  id="no"
                  name="no"
                                    type="number"
                                    value={users.no}
                  onChange={(e)=>setName(e)}
                  required
                  autoComplete="number"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="designation" className="block text-sm font-medium leading-6 text-gray-900">
                Designation
              </label>
              <div className="mt-2">
                <select
                  id="designation"
                                    name="designation"
                                    value={users.designation} // Step 3: Bind the select's value to the state
                  onChange={(e)=>setName(e)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    <option>Select</option>
                    <option value="hr" onClick={()=>setDesignation("hr")}>HR</option>
                    <option value="manager" onClick={()=>setDesignation("manager")}>Manager</option>
                    <option value="sales" onClick={()=>setDesignation("sales")}>Sales</option>
                  
                    </select>
              </div>
            </div>
            <div>
              <label htmlFor="course" className="block text-sm font-medium leading-6 text-gray-900">
                Course
              </label>
              <div className="mt-2">
              <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"

                                    value={users.course}
        name="course"
        onChange={(e)=>setName(e)}
      >
        <FormControlLabel value="mca" onClick={()=>setRad("mca")} control={<Radio />} label="MCA" />
        <FormControlLabel value="bca"onClick={()=>setRad("bca")} control={<Radio />} label="BCA" />
        <FormControlLabel value="bsc" onClick={()=>setRad("bsc")} control={<Radio />} label="BSC" />
     
      </RadioGroup>
                </div>
              <label htmlFor="Gender" className="block text-sm font-medium leading-6 text-gray-900">
               Gender
              </label>
              <div className="mt-2">
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"

                                    value={users.gender}
        name="gender"
        onChange={(e)=>setName(e)}
      >
        <FormControlLabel value="male" onClick={()=>setGen("male")} control={<Radio />} label="Male" />
        <FormControlLabel value="female"onClick={()=>setGen("female")} control={<Radio />} label="Female" />
        <FormControlLabel value="other" onClick={()=>setGen("other")} control={<Radio />} label="Other" />
    
      </RadioGroup>
              </div>
            </div>
          
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Update
              </button>
            </div>
          </form>

        </div>
      </div>
        
        </div>
    )
}