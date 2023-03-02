import axios from "axios";
import { useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");
const Account = () => {
  const [showModal, setShowModal] = useState(false);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    role: '',
    name:'',
    username:'',
    nip:'',
    nis:'',
    password:''
  });

  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    const res = await axios.get("http://localhost:8000/api/roles");
    setRoles(res.data);
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
    console.log(formData)
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
        <button></button>
        <div className={"w-full md:w-6/12 bg-cyan-400 p-3 md:p-10 rounded-lg"}>
          <div className="mb-2 md:mb-3 flex flex-col">
            <label className="font-semibold">Pilih Role</label>
            <select className="p-2 md:p-3 rounded-md mt-2 md:mt-3" name="role" onChange={handleChange}
            value={formData.role}>
                <option selected value="">--Pilih Role--</option>
              {roles.map((role) => (
                <option key={role.name} value={role.name} selected={formData.role == role.name}>
                  {role.alias_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-2 md:mb-3 flex flex-col">
            <label className="font-semibold">Nama Lengkap</label>
            <input
              type="text"
              className="p-2 md:p-3 rounded-md"
              placeholder="Nama Lengkap"
            />
          </div>
          {
            formData.role == 'admin' || formData.role == 'super_admin' && (
                <div className="mb-2 md:mb-3 flex flex-col">
                    <label className="font-semibold">Username</label>
                    <input
                        type="text"
                        name="username"
                        className="p-2 md:p-3 rounded-md"
                        placeholder="Username"
                    />
                </div>
            )
          }
          <div className="mb-2 md:mb-3 flex flex-col">
            <label className="font-semibold">Nama Lengkap</label>
            <input
              type="text"
              className="p-2 md:p-3 rounded-md"
              placeholder="Nama Lengkap"
            />
          </div>
          <div className="flex flex-row justify-around mt-3 md:mt-5">
            <button className="p-2 md:p-3 px-6 md:px-10 bg-blue-700 text-white hover:bg-blue-400 font-semibold rounded-md">
              Simpan
            </button>
            <button
              onClick={handleModal}
              className="p-2 md:p-3 px-6 md:px-10 bg-rose-500 text-white hover:bg-rose-700 font-semibold rounded-md"
            >
              Batal
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Account;
