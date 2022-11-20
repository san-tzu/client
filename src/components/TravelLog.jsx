import React, { useEffect, useState } from "react";
import axios from "axios";
import "./log.css";
import LogsTable from "./LogsTable";

// --- Need to config ---
// import dotenv from "dotenv";
// dotenv.config();

export default function TravelLog() {
  const date = new Date();
  const currentDate = date.toLocaleDateString();

  const startLocations = ["Home"];

  // const baseURL = "http://localhost:5000/api/v1";
  const baseURL = "https://still-fortress-01946.herokuapp.com/api/v1";

  // if (process.env.NODE_ENV === "development") {
  //   // Local Database
  //   baseURL = process.env.LOCAL_URL;
  // } else {
  //   // Atlas Database
  //   baseURL = process.env.API_URL;
  // }

  const [dest, setDest] = useState([]);
  const [start, setStart] = useState(startLocations);
  const [meter, setMeter] = useState(true);

  // Form Data Initial State
  const [formData, setFormData] = useState({
    username: "admin",
    start: start[0],
    destination: [""],
    date: currentDate,
    meter: 0,
    other: 0,
    remark: "",
  });

  const [travelList, setTravelList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${baseURL}/travels`);
        const travels = res.data.travels;
        setTravelList(travels);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    console.log("render");
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${baseURL}/travels`, { formData });
      const { newTravel, ...data } = res.data;

      setTravelList([...travelList, newTravel]);
      setDest(dest.filter((d) => d !== newTravel.destination));
      setStart([start[0], newTravel.destination]);

      setFormData({
        username: "admin",
        start: newTravel.destination,
        destination: dest[0],
        date: currentDate,
        meter: 0,
        other: 0,
        remark: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="travel-log-form">
        <form className="row g-3 p-2 needs-validation" onSubmit={handleSubmit}>
          <h2>
            Travel Log <span>{formData.username}</span>
          </h2>
          <div className="col-md-4">
            <label htmlFor="start" className="form-label">
              Start:
            </label>
            <input
              type="text"
              className="form-control"
              list="start"
              name="start"
              id="startLoc"
              onChange={handleChange}
              placeholder="Start Location..."
              required
            />
            <datalist aria-label="start" id="start">
              {start.map((s, i) => {
                return (
                  <option key={i} value={s}>
                    {s}
                  </option>
                );
              })}
            </datalist>
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
              id="dest"
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
      {/* <LogsTable travels={travelList} /> */}
    </div>
  );
}
