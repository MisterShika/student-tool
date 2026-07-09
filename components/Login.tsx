"use client";

import { useEffect, useState } from "react";
import LoginConfirmPopup from "@/components/popups/LoginConfirmPopup";

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
    <div>
      <select
        value={selectedStudent?.id ?? ""}
        onChange={(e) => {
          const student = students.find(
            (s) => s.id === Number(e.target.value)
          );

          setSelectedStudent(student ?? null);
        }}
      >
        <option value="">私は...</option>

        {students.map((student) => (
          <option key={student.id} value={student.id}>
            {student.firstName} {student.lastName}
          </option>
        ))}
      </select>

      <span>
        {selectedStudent
          ? `私は${selectedStudent.firstName} ${selectedStudent.lastName}です！`
          : ""}
      </span>
      {selectedStudent && (
        <button onClick={() => displayLoginConfirmPopup()}>ログイン</button>
      )}

      {showLoginConfirmPopup && selectedStudent && (
        <LoginConfirmPopup
          student={selectedStudent}
          onClose={hideLoginConfirmPopup}
        />
      )}
    </div>
  );
}