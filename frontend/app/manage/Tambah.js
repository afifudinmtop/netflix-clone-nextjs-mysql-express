"use client";
import { useState, useEffect } from "react";

export default function Tambah() {
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("Trending Now");

  const updateData = () => {
    const formData = new FormData();

    // Append movie data to the form data
    formData.append("judul", judul);
    formData.append("kategori", kategori);

    // Get the file input element
    const fileInput = document.querySelector('input[type="file"]');

    // Check if a file is selected
    if (fileInput.files.length > 0) {
      // Append the selected file to the form data
      formData.append("gambar", fileInput.files[0]);
    } else {
      console.error("Please select an image file.");
      return;
    }

    fetch("http://localhost:8850/data/", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // Reset form fields on success
          setJudul("");
          setKategori(kategori);
          fileInput.value = ""; // Clear the file input

          // Close the modal
          document.getElementById("button_modal_tambah").click();

          // Trigger a reload of the movie list
          document.getElementById("button_reload_list").click();
        } else {
          console.error("Error saving data: ", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  return (
    <div
      className="modal fade"
      id="modal_tambah"
      tabIndex="-1"
      aria-labelledby="modal_tambahLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="modal_tambahLabel">
              Tambahkan Movie
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {/* Judul */}
            <div className="mb-3">
              <label className="form-label">Judul</label>
              <input
                type="text"
                className="form-control"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
              />
            </div>

            {/* Gambar */}
            <div className="mb-3">
              <label className="form-label">Gambar</label>
              <input type="file" accept="image/*" className="form-control" />
            </div>

            {/* Kategori */}
            <div className="mb-3">
              <label className="form-label">Kategori</label>
              <select
                className="form-select"
                onChange={(e) => setKategori(e.target.value)}
              >
                <option value="Trending Now">Trending Now</option>
                <option value="Binge-worthy Western Supernatural TV Shows">
                  Binge-worthy Western Supernatural TV Shows
                </option>
                <option value="Anime & Anime-Inspired">
                  Anime & Anime-Inspired
                </option>
                <option value="Supernatural TV Shows">
                  Supernatural TV Shows
                </option>
                <option value="Popular on Netflix">Popular on Netflix</option>
                <option value="New Releases">New Releases</option>
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={updateData}
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
