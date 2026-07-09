"use client";

import { useEffect, useState } from "react";
import LoginConfirmPopup from "@/components/popups/LoginConfirmPopup";
import "@/app/globals.css";

type Student = {
  id: number;
  firstName: string;
  lastName: string;
  birthday: string;
};

export default function Login() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showLoginConfirmPopup, setShowLoginConfirmPopup] = useState(false);

  useEffect(() => {
    async function getStudents() {
      try {
        const res = await fetch("http://localhost:3000/api/allStudents");

        if (!res.ok) {
          throw new Error("Failed to fetch students");
        }

        const data = await res.json();
        setStudents(data);
      } catch (err) {
        console.error(err);
      }
    }

    getStudents();
  }, []);

  const displayLoginConfirmPopup = () => {
    setShowLoginConfirmPopup(true);
  }

  const hideLoginConfirmPopup = () => {
    setShowLoginConfirmPopup(false);
  }

  return (
    <div className="mt-12">
      <div className="text-center">
        <select
          value={selectedStudent?.id ?? ""}
          onChange={(e) => {
            const student = students.find(
              (s) => s.id === Number(e.target.value)
            );

            setSelectedStudent(student ?? null);
          }}
          className="text-2xl font-[Arial] border-2 border-gray-300 rounded-md p-2"
        >
          <option value="">私は...</option>

          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.firstName} {student.lastName}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 text-4xl font-[Arial] text-center">
        {selectedStudent ? (
          <>
            私は
            <span className="font-black animate-color-cycle">
              {selectedStudent.firstName}{selectedStudent.lastName}
            </span>
            です！
          </>
        ) : (
          ""
        )}
      </div>

      <div className="mt-4 text-center">
        {selectedStudent && (
          <button onClick={() => displayLoginConfirmPopup()} className="mt-6 text-2xl bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 cursor-pointer transition duration-300 font-[Arial] ">
            ログイン
          </button>
        )}
      </div>

      {showLoginConfirmPopup && selectedStudent && (
        <LoginConfirmPopup
          student={selectedStudent}
          onClose={hideLoginConfirmPopup}
        />
      )}
    </div>
  );
}