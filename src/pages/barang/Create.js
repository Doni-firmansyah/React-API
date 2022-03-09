import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export default function Create() {
  const navigate = useNavigate();
  const [validationError,setValidationError] = useState({})
  const [nama_barang, setNama] = useState("");
  const [harga, setHarga] = useState("");
  const [stok, setStok] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [gambar, setGambar] = useState("");
  const [suplier_id, setSuplier] = useState("");
  
  const imageHandler = (event) => {
		setGambar(event.target.files[0]);
	};

  const createBarang = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('nama_barang', nama_barang)
    formData.append('harga', harga)
    formData.append('stok', stok)
    formData.append('keterangan', keterangan)
    formData.append('gambar', gambar)
    formData.append('suplier_id', suplier_id)

    await axios.post(`http://localhost:8000/api/barang/create`, formData)
      .then(function (response) {
        Swal.fire({
          icon: "success",
          text: response.data.message,
        });
        navigate("/show");
      })
      .catch((error) => {
        if (error.response.request.status === 422) {
            setValidationError(error.response.data.message);
            console.log(error.response);
        } else {
          Swal.fire({
            text: error.response.data.message,
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="container pt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>
                Create Product
                <Link className="btn btn-primary btn-sm float-end" to="/show">
                  Back
                </Link>
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={createBarang}>
                <div className="mb-3">
                  <label htmlFor="namaBarang" className="form-label">
                    Nama Barang
                  </label>
                  <input
                    type="text"
                    value={nama_barang}
                    onChange={(event) => {
                      setNama(event.target.value);
                    }}
                    className="form-control"
                    id="namaBarang"
                  />
                  <span className="text-danger">{validationError.nama_barang}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="harga" className="form-label">
                    Harga
                  </label>
                  <input
                    type="text"
                    value={harga}
                    onChange={(event) => {
                      setHarga(event.target.value);
                    }}
                    className="form-control"
                    id="harga"
                  />
                  <span className="text-danger">{validationError.harga}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="stok" className="form-label">
                    Stok
                  </label>
                  <input
                    type="text"
                    value={stok}
                    onChange={(event) => {
                      setStok(event.target.value);
                    }}
                    className="form-control"
                    id="stok"
                  />
                  <span className="text-danger">{validationError.stok}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="keterangan" className="form-label">
                    Keterangan
                  </label>
                  <input
                    type="text"
                    value={keterangan}
                    onChange={(event) => {
                      setKeterangan(event.target.value);
                    }}
                    className="form-control"
                    id="keterangan"
                  />
                  <span className="text-danger">{validationError.keterangan}</span>
                </div>
                
                <div className="mb-3">
                  <label htmlFor="suplier" className="form-label">
                    Suplier
                  </label>
                  <input
                    type="text"
                    value={suplier_id}
                    onChange={(event) => {
                      setSuplier(event.target.value);
                    }}
                    className="form-control"
                    id="suplier"
                  />
                  <span className="text-danger">{validationError.suplier_id}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="gambar" className="form-label">
                    Gambar
                  </label>
                  <input type="file" onChange={imageHandler}
                    className="form-control"id="gambar"/>
                  <span className="text-danger">{validationError.gambar}</span>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
