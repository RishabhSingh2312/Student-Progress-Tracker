import React, { useState, useEffect } from "react";
import { API_ENDPOINT } from "../constants";
import { useNavigate } from "react-router-dom";

function TeacherAuth() {
  const [rollNumber, setRollNumber] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const [allClassData, setAllClassData] = useState([]);
  const navigate = useNavigate();

  //get all class from database
  useEffect(() => {
    const getAllClasses = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}class/get-all-class`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        });

        const classes = await response.json();

        if (classes) setAllClassData(classes);
      } catch (error) {
        console.error(error);
      }
    };

    getAllClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_ENDPOINT}student/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rollNumber, studentClass }),
      });

      if (!response.ok) {
        alert("Login Failed");
        return;
      }

      const data = await response.json();
      alert(data.message);

      navigate(`/student-profile/${data.student._id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen min-h-screen flex justify-center items-center flex-col p-3 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <form
        onSubmit={handleSubmit}
        className="w-[90%] md:w-1/2 lg:w-1/3 p-4 text-white bg-pBlue rounded-lg flex flex-col gap-4"
      >
        <label htmlFor="rollNumber">Roll No</label>
        <input
          type="number"
          name="rollNumber"
          value={rollNumber}
          onChange={(e) => {
            setRollNumber(e.target.value);
          }}
          required
          className="w-full p-2 rounded-lg mt-2 text-black"
        />
        <label htmlFor="studentClass">Class:</label>
        <select
          className="text-black p-2 rounded-md"
          id="studentClass"
          value={studentClass}
          onChange={(e) => setStudentClass(e.target.value)}
          required
        >
          <option value="">-</option>
          {allClassData.map((classData) => {
            return (
              <option key={classData._id}>
                {classData.className}-{classData.year}-{classData.sem}
              </option>
            );
          })}
        </select>
        <button type="submit" className="text-lg">
          Log in
        </button>
      </form>
    </div>
  );
}

export default TeacherAuth;
