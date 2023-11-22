import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Details = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const getEmployees = async () => {
      const result = await axios.get("/employees");
      const dataResult = await result.data;
      setData(dataResult);
    };
    getEmployees();
  }, []);

  const handleDelete = (employeeId) => {
    axios.delete(`/delete/${employeeId}`);
    window.location.reload();
  };
  return (
    <>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-center text-2xl font-semibold underline">
          Employees Details
        </h1>
        <table className="container">
          <thead className="">
            <tr className="">
              <th>EmpId</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((emp, index) => {
              return (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-red-100" : "bg-white"}
                >
                  <td>{emp.employeeId}</td>
                  <td>{emp.firstName}</td>
                  <td>{emp.lastName}</td>
                  <td>{emp.email}</td>
                  <td className="flex space-x-4 justify-center">
                    <button
                      onClick={() => handleDelete(emp.employeeId)}
                      className="text-xl text-white border rounded-md bg-gray-500 px-2 py-1"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => navigate(`/update/${emp.employeeId}`)}
                      className="text-xl text-white border rounded-md bg-blue-500 px-2 py-1"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Details;
