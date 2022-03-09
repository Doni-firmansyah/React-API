import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import swal from "sweetalert2";
import Swal from "sweetalert2";
import loadings from "../../logo.svg";
import { TailSpin } from "react-loader-spinner";

export default function Show() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getProducts() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/barang");
      setProducts(response.data.data);
      setLoading(false);
      // console.log(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container pt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3>
                List Product{" "}
                <Link className="btn btn-primary btn-sm float-end" to="/create">
                  Craete
                </Link>
              </h3>
            </div>
            <div className="card-body">
              {loading ? (
                <div class="container d-flex align-items-center justify-content-center">
                  <TailSpin
                    height="100"
                    width="100"
                    color="grey"
                    ariaLabel="loading"
                  />
                </div>
              ) : (
                <table className="table table-striped table-responsive">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Nama Barang</th>
                      <th scope="col">Harga</th>
                      <th scope="col">Stok</th>
                      <th scope="col">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => {
                      var num = index + 1;
                      return (
                        <tr key={index}>
                          <td>{num++}</td>
                          <td>{product.nama_barang}</td>
                          <td>{product.harga}</td>
                          <td>{product.stok}</td>
                          <td>
                            <Link
                              to={`/detail/${product.id}`}
                              className="btn btn-success btn-sm"
                            >
                              Detail
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
