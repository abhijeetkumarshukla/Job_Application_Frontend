import { connectDB } from "@/lib/db";
import JobModel from "@/Models/job.model";
import  {NextResponse } from "next/server";


export async function GET(req, { params }) {
    try {
        await connectDB();
        const resolvedParams = await params;
        const jobId = resolvedParams.id;
        const job = await JobModel.findById(jobId);
        if (!job) {
            return NextResponse.json({ success: false, message: "Job not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Job details fetched successfully" , data:job}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error }, { status: 500 });
    }
}

export async function PUT(req,  { params }) {
    try {
        await connectDB();
        const resolvedParams = await params;
        const jobId = resolvedParams.id;
        const body = await req.json();
        const updatedJob = await JobModel.findByIdAndUpdate(jobId, body);

        if (!updatedJob) {
            return NextResponse.json({ success: false, message: "Job not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, job: updatedJob }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error }, { status: 500 });
    }
}


export async function DELETE(req,  { params }) {
    try {
        await connectDB();
        const resolvedParams = await params;
        const jobId = resolvedParams.id;
        const deletedJob = await JobModel.findByIdAndDelete(jobId);
        if (!deletedJob) {
            return NextResponse.json({ success: false, message: "Job not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, message: "Job deleted successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: error }, { status: 500 });
    }
}