import axios from "axios";
import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Detail() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [barang, setBarang] = useState([]);

  const getBarang = async () => {
    try {
      let response = await axios.get(`http://127.0.0.1:8000/api/barang/${id}`);
      setBarang(response.data.data);
      setLoading(false);
      //   console.log(response);
    } catch (e) {
      console.log(e.message);
    }
  };

  const deleteProduct = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    await axios
      .delete(`http://localhost:8000/api/barang/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        getBarang();
        navigate("/show");
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  useEffect(() => {
    getBarang();
  }, [id]);

  return (
    <div className="container pt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>
                Detail Product{" "}
                <Link className="btn btn-primary btn-sm float-end" to="/show">
                  Back
                </Link>
              </h3>
            </div>
            {loading ? (
              <div class="d-flex align-items-center justify-content-center my-5">
                <TailSpin
                  height="100"
                  width="100"
                  color="grey"
                  ariaLabel="loading"
                />
              </div>
            ) : (
              <div>
                <div className="card-body">
                <img src={`http://localhost:8000/image/${barang.gambar}`} class="card-img-top" alt="..."/>
                  <div className="row">
                    <div className="col-4">Nama Barang</div>
                    <div className="col-1">:</div>
                    <div className="col-7">{barang.nama_barang}</div>
                  </div>
                  <div className="row">
                    <div className="col-4">Harga</div>
                    <div className="col-1">:</div>
                    <div className="col-7">{barang.harga}</div>
                  </div>
                  <div className="row">
                    <div className="col-4">Stok</div>
                    <div className="col-1">:</div>
                    <div className="col-7">{barang.stok}</div>
                  </div>
                  <div className="row">
                    <div className="col-4">Keterangan</div>
                    <div className="col-1">:</div>
                    <div className="col-7">{barang.keterangan}</div>
                  </div>
                  <div className="row">
                    <div className="col-4">Gambar</div>
                    <div className="col-1">:</div>
                    <div className="col-7">{barang.gambar}</div>
                  </div>
                  <div className="row">
                    <div className="col-4">Nama Suplier</div>
                    <div className="col-1">:</div>
                    <div className="col-7">{barang.nama_suplier}</div>
                  </div>
                  <div className="row">
                    <div className="col-4">Alamat Suplier</div>
                    <div className="col-1">:</div>
                    <div className="col-7">{barang.alamat_suplier}</div>
                  </div>
                  <div className="row">
                    <div className="col-4">Telp Suplier</div>
                    <div className="col-1">:</div>
                    <div className="col-7">{barang.telp_suplier}</div>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="row text-center d-flex justify-content-center align-items-center">
                    <div className="col">
                      <Link
                        className="btn btn-primary btn-sm"
                        to={`/edit/${barang.id}`}
                      >
                        Edit
                      </Link>
                    </div>
                    <div className="col">
                      <button
                        type="button"
                        class="btn btn-danger btn-sm"
                        onClick={() => deleteProduct(barang.id)}
                      >
                        Delete
                      </button>
                      {/* <Button
                        variant="danger"
                        onClick={() => deleteProduct(barang.id)}
                      >
                        Delete
                      </Button> */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
