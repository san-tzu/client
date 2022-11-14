import React, { useState } from "react";
import "./log.css";
import LogsTable from "./LogsTable";

export default function TravelLog() {
  const date = new Date();
  const currentDate = date.toLocaleDateString();

  const startLocations = ["Home"];

  const destLocations = [
    "Office",
    "Home",
    "Customer 1",
    "Customer 2",
    "Customer 3",
    "Supplier 1",
  ];

  const [dest, setDest] = useState(destLocations);
  const [start, setStart] = useState(startLocations);

  const [meter, setMeter] = useState(true);

  // Form Data Initial State
  const [formData, setFormData] = useState({
    username: "admin",
    start: start[0],
    destination: "",
    date: currentDate,
    meter: "",
    other: "",
    remark: "",
  });

  const [travelList, setTravelList] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form validation

    // Add form data to list
    setTravelList([...travelList, formData]);

    setDest(dest.filter((d) => d !== formData.destination));
    setStart([start[0], formData.destination]);

    // Reset form data
    setFormData({
      username: "admin",
      start: formData.destination,
      destination: dest[0],
      date: currentDate,
      meter: "",
      other: "",
      remark: "",
    });
  };

  return (
    <div className="">
      <div className="travel-log-form">
        <form className="row g-3 p-2 needs-validation" onSubmit={handleSubmit}>
          <h2>Travel Log <span>{formData.username}</span></h2>
          <div className="col-md-4">
            <label htmlFor="start" className="form-label">
              Start:
            </label>
            <select
              className="form-select"
              aria-label="start"
              id="start"
              name="start"
              onChange={handleChange}
              required
            >
              {start.map((s, i) => {
                return (
                  <option key={i} value={s}>
                    {s}
                  </option>
                );
              })}
            </select>
            <div className="invalid-feedback">Please choose a username.</div>
          </div>
          <div className="col-md-4">
            <label htmlFor="destinations" className="form-label">
              Destination:
            </label>
            <input
              type="text"
              className="form-control"
              list="destination"
              name="destination"
              id="destinations"
              onChange={handleChange}
              placeholder="Destination..."
              required
            />
            <datalist aria-label="destination" id="destination">
              {dest.map((d, i) => {
                return (
                  <option key={i} value={d}>
                    {d}
                  </option>
                );
              })}
            </datalist>
            <div className="invalid-feedback">Please choose a username.</div>
          </div>
          <div className="col-md-4">
            <label htmlFor="date" className="form-label">
              Date:
            </label>
            <input
              className="form-control"
              id="date"
              value={formData.date}
              onChange={handleChange}
              type="text"
              placeholder={formData.date}
              aria-label="date"
              disabled
            />
          </div>
          <div className="col-md-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="transport"
                id="meter"
                onClick={() => {
                  setMeter(true);
                  formData.other = 0;
                }}
              />
              <label className="form-check-label" htmlFor="meter">
                Meter
              </label>
            </div>
            <input
              type="number"
              className="form-control"
              name="meter"
              placeholder="Meter Reading"
              aria-label="meter"
              disabled={!meter}
              value={formData.meter}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="transport"
                id="other"
                onClick={() => {
                  setMeter(false);
                  formData.meter = 0;
                }}
              />
              <label className="form-check-label" htmlFor="other">
                Other
              </label>
            </div>
            <input
              type="number"
              className="form-control"
              name="other"
              placeholder="Other"
              aria-label="other"
              disabled={meter}
              value={formData.other}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-8">
            <label htmlFor="remark" className="form-label">
              Remarks:
            </label>
            <input
              className="form-control"
              id="remark"
              name="remark"
              type="text"
              placeholder="Remarks"
              aria-label="remark"
              value={formData.remark}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </form>
      </div>
      <LogsTable travels={travelList} />
    </div>
  );
}