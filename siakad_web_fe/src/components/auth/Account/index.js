import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import {setAlert} from "../../../actions/alert";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {add_account} from "../../../actions/account";

Modal.setAppElement("#root");
const Account = ({setAlert, add_account}) => {
  const initialFormData = {
    role: '',
    name: '',
    username: '',
    nip: '',
    nis: '',
    password: '',
    confirmPassword: '',
  };

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleModal = () => {
    setShowModal(!showModal);
    if (showModal == false) {
      resetFormData();
    }
  };

  const resetFormData = () => {
    setFormData(initialFormData)
  }

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword){
      setAlert('Password tidak cocok', 'error');
    }
    // createAccount();
    add_account(formData)
    handleModal()
  }

  const createAccount = async() =>{
    const res = await axios.post('http://localhost:8000/api/user/tambah', formData);
    console.log(res.data);
  }


  return (
    <div className={"mt-3 p-3 md:p-5 font-semibold"}>
      <button
        className={
          "p-2 md:p-3 px-6 md:px-10 bg-cyan-400 rounded-md hover:bg-cyan-700 hover:text-white"
        }
        onClick={handleModal}
      >
        Tambah Akun
      </button>
      <Modal
        isOpen={showModal}
        onRequestClose={handleModal}
        contentLabel="Tambah Akun"
        className="modal-content flex justify-center items-center h-screen"
      >
        <div className={"w-full md:w-6/12 bg-cyan-400 p-3 md:p-10 rounded-lg"}>
          {
            formData.role === '' ? (
                <div>
                  <span className="text-center font-semibold">Pilih Role</span>
                  <select className="p-2 w-full rounded-md" name="role" onChange={handleChange}>
                    <option value="">--Pilih Role---</option>
                    <option value="admin">Admin</option>
                    <option value="siswa">Siswa</option>
                    <option value="guru">Guru</option>
                  </select>
                </div>
            ) : (
                <div></div>
            )
          }
          {
            formData.role !== '' && formData.role === 'admin' ? (
                <div>
                  <div>
                    <label className="font-semibold">Username</label>
                    <input name="username" className="p-2 rounded-md w-full outline-cyan-500 mt-2" onChange={handleChange} />
                  </div>
                </div>
            ) : formData.role === 'guru' ? (
                <div>
                  <label className="font-semibold">NIP</label>
                  <input name="nip" className="p-2 rounded-md w-full outline-cyan-500 mt-2" onChange={handleChange} maxLength={18} />
                </div>
            ) : formData.role === 'siswa' ? (
                <div>
                  <label className="font-semibold">NIS</label>
                  <input name="nis" className="p-2 rounded-md w-full outline-cyan-500 mt-2" onChange={handleChange} maxLength={10} />
                </div>
            ) : (<div></div>)
          }

          {
            formData.role !== '' || formData.role !== null ? (
                <div>
                  <div className="flex flex-col mt-2">
                    <label className="font-semibold">Nama</label>
                    <input name="name" className="p-2 rounded-md w-full outline-cyan-500" onChange={handleChange} />
                  </div>
                  <div className="flex flex-col mt-2">
                    <label className="font-semibold">Email</label>
                    <input name="email" className="p-2 rounded-md w-full outline-cyan-500" type="email" onChange={handleChange} />
                  </div>
                  <div className="flex flex-col mt-2">
                    <label className="font-semibold">Password</label>
                    <input name="password" className="p-2 rounded-md w-full outline-cyan-500" type="password" onChange={handleChange} />
                    {
                      formData.confirmPassword !== '' ?
                          formData.password !== formData.confirmPassword   ? (
                              <span className="font-semibold text-red-500">Password tidak sama</span>
                              ) : null
                          : null
                    }
                    {
                      formData.password !== '' ?
                          formData.password.length < 8 ? (
                              <span className="font-semibold text-red-500">Password minimal 8 karakter</span>
                          ) : null
                          : null
                    }
                  </div>
                  <div className="flex flex-col mt-2">
                    <label className="font-semibold">Konfirmasi Password</label>
                    <input name="confirmPassword" className="p-2 rounded-md w-full outline-cyan-500" type="password" onChange={handleChange} />
                    {
                      formData.confirmPassword !== '' ?
                          formData.password !== formData.confirmPassword   ? (
                              <span className="font-semibold text-red-500">Password tidak sama</span>
                          ) : null
                          : null
                    }
                    {
                      formData.confirmPassword !== '' ?
                          formData.confirmPassword.length < 8 ? (
                              <span className="font-semibold text-red-500">Password minimal 8 karakter</span>
                          ) : null
                          :null
                    }
                  </div>
                </div>
            ) : (
                <div className="text-red-500 font-semibold">
                  <span>Anda harus pilih role terlebih dahulu</span>
                </div>
            )
          }

          <div className="flex justify-around mt-10">
            {
              formData.role !== '' ? (
                  <button className="bg-green-500 p-3 px-10 rounded-md font-semibold text-white" onClick={resetFormData}>Bersihkan</button>
              ) : null
            }
            <button className="bg-blue-500 p-3 px-10 font-semibold text-white rounded-md" onClick={handleSubmit}>Simpan</button>
            <button className="bg-red-500 p-3 px-10 font-semibold text-white rounded-md" onClick={handleModal}>Batal</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

Account.propTypes = {
  setAlert: PropTypes.func.isRequired,
  add_account: PropTypes.func.isRequired
}

export default connect(null, {setAlert, add_account})(Account);
