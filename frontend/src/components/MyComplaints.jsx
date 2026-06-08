function MyComplaints() {
  const complaints = [
    { id: 101, title: "Network Issue", status: "Pending" },
    { id: 102, title: "Water Leakage", status: "In Progress" },
    { id: 103, title: "Street Light Damage", status: "Resolved" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Complaints</h1>

      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Complaint</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.id}</td>
              <td>{complaint.title}</td>
              <td>{complaint.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MyComplaints;