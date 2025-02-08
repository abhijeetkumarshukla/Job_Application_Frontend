 "use client";

import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const jobTypes = ["Full-time", "Part-time", "Internship", "Remote", "Hybrid"];
const experienceLevels = ["Entry", "Mid", "Senior"];
const statuses = ["Open", "Closed"];

const JobForm = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter()

  return (
    <div className="max-w-md mx-auto p-4 shadow-lg rounded-lg border border-gray-300 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white transition-all duration-300">
     <Link href="/" className="underline text-blue-600 font-bold hover:no-underline">Back to home</Link>
      <h2 className="text-2xl font-bold text-center mb-3">Create Job</h2>

      <div>

      {message && (
  <p className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-600 bg-opacity-90 text-white p-3 rounded-md shadow-md z-50">
     {message}
  </p>
)}

{error && (
  <p className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-red-600 text-white p-3 rounded-md shadow-md z-50">
    {error}
  </p>
)}

      </div>
      <Formik
        initialValues={{
          title: "",
          company: "",
          location: "",
          jobType: "",
          description: "",
          salaryRange: "",
          experienceLevel: "Entry",
          skills: "",
          status: "Open",
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Required"),
          company: Yup.string().required("Required"),
          location: Yup.string().required("Required"),
          jobType: Yup.string().oneOf(jobTypes, "Invalid Job Type").required("Required"),
          description: Yup.string().required("Required"),
          salaryRange: Yup.string(),
          experienceLevel: Yup.string().oneOf(experienceLevels, "Invalid Level"),
          skills: Yup.string(),
          status: Yup.string().oneOf(statuses, "Invalid Status"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setMessage("");
          setError("");
          try {
            const response = await axios.post("/api/jobs", values);

            if (response.status === 201) {
              setMessage(response.data.message);
              
              router.push("/")
              resetForm();
            } else {
              setError("Something went wrong.");
            }
          } catch (err) {
            setError(err.response?.data?.message || "Server error");
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-2">
            <div>
              <label className="block font-medium text-white">Title</label>
              <Field name="title" className="input" />
              <ErrorMessage name="title" component="div" className="error" />
            </div>

            <div>
              <label className="block font-medium text-white">Company</label>
              <Field name="company" className="input" />
              <ErrorMessage name="company" component="div" className="error" />
            </div>

            <div>
              <label className="block font-medium text-white">Location</label>
              <Field name="location" className="input" />
              <ErrorMessage name="location" component="div" className="error" />
            </div>

            <div>
              <label className="block font-medium text-white">Job Type</label>
              <Field as="select" name="jobType" className="input">
                <option value="">Select</option>
                {jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="jobType" component="div" className="error" />
            </div>

            <div>
              <label className="block font-medium text-white">Description</label>
              <Field as="textarea" name="description" className="input h-16 resize-none" />
              <ErrorMessage name="description" component="div" className="error" />
            </div>

            <div>
              <label className="block font-medium text-white">Salary</label>
              <Field name="salaryRange" className="input" />
            </div>

            <div>
              <label className="block font-medium text-white">Experience</label>
              <Field as="select" name="experienceLevel" className="input">
                {experienceLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </Field>
            </div>

            <div>
              <label className="block font-medium text-white">Skills</label>
              <Field name="skills" className="input" placeholder="React, Node.js" />
            </div>

            <div>
              <label className="block font-medium text-white">Status</label>
              <Field as="select" name="status" className="input">
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </Field>
            </div>

            <button type="submit" disabled={isSubmitting} className="btn">
              {isSubmitting ? "Submitting..." : "Create Job"}
            </button>

           
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JobForm;
