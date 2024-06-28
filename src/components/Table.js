import React from "react";
import axios from "axios";
const Table = ({ entries,deleteHandler }) => {

  
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Date Added</th>
          <th scope="col">Delete</th>
          <th scope="col">Edit</th>
        </tr>
      </thead>
      <tbody>
        {entries.length > 0 ? (
          entries.map((entry,index) => (
            <tr key={entry.ID}>
              <th scope="row">{index+1}</th>
              <td>{entry.Name}</td>
              <td>{entry.Date_added}</td>
              <td>
                <button onClick={()=>deleteHandler(entry.ID)}>Delete</button>
              </td>
              <td>
                <button>Edit</button>
              </td>
            </tr>
          ))
        ) : (
          <tr col-span-5>No Data Found</tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
