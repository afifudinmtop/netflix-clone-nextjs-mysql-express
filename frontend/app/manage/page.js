"use client";
import { useState, useEffect } from "react";

import Tambah from "./Tambah";
import "./page.css";

export default function Manage() {
  const [data, setData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isDataLoaded) {
      export_ready();
    }
  }, [isDataLoaded]);

  const fetchData = () => {
    fetch("http://localhost:8850/data/", {
      cache: "no-store",
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsDataLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  const hapusData = (uuid) => {
    fetch("http://localhost:8850/data/" + uuid, {
      cache: "no-store",
      method: "DELETE",
    })
      .then(() => {
        console.log("ok");
        document.getElementById("button_reload_list").click();
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  function export_ready() {
    $("#tabelx").DataTable({
      lengthMenu: [
        [5, 25, 50, -1],
        [5, 25, 50, "All"],
      ],
      dom: "Bfrtip",
      buttons: ["copy", "csv", "excel", "pdf", "print"],
      order: [[1, "asc"]],
      initComplete: function () {
        // Access the tbody element and set the styles
        $("#tabel tbody").css({
          height: "50vh!important",
          overflow: "auto",
        });
      },
      columnDefs: [
        // { type: "num", targets: 0 }, //targets 0 means the first column
        // { type: "num", targets: 3 },
      ],
    });

    set_export_style();
  }

  // give css to buttons export
  function set_export_style() {
    setTimeout(() => {
      // Helper function to apply the modifications to an element
      function applyModifications(element, background, iconClass) {
        element.style.background = background;

        if (!element.classList.contains("button_export")) {
          element.classList.add("button_export");
          element.innerHTML = `<i class="${iconClass} pe-2"></i>${element.innerHTML}`;
        }
      }

      // Select all elements with class "buttons-copy" and apply modifications
      document.querySelectorAll(".buttons-copy").forEach((element) => {
        applyModifications(element, "#0d6efd", "bi bi-back");
      });

      // Select all elements with class "buttons-csv" and apply modifications
      document.querySelectorAll(".buttons-csv").forEach((element) => {
        applyModifications(element, "#198754", "bi bi-filetype-csv");
      });

      // Select all elements with class "buttons-excel" and apply modifications
      document.querySelectorAll(".buttons-excel").forEach((element) => {
        applyModifications(element, "#198754", "bi bi-file-earmark-excel-fill");
      });

      // Select all elements with class "buttons-pdf" and apply modifications
      document.querySelectorAll(".buttons-pdf").forEach((element) => {
        applyModifications(element, "#dc3545", "bi bi-file-earmark-pdf-fill");
      });

      // Select all elements with class "buttons-print" and apply modifications
      document.querySelectorAll(".buttons-print").forEach((element) => {
        applyModifications(element, "#6c757d", "bi bi-printer-fill");
      });
    }, 500);
  }

  return (
    <div className="mt-4 w-75 mx-auto">
      {/* tombol reload */}
      <button
        id="button_reload_list"
        onClick={fetchData}
        className="d-none btn btn-primary mb-3"
      >
        Refresh Products
      </button>

      {/* Tambah */}
      <Tambah />

      {/* tabel_area */}
      <div
        id="tabel_area"
        className="overflow-auto mx-auto bg-white p-3 rounded mt-4"
      >
        <button
          id="button_modal_tambah"
          type="button"
          className="btn btn-success mb-3"
          data-bs-toggle="modal"
          data-bs-target="#modal_tambah"
        >
          <i className="bi bi-plus-circle my-auto me-2"></i>
          <span className="my-auto">Tambahkan Movie</span>
        </button>

        <table id="tabelx" className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Gambar</th>
              <th>Judul</th>
              <th>Kategori</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.uuid}>
                <td>
                  <img
                    src={"http://localhost:8850/uploads/" + item.gambar}
                    className="manage_gambar mx-auto d-flex rounded"
                    alt={item.judul}
                  />
                </td>
                <td>{item.judul}</td>
                <td>{item.kategori}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => {
                      hapusData(item.uuid);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
