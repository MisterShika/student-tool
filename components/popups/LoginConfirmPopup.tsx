import { useState } from "react";

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
    <div>
      <h2>
        {student.lastName} {student.firstName}さんでログインするね！
      </h2>

      <p>お誕生日はいつですか？</p>
      <p>{student.birthday}</p>

      <select
        value={inputMonth}
        onChange={(e) => setInputMonth(e.target.value)}
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
      >
        <option value="">日</option>
        {Array.from({ length: 31 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}日
          </option>
        ))}
      </select>

      <div>
        <button onClick={handleLogin}>行こう！</button>
        <button onClick={onClose}>もどる</button>
      </div>
    </div>
  );
}