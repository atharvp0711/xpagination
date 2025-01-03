import React, { useEffect, useState } from "react";

const App = () => {
  const API_URL =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const result = await response.json();
        setData(result);
      } catch (error) {
        alert("failed to fetch data");
        // console.error("Error fetching data :", error);
      }
    };
    fetchData();
  }, []);

  // Pagination Logic

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  // Button Logics

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div
      style={{
        textAlign: "center",
        margin: "20px",
      }}
    >
      <h1>Employee Data Table</h1>
      <table
        style={{
          width: "80%",
          margin: "auto",
          borderCollapse: "collapse",
          border: "1px solid #ccc",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#028a0f",
              color: "#fff",
            }}
          >
            <th style={{ padding: "10px", border: "1px solid #ccc" }}> ID </th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>
              {" "}
              Name{" "}
            </th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>
              {" "}
              Email{" "}
            </th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>
              {" "}
              Role{" "}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((employee) => {
            return (
              <tr key={employee.id}>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                  }}
                >
                  {employee.id}
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                  }}
                >
                  {employee.name}
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                  }}
                >
                  {employee.email}
                </td>
                <td
                  style={{
                    padding: "10px",
                    border: "1px solid #ccc",
                  }}
                >
                  {employee.role}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handlePrev}
          style={{
            padding: "10px 20px",
            margin: "0 10px",
            backgroundColor: "#028a0f",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          {" "}
          Previous
        </button>
        <button
          style={{
            backgroundColor: "#fff",
            color: "black",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          {" "}
          {currentPage}{" "}
        </button>
        <button
          onClick={handleNext}
          style={{
            padding: "10px 20px",
            margin: "0 10px",
            backgroundColor: "#028a0f",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          {" "}
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
