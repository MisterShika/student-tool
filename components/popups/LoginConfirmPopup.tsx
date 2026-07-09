import { useState } from "react";
import "@/app/globals.css";

type Student = {
  id: number;
  firstName: string;
  lastName: string;
  birthday: string;
};

type LoginConfirmPopupProps = {
  student: Student;
  onClose: () => void;
};

export default function LoginConfirmPopup({
  student,
  onClose,
}: LoginConfirmPopupProps) {
  const [inputMonth, setInputMonth] = useState("");
  const [inputDay, setInputDay] = useState("");

  const handleLogin = () => {
    if (!inputMonth || !inputDay) {
      alert("お誕生日をえらんでね！");
      return;
    }

    const birthday = new Date(student.birthday);

    const correctMonth = birthday.getUTCMonth() + 1; // JS months are 0-11
    const correctDay = birthday.getUTCDate();

    if (
      Number(inputMonth) === correctMonth &&
      Number(inputDay) === correctDay
    ) {
      alert("Success");
      onClose();
    } else {
      alert("Failure");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/90 z-50">
        <div className="bg-white p-8 rounded-lg text-center">
        <h2 className="text-4xl font-bold mb-4 font-[Arial]">
            <span className="animate-color-cycle font-bold">{student.lastName} {student.firstName}</span>さんの誕生日はいつですか？
        </h2>

        <p>{student.birthday}</p>

        <div className="flex space-x-4 justify-center">
            <select
                value={inputMonth}
                onChange={(e) => setInputMonth(e.target.value)}
                className="text-2xl font-[Arial] border-2 border-gray-300 rounded-md p-2"
            >
                <option value="">月</option>
                {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                    {i + 1}月
                </option>
                ))}
            </select>

            <select
                value={inputDay}
                onChange={(e) => setInputDay(e.target.value)}
                className="text-2xl font-[Arial] border-2 border-gray-300 rounded-md p-2"
            >
                <option value="">日</option>
                {Array.from({ length: 31 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                    {i + 1}日
                </option>
                ))}
            </select>
        </div>

        <div className="mt-10 space-x-10">
            <button 
                onClick={handleLogin}
                className="min-w-[100px] bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 cursor-pointer transition duration-300 font-[Arial]"
            >
                行こう！
            </button>
            <button 
                onClick={onClose}
                className="min-w-[100px] bg-red-300 text-gray-700 py-2 px-4 rounded-md hover:bg-red-400 cursor-pointer transition duration-300 font-[Arial]"
            >
                もどる！
            </button>
        </div>
        </div>
    </div>
  );
}