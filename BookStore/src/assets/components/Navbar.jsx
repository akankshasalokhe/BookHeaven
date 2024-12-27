import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from 'react-redux';


function Navbar() {
    const links = [
        { title: "Home", link: "/" },
        // { title: "About Us", link: "/aboutUs" },
        { title: "All Books", link: "/allBooks" },
        { title: "Cart", link: "/cart" },
        { title: "Profile", link: "/profile" },
        { title: "Admin Profile", link: "/profile" },

    ];

    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn) 
    const role =  useSelector((state)=>state.auth.role) 
    if(isLoggedIn === false){
        links.splice(2,2)
    }
    if(isLoggedIn == true && role == 0){
        links.splice(4,1)
    }
    if(isLoggedIn == true && role == 1){
        links.splice(3,1)
    }
    const [MobileNav,setMobileNav] = useState("hidden")

    return (
        <>
            <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4  items-center justify-between ">
                <Link to='/' className=" flex items-center">
                    <img className="h-10 me-4" src="./img/book.png" alt="logo" /> {/* Add logo URL here */}
                    <h1 className="text-2xl font-semibold">BookHeaven</h1>
                </Link>
                <div className="nav-links-book block md:flex items-center gap-4">
                    <div className="hidden md:flex gap-4">
                        {links.map((item, i) => (
                            <Link to= {item.link}
                                key={i}
                                href={item.link}
                                className="text-white hover:text-blue-500 transition-all duration-300"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                    
                    {isLoggedIn === false &&
                        <div className="hidden md:flex gap-4">
                        <Link to='/login' className="px-2 py-1 border border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300">
                            LogIn
                        </Link>
                        <Link to='/register' className="px-2 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300">
                            SignUp
                        </Link>
                    </div>
                    }

                    <button className='block md:hidden text-white text-2xl hover:text-zinc-400'
                    onClick={()=>(MobileNav === 'hidden' ? setMobileNav("block") : setMobileNav("hidden"))}>
                        <GiHamburgerMenu />
                    </button>

                </div>
            </nav>
            
            <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}>
            {links.map((item, i) => (
                            <div className='flex items-center'>
                                {item.title === "Profile" || item.title === "Admin Profile" ? (
                                <Link to={item.link}
                                className="px-4 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                                key={i}>
                                    {item.title}{""}
                                </Link>) : ( 
                                    <Link to={item.link}
                                className='hover:text-blue-500 transition-all duration-300'
                                key={i}>
                                    {item.title}{""}
                                </Link>)} 
                            </div>   
                        ))}
                       {isLoggedIn === false &&(
                        <>
                            <Link to='/login' className={`${MobileNav} px-8 mb-8 mt-4 py-2 text-3xl font-semibold border border-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}>
                                LogIn
                            </Link>
                            <Link to='/signup' className={`${MobileNav} px-8 mb-8 py-2 text-3xl font-semibold  bg-blue-500 rounded text-white hover:bg-white hover:text-zinc-800 transition-all duration-300`}>
                                SignUp
                            </Link>
                        </>
                       )}
            </div>

        </>
    );
}

export default Navbar;

