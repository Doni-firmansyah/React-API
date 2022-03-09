import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [validationError, setValidationError] = useState({});

  const [barangInput, setBarang] = useState({
    nama_barang: "",
    harga: "",
    stok: "",
    keterangan: "",
    gambar: "",
    suplier_id: "",
    error_list: [],
  });
  useEffect(() => {
    getBarang();
  }, []);

  const getBarang = async () => {
    try {
      let response = await axios.get(`http://localhost:8000/api/barang/${id}`);
      setBarang(response.data.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleInput = (e) => {
    e.persist();
    setBarang({ ...barangInput, [e.target.name]: e.target.value });
  };

  const updateBarang = async (e) => {
    e.preventDefault();

    const data = {
      nama_barang: barangInput.nama_barang,
      harga: barangInput.harga,
      stok: barangInput.stok,
      keterangan: barangInput.keterangan,
      gambar: barangInput.gambar,
      suplier_id: barangInput.suplier_id,
    };

    await axios
      .put(`http://localhost:8000/api/barang/${id}`, data)
      .then(function (response) {
        Swal.fire({
          icon: "success",
          text: response.data.message,
        });
        navigate(`/detail/${id}`);
      })
      .catch((error) => {
        if (error.response.request.status === 422) {
            setValidationError(error.response.data.message);
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
              {/* <form> */}
                <form onSubmit={updateBarang}>
                <div className="mb-3">
                  <label htmlFor="namaBarang" className="form-label">
                    Nama Barang
                  </label>
                  <input
                    type="text"
                    name="nama_barang"
                    value={barangInput.nama_barang}
                    onChange={handleInput}
                    className="form-control"
                    id="namaBarang"
                  />
                  <span className="text-danger">
                    {validationError.nama_barang}
                  </span>
                </div>
                <div className="mb-3">
                  <label htmlFor="harga" className="form-label">
                    Harga
                  </label>
                  <input
                    type="text"
                    name="harga"
                    value={barangInput.harga}
                    onChange={handleInput}
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
                    name="stok"
                    value={barangInput.stok}
                    onChange={handleInput}
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
                    name="keterangan"
                    value={barangInput.keterangan}
                    onChange={handleInput}
                    className="form-control"
                    id="keterangan"
                  />
                  <span className="text-danger">
                    {validationError.keterangan}
                  </span>
                </div>
                <div className="mb-3">
                  <label htmlFor="gambar" className="form-label">
                    Gambar
                  </label>
                  <input
                    type="text"
                    name="gambar"
                    value={barangInput.gambar}
                    onChange={handleInput}
                    className="form-control"
                    id="gambar"
                  />
                  <span className="text-danger">{validationError.gambar}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="suplier" className="form-label">
                    Suplier
                  </label>
                  <input
                    type="text"
                    name="suplier_id"
                    value={barangInput.suplier_id}
                    onChange={handleInput}
                    className="form-control"
                    id="suplier"
                  />
                  <span className="text-danger">
                    {validationError.suplier_id}
                  </span>
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

//note tidak bisa ngisi katena belom ada name name="harga" yang dipanggil di handle input
