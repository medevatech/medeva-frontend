import { useState } from 'react'
import { omit } from 'lodash'

const useForm = (callback) => {
    const [errors, setErrors] = useState({});

    const validate = (event, name, value) => {
        if(name) {
            if((name === 'nama' && value === '') ||
                (name === 'tipe' && value === '') ||
                (name === 'nama_lengkap' && value === '') ||
                (name === 'nomor_kitas' && value === '') ||
                (name === 'username' && value === '') ||
                (name === 'password' && value === '') ||
                (name === 'nomor_izin' && value === '') ||
                (name === 'kadaluarsa_izin' && value === '')) {
                
                setErrors(errors => ({
                    ...errors,
                    [name]: 'Kolom ini wajib diisi'
                }))
            } else if((name === 'nama' && value !== '') ||
                (name === 'tipe' && value !== '') ||
                (name === 'nama_lengkap' && value !== '') ||
                (name === 'nomor_kitas' && value !== '') ||
                (name === 'username' && value !== '') ||
                (name === 'password' && value !== '') ||
                (name === 'nomor_izin' && value !== '') ||
                (name === 'kadaluarsa_izin' && value !== '')) {
                
                let newObj = omit(errors, name);
                setErrors(newObj);
            }

            if((name === 'id_klinik' && value === '') ||
                (name === 'spesialisasi' && value === '') ||
                (name === 'tipe_izin' && value === '') ||
                (name === 'peran' && value === '')) {

                setErrors(errors => ({
                    ...errors,
                    [name]: 'Kolom ini wajib dipilih'
                }))
            } else if((name === 'id_klinik' && value !== '') ||
                (name === 'spesialisasi' && value !== '') ||
                (name === 'tipe_izin' && value !== '') ||
                (name === 'peran' && value !== '')) {

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