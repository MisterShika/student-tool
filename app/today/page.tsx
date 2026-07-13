"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type todayFormData = {
  startTime?: string;
  temperature?: number;
  washedHands?: boolean;
  gargled?: boolean;
  condition?: string;
  mood?: string;
  activity?: string;
  memo?: string;
}

export default function Today() {
  const [studentId, setStudentId] = useState<number | null>(null);
  const [studentName, setStudentName] = useState<string | null>(null);
  const [today] = useState(new Date());
  const [formData, setFormData] = useState<todayFormData>({});
  const router = useRouter();

  useEffect(() => {
    const sessionCookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("session="));

    if (!sessionCookie) {
      router.push("/");
      return;
    }

    try {
      const session = JSON.parse(
        decodeURIComponent(sessionCookie.split("=")[1])
      );

      setStudentId(session.userId);
      setStudentName(session.userName);
    } catch {
      router.push("/");
    }
  }, [router]);

  return (
    <div>
      <h1>{studentName}</h1>
      <p>Student ID: {studentId}</p>
      <p>Date: {today.toDateString()}</p>
      <form onSubmit={(e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
      }}>

        {/* Start Time */}
        <label>
          <span>開始時間</span>
          <input
            type="time"
            value={formData.startTime || ""}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
          />
        </label>

        {/* Temp */}
        <label>
          <span>体温</span>
          <input
            type="number"
            step="0.1"
            value={formData.temperature || ""}
            onChange={(e) => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
          />
        </label>

        {/* Washed Hands? */}
        <label>
          <span>手洗い</span>
          <input 
            type="checkbox" 
            checked={formData.washedHands || false}
            onChange={(e) => setFormData({ ...formData, washedHands: e.target.checked })}
          />
        </label>

        {/* Gargled? */}
        <label>
          <span>うがい</span>
          <input 
            type="checkbox" 
            checked={formData.gargled  || false}
            onChange={(e) => setFormData({ ...formData, gargled: e.target.checked })}
          />
        </label>

        {/* Condition */}
        <label>
          <span>体調</span>
          <select
            value={formData.condition || ""}
            onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
          >
            <option></option>
            <option>元気</option>
            <option>普通</option>
            <option>眠い</option>
            <option>疲れている</option>
          </select>
        </label>

        {/* How are you feeling? */}
        <label>
          <span>気分</span>
          <select
            value={formData.mood || ""}
            onChange={(e) => setFormData({ ...formData, mood: e.target.value })}
          >
            <option></option>
            <option>元気</option>
            <option>普通</option>
            <option>少し落ち込んでいる</option>
            <option>とても落ち込んでいる</option>
          </select>
        </label>

        {/* Today's Activity */}
        <label>
          <span>取り組み</span>
          <select
            value={formData.activity || ""}
            onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
          >
            <option></option>
            <option>スクラッチ</option>
            <option>マイクラedu</option>
            <option>そのほか</option>
          </select>
        </label>

        {/* Memo */}
        <label>
          <span>メモ</span>
          <textarea
            value={formData.memo || ""}
            onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
          ></textarea>
        </label>

        <button type="submit">終わり！</button>
      </form>
    </div>
  );
}