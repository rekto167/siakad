import {useState} from "react";
import Modal from 'react-modal';


Modal.setAppElement('#root');
const Account = () => {
    const [showModal, setShowModal] = useState(false);

    const handleModal = () => {
        setShowModal(!showModal);
    }

    return (
        <div>
            <div className={"mt-3 p-5 font-semibold"}>
                <button className={"p-3 px-10 bg-cyan-400 rounded-md hover:bg-cyan-700 hover:text-white"} onClick={handleModal}>Tambah Akun</button>
                <Modal
                    isOpen={showModal}
                    onRequestClose={handleModal}
                    contentLabel="Tambah Akun"
                    className="modal-content flex justify-center items-center h-screen"
                >
                    <button></button>
                    <div className={"w-6/12 bg-cyan-400 p-10 rounded-lg"}>
                        <div className="mb-3 flex flex-col">
                            <label className="font-semibold">Pilih Role</label>
                            <select className="p-3 rounded-md mt-3">
                                <option>Guru</option>
                                <option>Guru</option>
                                <option>Guru</option>
                                <option>Guru</option>
                            </select>
                        </div>
                        <div className="mb-3 flex flex-col">
                            <label className="font-semibold">Nama Lengkap</label>
                            <input type="text" className="p-3 rounded-md" placeholder="Nama Lengkap" />
                        </div>
                        <div className="mb-3 flex flex-col">
                            <label className="font-semibold">Username</label>
                            <input type="text" className="p-3 rounded-md" placeholder="Username" />
                        </div>
                        <div className="mb-3 flex flex-col">
                            <label className="font-semibold">Nama Lengkap</label>
                            <input type="text" className="p-3 rounded-md" placeholder="Nama Lengkap" />
                        </div>
                        <div className="flex flex-row justify-around mt-5">
                            <button className="p-3 px-10 bg-blue-700 text-white hover:bg-blue-400 rounded-md">Simpan</button>
                            <button onClick={handleModal} className="p-3 px-10 bg-rose-500 text-white hover:bg-rose-700 font-semibold rounded-md">Batal</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default Account;