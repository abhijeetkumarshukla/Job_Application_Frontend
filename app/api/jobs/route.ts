import { connectDB } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import JobModel from "@/Models/job.model"

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const {title, description, location ,company,jobType,salaryRange,experienceLevel,skills,status} = body
        const arrayOfSkills = skills.split(",")
        await JobModel.create({
            title, description, location ,company,jobType,salaryRange,experienceLevel,skills:arrayOfSkills,status
        });
        return NextResponse.json({ success: true,  message:"Job Created Successfully!"  }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error }, { status: 500 });
    }
}


export async function GET() {
    try {
        await connectDB();
        const jobs = await JobModel.find();
        return NextResponse.json({ success: true,data:jobs}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error }, { status: 500 });
    }
}

