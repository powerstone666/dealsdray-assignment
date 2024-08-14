import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import useMediaQuery from '../useMedia';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Navbar({ setIsAuthenticated, namee, isAuthenticated }) {
    const isAbovescreen = useMediaQuery('(min-width:768px)');
    const [isMenuToggled, setIsMenuToggled] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        setName(localStorage.getItem("namee"));
    }, []);

    const logout = async () => {
        try {
            await axios.post("http://localhost:3000/logout", { withCredentials: true });
            localStorage.setItem("isAuthenticated", false);
            setIsAuthenticated(false);
            window.location.reload();
        } catch (error) {
            console.error("Error logging out:", error);
            localStorage.setItem("isAuthenticated", false);
            setIsAuthenticated(false);
        }
    };

    return (
        <nav className="h-18 border border-b-4 flex gap-8 justify-between items-center">
            <div className='flex items-center justify-center '>
                <img src={logo} alt="logo" className="h-20 w-20" />
                <h1 className='text-xl text-red-800 ml-4 font-bold'>DealsDray</h1>
            </div>

            {isAuthenticated && isAbovescreen ? (
                <>
                    <div className='flex items-center justify-center '>
                        <ul className="flex gap-24 ml-16 font-bold text-xl">
                            <Link to="/"><li>Home</li></Link>
                            <Link to="/employeeList"><li>Employee List</li></Link>
                        </ul>
                    </div>
                    <div>
                        <ul className="flex gap-24 mr-8 font-bold text-xl">
                            <li>{name}</li>
                            <li onClick={logout} className="hover:cursor-pointer text-black">Logout</li>
                        </ul>
                    </div>
                </>
            ) : isAuthenticated && (
                <>
                    <div className='p-4'>
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/10336/10336994.png"
                            className='h-10 w-10'
                            onClick={() => { setIsMenuToggled(true); }}
                        />
                    </div>

                    {isMenuToggled && (
                        <div className='w-5/6 bg-white h-screen right-0 bottom-0 fixed z-40'>
                            <div className='flex flex-col mt-24'>
                                <div className='flex justify-end mr-8'>
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/128/4034/4034637.png"
                                        className='h-10 w-10'
                                        onClick={() => { setIsMenuToggled(false); }}
                                    />
                                </div>
                                <ul className='p-4 mt-4 text-red-800'>
                                    <Link to="/"><li className='p-4 text-xl font-bold'>Home</li></Link>
                                    <Link to="employeeList"><li className='p-4 text-xl font-bold'>Employee List</li></Link>
                                    <li className='p-4 text-xl font-bold'>{name}</li>
                                    <li className='p-4 text-xl font-bold' onClick={logout}>Logout</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </>
            )}
        </nav>
    );
}
