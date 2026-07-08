export default async function Login() {

    const getStudents = async () => {
        const res = await fetch("http://localhost:3000/api/allStudents", {
            cache: "no-store",
        });
        return res.json();
    }

    const students = await getStudents();

    return(
        <div>
            Testing Start
            <select>
            <option></option>
            {students.map((student: any) => (
                <option key={student.id} value={student.id}>
                    {student.firstName} {student.lastName}
                </option>
            ))}
            </select>
            Testing End
        </div>
    );
}