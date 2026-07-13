"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Today() {
  const [studentId, setStudentId] = useState<number | null>(null);
  const [studentName, setStudentName] = useState<string | null>(null);
  const [today] = useState(new Date());
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
      <p>開始時間　例　10:00</p>
      <p>体温　例　36.5</p>
      <p>手洗い</p>
      <p>うがい</p>
      <p>体調
        <ul>
          <li>元気</li>
          <li>普通</li>
          <li>眠い</li>
          <li>疲れている</li>
        </ul>
      </p>
      <p>気分
        <ul>
          <li>元気</li>
          <li>普通</li>
          <li>少し落ち込んでいる</li>
          <li>とても落ち込んでいる</li>
        </ul>
      </p>
      <p>取り組み
        <ul>
          <li>スクラッチ</li>
          <li>マイクラedu</li>
          <li>そのほか</li>
        </ul>
      </p>
      <p>
        メモ
      </p>
    </div>
  );
}