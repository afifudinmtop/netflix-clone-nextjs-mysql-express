"use client";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./page.css";

const movie = ({ params }) => {
  const uuid = params.uuid;
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:8850/data/" + uuid, {
      cache: "no-store",
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  return (
    <div className="mb-5">
      {data.map((item) => (
        <div key={item.uuid}>
          <Header />

          {/* image */}
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: "30vh" }}
          >
            <img
              src={"http://localhost:8850/uploads/" + item.gambar}
              className="rounded img-fluid"
              alt={item.judul}
            />
          </div>

          <Footer judul={item.judul} />
        </div>
      ))}
    </div>
  );
};

export default movie;
