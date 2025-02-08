import mongoose from "mongoose"; 

const JobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        company: { type: String, required: true },
        location: { type: String, required: true },
        jobType: { type: String, enum: ["Full-time", "Part-time", "Internship", "Remote", "Hybrid"], required: true },
        description: { type: String, required: true },
        salaryRange: { type: String }, 
        experienceLevel: { type: String, enum: ["Entry", "Mid", "Senior"], default: "Entry" },
        skills: { type: [String], default: [] },
        status: { type: String, enum: ["Open", "Closed"], default: "Open" }
      }
    
);

const JobModel = mongoose?.models?.Job || mongoose.model('Job', JobSchema);


export default JobModel