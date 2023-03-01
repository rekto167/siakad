import backgroundnya from "../../../assets/img/bg-img.png"
import tutwuri from "../../../assets/img/tutwuri.png"
import {useState} from "react";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [roleLogin, setRoleLogin] = useState('');

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleRoleLogin = (e) => {
        setRoleLogin(e.target.value);
    }

    return (
        <div className="flex justify-center items-center h-screen" style={{backgroundImage: `url(${backgroundnya})`, backgroundSize:'cover'}} >
            <div className="p-8 bg-cyan-400 flex flex-col justify-center items-center rounded-xl">
                <div className="flex flex-col justify-center items-center">
                    <img src={tutwuri} className="h-20" />
                    <span className="text-lg text-center font-bold mt-3">SISTEM INFORMASI AKADEMIK</span>
                </div>
                <div className="mt-5 flex flex-col w-full">
                    <div className="flex flex-col border border-blue-800 p-2 rounded-md">
                        <span className="font-semibold text-center">Sebagai</span>
                        <div className="flex items-center justify-around mt-3">
                            <div className="flex items-center self-center mb-2">
                                <input id="guruRole" type="radio" value="guru" onChange={handleRoleLogin} name="radiorole"
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="guruRole"
                                       className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Guru</label>
                            </div>
                            <div className="flex items-center mb-2">
                                <input id="siswaRole" type="radio" value="siswa" name="radiorole"
                                       onChange={handleRoleLogin}
                                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="siswaRole"
                                       className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Siswa</label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mb-3">
                        <label className="font-semibold">{roleLogin == 'guru' ? 'NIP' : 'NIS'}</label>
                        <input type="text" className="p-3 rounded-md focus:outline-none focus:outline-cyan-600 mt-2" />
                    </div>
                    <div className="flex flex-col mb-3">
                        <label className="font-semibold">Password</label>
                        <input type={showPassword ? 'text' : 'password'} className="p-3 rounded-md focus:outline-none focus:outline-cyan-600 mt-2" />
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" checked={showPassword} onChange={handleShowPassword} className="mr-3" />
                        <label>Lihat Password</label>
                    </div>
                    <div className="flex justify-center mt-5">
                        <button className="p-3 bg-blue-600 px-20 text-white rounded-md font-semibold">Login</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login