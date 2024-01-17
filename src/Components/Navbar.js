import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import logo from './logo.jpeg'
// import Logo from './'
import {
    LayoutDashboard,
    MoveRight,
    MoveLeft,
    IndianRupee,
    Frown,

} from "lucide-react"

const navlink=[
    {
        name:"Dashboard",
        icon:LayoutDashboard,
        comp:"/"
        
    },
    {
        name:"Self Credit",
        icon:MoveRight,
       comp:"/Credit"
    },
    {
        name:"Self Debit",
        icon:MoveLeft,
        comp:"/Debit"
    },

    {
        name:"Online banking",
        icon:IndianRupee,
        comp:"/Netbanking",
    },
    {
        name:"Fraud Transactions",
        icon:Frown,
        comp:"/fraud",
    },
];
function Navbar() {
    const [activeindex,setactiveindex]=useState(0);
    
  return (
    
    <div className="px-10 py-12 flex flex-col  w-1/5   rounded-2xl  relative    bg-[#171717]  shadow-right       shadow-xl shadow-right shadow-slate-950 text-white ">
        <div className='logo-div flex space-x-3 items-center'>
            <img src={logo} className='w-[100px] h-[80px] rounded p-2'></img>
            
            <span className='text-2xl'>RPH</span>
        </div>
        <div className="mt-9 flex flex-col space-y-8"> 
            {navlink.map((item,index)=><div key={index} className={"flex space-x-3 p-2 rounded hover:text-xl transition  ease-linear duration-300 "+(activeindex===index? " text-white bg-blue-600 font-semibold text-xl rounded-lg":"")}
            onClick={()=>setactiveindex(index)}
            >
                     <item.icon/>
                <Link to={item?.comp}>{item?.name}</Link>
            </div>)}
        </div>
        
    </div>
    
  )
}

export default Navbar