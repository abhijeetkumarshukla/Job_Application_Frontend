"use client"
 
import { useEffect, useState } from "react";
import { FiUser, FiSearch } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";

const JobCard = ({ job }) => (
  <div className={`p-4 rounded-xl shadow-md dark:bg-blue-400 dark:text-white bg-blue-100 w-full` }>
    <h3 className="text-lg font-semibold">{job.title}</h3>
    <p className="text-gray-600 my-2">{job.location}</p>
    <p className="text-gray-600">Job Type: {job.jobType}</p>
    <p className="text-sm text-gray-500">⭐ 4</p>
    
    <div className="flex flex-wrap gap-2 mt-2">
      {job.skills.map((t, index) => (
        <span key={index} className="bg-yellow-200 px-2 py-1 rounded-full dark:text-black text-xs">{t}</span>
      ))}
    </div>
    <p className="text-xl font-bold mt-3">{job.salary}</p>
    <button className="mt-3 bg-black text-white px-4 py-2 rounded-lg">Details</button>
  </div>
);

export default function JobDashboard() {
  const [jobs,setJobs] = useState([]);
  const [search,setSearch] = useState("")
  const [showJobs,setShowJobs] = useState([]);
  const router = useRouter()
  const [jobTypeFilter, setJobtypeFilter] = useState("")
  const createJobNaviagation = ()=>{

    router.push("/job/create")

  }

  const serachFunc = (e) => {
    const searchTerm = e.target.value.toLowerCase(); // To make it case-insensitive
    setSearch(searchTerm);
  
    if (searchTerm !== "") {
      const filtered = jobs.filter((job) => {
        const titleMatch = job.title.toLowerCase().includes(searchTerm);
        const skillsMatch = job.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm)
        );
        return titleMatch || skillsMatch;
      });
      setShowJobs(filtered); // Update the filtered jobs based on the search term
    } else {
      setShowJobs(jobs); // If search is empty, reset the filtered jobs
    }
    setJobtypeFilter("")
  };
  
  const getAllJobs = async () =>{
    try {
        const res = await axios.get("/api/jobs");

        console.log("res=> ", res.data)
        setJobs(res.data.data)
        setShowJobs(res.data.data)
    } catch (error) {
        console.log(error)
    } 
  }

  const filterByJobType = (e, value)=>{
    console.log(e.target.checked, value)
    if(e.target.checked){

      setShowJobs(jobs.filter((el)=>el.jobType === value))
      setJobtypeFilter(value)
    }

    if(value===""){
      setShowJobs(jobs)
    }
    setSearch("")
  }


  useEffect(()=>{
    getAllJobs()
  },[])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Eclipse</h1>
        <div className="hidden bg-white rounded-lg md:flex items-center px-3 space-x-4">
          <input 
            type="text" 
            placeholder="Search..." 
            className="p-2 rounded-lg outline-none text-black bg-transparent"
            onChange={serachFunc}
            value={search}
          />
          <FiSearch size={24} className="text-black" />
        </div>
        <ThemeToggle />

      </header>
      <div className="flex bg-black w-full justify-center text-white p-4 md:hidden items-center space-x-4">
          <input 
            type="text" 
            placeholder="Search..." 
            onChange={serachFunc}
            value={search}
            className="p-2 rounded-lg text-black"
          />
          <FiSearch size={24} />
        </div>
      
      <div className="dark:bg-slate-800 dark:text-white flex md:flex-row flex-col flex-1">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-1/4 p-5 border-r dark:bg-slate-900 dark:text-white border-gray-200 bg-gray-100">
          <div className="bg-black text-white p-4 rounded-lg flex flex-col items-center">
            <FiUser size={40} />
            <p className="mt-2">Want to hire?</p>
            <button onClick={createJobNaviagation}  className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg">Create Jobs +</button>
          </div>
          <h2 className="mt-6 text-lg font-semibold">Filters</h2>

          <div className="mt-4">
            <label className="block dark:text-gray-200 text-gray-700 font-semibold">Job Type</label>
            <div className="flex flex-col mt-2 space-y-1">
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={jobTypeFilter===""} className="form-checkbox"onChange={(e)=>filterByJobType(e, "")} />
                <span>All</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={jobTypeFilter==="Full-time"} className="form-checkbox"onChange={(e)=>filterByJobType(e, "Full-time")} />
                <span>Full-time</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={jobTypeFilter==="Part-time"} className="form-checkbox" onChange={(e)=>filterByJobType(e, "Part-time")} />
                <span>Part-time</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={jobTypeFilter==="Remote"} className="form-checkbox" onChange={(e)=>filterByJobType(e, "Remote")} />
                <span>Remote</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={jobTypeFilter==="Hybrid"} className="form-checkbox" onChange={(e)=>filterByJobType(e, "Hybrid")} />
                <span>Hybrid</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={jobTypeFilter==="Internship"} className="form-checkbox" onChange={(e)=>filterByJobType(e, "Internship")} />
                <span>Internship</span>
              </label>
            </div>
          </div>
        </aside>
        
        {/* Job Listings */}
        <main className="w-full md:w-3/4 p-5">
          <h1 className="text-2xl font-bold">Recommended Jobs <span className="text-gray-500">({showJobs.length})</span></h1>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {showJobs?.map((job, index) => (
              <JobCard key={index} job={job} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
