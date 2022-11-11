import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

export default function LogsTable(props) {
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
            {props.travels.map((t, i) => {
              return (
                <tr className="" key={i}>
                  <td>{i+1}</td>
                  <td>{t.start}</td>
                  <td>{t.destination}</td>
                  <td>{t.meter}</td>
                  <td>{t.other}</td>
                  <td>{t.remark}</td>
                  <td><FontAwesomeIcon icon={faDeleteLeft} /></td>
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
