import React, { useState } from 'react'
import axios from 'axios'
import { FaInfo } from "react-icons/fa6";
import { IoClose } from "react-icons/io5"
import { useSelector } from 'react-redux'
import { IoCheckmarkSharp } from "react-icons/io5"
import { host } from '../../../utils/config';
import ModalAdvertencia from '../../../shared/components/ModalAdvertencia';
import { LuPaperclip } from 'react-icons/lu';

const FormUploadFile = (props) => {
    const {registro, setEvidencias} = props;
    const [uploadProgress, setUploadProgress] = useState({});
    const [uploadErrors, setUploadErrors] = useState({});
    const [modalActivo, setModalActivo] = useState("");
    const [error, setError] = useState(null);
    const token = useSelector(state => state.auth.token);

    // Función para manejar la subida de cada archivo
    const uploadFile = async (file) => {
        const formData = new FormData();

        formData.append('archivo', file)
        formData.append('registroId', registro.id)

        try {
            const response = await axios.post(`${host}/evidencias`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`, 
                },
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    const percentage = Math.round((loaded * 100) / total);
                    
                    setUploadProgress((prevProgress) => ({
                        ...prevProgress,
                        [file.name]: percentage, 
                    }));
                },
            });
            setTimeout(() => {
                setUploadProgress((prevProgress) => {
                    const newProgress = { ...prevProgress };
                    delete newProgress[file.name];
                    return newProgress;
                });
            }, 5000)

            // Agregar el nuevo archivo al inicio de la lista de evidencias
            setEvidencias((prevEvidencia) => [
                response.data.data,  
                ...prevEvidencia,
            ]);
        } catch (err) {

            const { response } = err; 
            if (response?.data?.statusCode === 400 && response?.data?.error?.fieldErrors && Array.isArray(response.data.error.fieldErrors)) {
                response.data.error.fieldErrors.forEach(({ field, message }) => {
                    setUploadErrors((prevErrors) => ({
                        ...prevErrors,
                        [file.name]: message,
                    }));
                });
            }else if(response?.data?.statusCode !== 400){
                setUploadErrors((prevErrors) => ({
                    ...prevErrors,
                    [file.name]: response?.data?.message,
                }));
            }else{
                setUploadErrors((prevErrors) => ({
                    ...prevErrors,
                    [file.name]: "Ha ocurrido un error interno. Por favor, inténtalo nuevamente.",
                }));
            }
        }
    }
    // Manejar la selección de múltiples archivos y subirlos automáticamente
    const onFileChange = async (e) => {
        const files = e.target.files;

        setUploadProgress({});
        setUploadErrors({});

        if (files.length > 0) {
            // Iterar sobre los archivos seleccionados y subir cada uno
            for (let i = 0; i < files.length; i++) {
                await uploadFile(files[i]);
            }
        }
        // Limpiar el valor del input para permitir la selección del mismo archivo nuevamente
        e.target.value = null;
    }

    return (
        <div>
            <label htmlFor="files" className='button-form flex w-[130px] button-form-secondary text-sm'>
                <LuPaperclip />
                <span>Subir archivo</span>
                <input
                    type="file"
                    className='hidden'
                    id="files"
                    multiple
                    onChange={onFileChange} // Subir automáticamente al seleccionar los archivos
                />
            </label>

            {/* Mostrar el progreso y errores de la subida de cada archivo */}
            <div className="mt-4">
                {Object.keys(uploadProgress).map((fileName, index) => (
                    <div key={index} className="mt-2">
                        {/* Barra de progreso para cada archivo */}
                        <div className="w-full relative bg-gray-100 rounded-full h-8 mt-2 text-sm">
                            <div className='absolute flex justify-center items-center w-full h-full'>
                                <p className='text-center truncate w-[90%]'>{fileName}</p>
                            </div>
                            <div
                                className={`${uploadErrors[fileName] ? "bg-red-200": "bg-blue-200 dark:bg-blue-900"} h-8 rounded-full flex items-center px-4 transition-all`}
                                style={{ width: `${uploadProgress[fileName] || 0}%` }}
                            >
                            </div>
                            {(uploadProgress[fileName] === 100 && !uploadErrors[fileName]) && (
                                <div 
                                    className='p-1 bg-blue-600 text-white dark:bg-blue-900 absolute top-1.5 right-3 text-xs rounded-full'
                                >
                                    <IoCheckmarkSharp />
                                </div>
                            )}
                            {uploadErrors[fileName] && (<>
                                <button 
                                    className='p-1 bg-red-600 text-white absolute top-1.5 right-9 text-xs rounded-full'
                                    onClick={() => { setModalActivo("advertencia"); setError(uploadErrors[fileName]) }}   
                                >
                                    <FaInfo/>
                                </button>
                                <button className={`${uploadErrors[fileName] ? "bg-red-600": "bg-blue-600"}  absolute top-1.5 right-3 text-xs rounded-full p-1 text-white`}
                                    type='button'
                                    title='Eliminar barra de progreso'
                                    onClick={() => {
                                        setUploadProgress((prevProgress) => {
                                            const newProgress = { ...prevProgress };
                                            delete newProgress[fileName];
                                            return newProgress;
                                        });
                                    }}
                                >
                                    <IoClose />
                                </button>
                            </>)}
                        </div>
                    </div>
                ))}
            </div>
            {modalActivo === "advertencia" && (
                <ModalAdvertencia 
                    cerrarModal = {() => {
                        setModalActivo("");
                    }}
                    title={`Error`}
                    message= {error}
                />
            )}
        </div>
    )
}

export default FormUploadFile