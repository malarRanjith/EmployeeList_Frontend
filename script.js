
function fetchEmployees() {
  const departmentId = document.getElementById("departmentId").value;
  fetch(`http://localhost:8080/api/departments/${departmentId}/employees`)
    .then((response) => response.json())
    .then((data) => {
      let table =
        "<table><tr><th>ID</th><th>Name</th><th>Position</th><th>Action</th></tr>";
      data.forEach((employee) => {
        const str = JSON.stringify(employee);
        table += `<tr>
                      <td>${employee.id}</td>
                      <td>${employee.name}</td>
                      <td>${employee.position}</td>
                      <td>
                        <button onclick='viewEmployee(${str})'>View</button>
                        <button onclick="deleteEmployee(${departmentId}, '${employee.id}')">Delete</button>
                      </td>
                  </tr>`;
      });
      table += "</table>";
      document.getElementById("employeeTable").innerHTML = table;
    });
}

function viewEmployee(employee) {
  let details = `<h2>Employee Details</h2>
                <p>ID: ${employee.id}</p>
                <p>Name: ${employee.name}</p>
                <p>Position: ${employee.position}</p>
                <button onclick="backToList()">Back</button>`;
  document.getElementById("employeeTable").innerHTML = details;
}

function deleteEmployee(departmentId, employeeId) {
  fetch(
    `http://localhost:8080/api/departments/${departmentId}/employees/${employeeId}`,
    {
      method: "DELETE",
    }
  )
    .then(() => {
      console.log(`Employee ${employeeId} deleted.`);
      fetchEmployees();
    })
    .catch((error) => {
      console.error("Error deleting employee:", error);
    });
}

function backToList() {
  fetchEmployees();
}
