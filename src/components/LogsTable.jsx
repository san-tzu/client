import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

export default function LogsTable(props) {
  // const baseURL = "https://still-fortress-01946.herokuapp.com/api/v1";
  const baseURL = "http://localhost:5000/api/v1";


  const handleDelete = async (id, e)=>{
    console.log("clicked")
    try {
      await axios.delete(`${baseURL}/travels/${id}`)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="logs-table p-2 w-75 m-0 m-auto">
      <div className="table-responsive">
        <table
          className="table table-striped
            table-hover	
            table-borderless
            align-middle"
        >
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Start</th>
              <th>Destination</th>
              <th>Meter Reading</th>
              <th>Other</th>
              <th>Remarks</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {props.travels.map((travel, i) => {
              return (
                <tr className="" key={travel._id}>
                  <td>{i+1}</td>
                  <td>{travel.start}</td>
                  <td>{travel.destination}</td>
                  <td>{travel.meter}</td>
                  <td>{travel.other}</td>
                  <td>{travel.remark}</td>
                  <td><FontAwesomeIcon icon={faDeleteLeft} onClick={(e)=>handleDelete(travel._id, e)} style={{cursor: "pointer"}} /></td>
                  {/* <td><FontAwesomeIcon icon="fa-solid fa-delete-left" /></td> */}
                </tr>
              );
            })}
          </tbody>
          <tfoot></tfoot>
        </table>
      </div>
    </div>
  );
}
