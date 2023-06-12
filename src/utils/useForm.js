import { useState } from 'react'
import { omit } from 'lodash'

const useForm = (callback) => {
    const [errors, setErrors] = useState({});

    const validate = (event, name, value) => {
        if(name) {
            if((name === 'nama' && value === '') ||
                (name === 'tipe' && value === '')) {
                
                setErrors(errors => ({
                    ...errors,
                    [name]: 'Kolom ini wajib diisi'
                }))
            } else if((name === 'nama' && value !== '') ||
                (name === 'tipe' && value !== '')) {
                
                let newObj = omit(errors, name);
                setErrors(newObj);
            }

            if(name === 'id_klinik' && value === '') {

                setErrors(errors => ({
                    ...errors,
                    [name]: 'Kolom ini wajib dipilih'
                }))
            } else if(name === 'id_klinik' && value !== '') {

                let newObj = omit(errors, name);
                setErrors(newObj);
            }
        }

        // switch (name) {
        //     case 'nama':
        //         if (value === '') {
        //             setErrors(errors => ({
        //                 ...errors,
        //                 nama: 'Kolom ini wajib diisi'
        //             }))
        //         } else {
        //             let newObj = omit(errors, "nama");
        //             setErrors(newObj);
        //         }
        //         break;

        //     case 'id_klinik':
        //         if (value === '') {
        //             setErrors(errors => ({
        //                 ...errors,
        //                 id_klinik: 'Kolom ini wajib dipilih'
        //             }))
        //         } else {
        //             let newObj = omit(errors, "id_klinik");
        //             setErrors(newObj);
        //         }
        //         break;

        //     case 'tipe':
        //         if (value === '') {
        //             setErrors(errors => ({
        //                 ...errors,
        //                 nama: 'Kolom ini wajib diisi'
        //             }))
        //         } else {
        //             let newObj = omit(errors, "tipe");
        //             setErrors(newObj);
        //         }
        //         break;

        //     default:
        //         break;
        // }

        // console.log('errors', errors);
    }

    return {
        errors,
        validate,
    }
}

export default useForm;