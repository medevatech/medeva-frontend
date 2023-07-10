import { useState } from 'react'
import { omit } from 'lodash'

const useForm = (callback) => {
    const [errors, setErrors] = useState({});

    const validate = (event, name, value) => {
        if(name) {
            if((name === 'input_login' && value === '')) {
                
                setErrors(errors => ({
                    ...errors,
                    [name]: 'Silahkan mengisi username atau email Anda'
                }))
            } else if((name === 'input_login' && value !== '')) {
                
                let newObj = omit(errors, name);
                setErrors(newObj);
            }

            if((name === 'password_login' && value === '')) {
                
                setErrors(errors => ({
                    ...errors,
                    [name]: 'Silahkan mengisi password Anda'
                }))
            } else if((name === 'password_login' && value !== '')) {
                
                let newObj = omit(errors, name);
                setErrors(newObj);
            }

            if((name === 'nama' && value === '') ||
                (name === 'tipe' && value === '') ||
                (name === 'nama_lengkap' && value === '') ||
                (name === 'nomor_kitas' && value === '') ||
                (name === 'username' && value === '') ||
                (name === 'password' && value === '') ||
                (name === 'nomor_izin' && value === '') ||
                (name === 'kadaluarsa_izin' && value === '') ||
                (name === 'harga' && value === '') ||
                (name === 'harga_jasa' && value === '') ||
                (name === 'harga_jual' && value === '') ||
                (name === 'temperatur' && value === '') ||
                (name === 'tinggi_badan' && value === '') ||
                (name === 'berat_badan' && value === '') ||
                (name === 'lingkar_perut' && value === '') ||
                (name === 'sistole' && value === '') ||
                (name === 'diastole' && value === '') ||
                (name === 'respiratory_rate' && value === '') ||
                (name === 'heart_rate' && value === '') ||
                (name === 'nama_kelas' && value === '') ||
                (name === 'nomor_asuransi' && value === '') ||
                (name === 'dosis' && value === '') ||
                (name === 'deskripsi' && value === '') ||
                (name === 'indikasi' && value === '') ||
                (name === 'merk' && value === '') ||
                (name === 'nomor_telepon' && value === '') ||
                (name === 'alamat' && value === '') ||
                (name === 'kategori_layanan_lab' && value === '')) {
                
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
                (name === 'kadaluarsa_izin' && value !== '') ||
                (name === 'harga' && value !== '') ||
                (name === 'harga_jasa' && value !== '') ||
                (name === 'harga_jual' && value !== '') ||
                (name === 'temperatur' && value !== '') ||
                (name === 'tinggi_badan' && value !== '') ||
                (name === 'berat_badan' && value !== '') ||
                (name === 'lingkar_perut' && value !== '') ||
                (name === 'sistole' && value !== '') ||
                (name === 'diastole' && value !== '') ||
                (name === 'respiratory_rate' && value !== '') ||
                (name === 'heart_rate' && value !== '') ||
                (name === 'nama_kelas' && value !== '') ||
                (name === 'nomor_asuransi' && value !== '') ||
                (name === 'dosis' && value !== '') ||
                (name === 'deskripsi' && value !== '') ||
                (name === 'indikasi' && value !== '') ||
                (name === 'merk' && value !== '') ||
                (name === 'nomor_telepon' && value !== '') ||
                (name === 'alamat' && value !== '') ||
                (name === 'kategori_layanan_lab' && value !== '')) {
                
                let newObj = omit(errors, name);
                setErrors(newObj);
            }

            if((name === 'id_klinik' && value === '') ||
                (name === 'tipe_karyawan' && value === '') ||
                (name === 'spesialis' && value === '') ||
                (name === 'tipe_izin' && value === '') ||
                (name === 'peran' && value === '') ||
                (name === 'id_daftar_tindakan' && value === '') ||
                (name === 'id_daftar_layanan' && value === '') ||
                (name === 'kesadaran' && value === '') ||
                (name === 'status_pulang' && value === '') ||
                (name === 'id_penyakit' && value === '') ||
                (name === 'id_pasien' && value === '') ||
                (name === 'id_asuransi' && value === '') ||
                (name === 'id_alergi' && value === '') ||
                (name === 'id_asuransi_kelas' && value === '') ||
                (name === 'tipe_kerjasama' && value === '') ||
                (name === 'golongan' && value === '') ||
                (name === 'kategori' && value === '') ||
                (name === 'satuan_dosis' && value === '') ||
                (name === 'satuan' && value === '') ||
                (name === 'jual_per' && value === '') ||
                (name === 'produsen' && value === '') ||
                (name === 'tipe_bhp' && value === '') ||
                (name === 'id_pemeriksaan' && value === '')) {

                setErrors(errors => ({
                    ...errors,
                    [name]: 'Kolom ini wajib dipilih'
                }))
            } else if((name === 'id_klinik' && value !== '') ||
                (name === 'tipe_karyawan' && value !== '') ||
                (name === 'spesialis' && value !== '') ||
                (name === 'tipe_izin' && value !== '') ||
                (name === 'peran' && value !== '') ||
                (name === 'id_daftar_tindakan' && value !== '') ||
                (name === 'id_daftar_layanan' && value !== '') ||
                (name === 'kesadaran' && value !== '') ||
                (name === 'status_pulang' && value !== '') ||
                (name === 'id_penyakit' && value !== '') ||
                (name === 'id_pasien' && value !== '') ||
                (name === 'id_asuransi' && value !== '') ||
                (name === 'id_alergi' && value !== '') ||
                (name === 'id_asuransi_kelas' && value !== '') ||
                (name === 'tipe_kerjasama' && value !== '') ||
                (name === 'golongan' && value !== '') ||
                (name === 'kategori' && value !== '') ||
                (name === 'satuan_dosis' && value !== '') ||
                (name === 'satuan' && value !== '') ||
                (name === 'jual_per' && value !== '') ||
                (name === 'produsen' && value !== '') ||
                (name === 'tipe_bhp' && value !== '') ||
                (name === 'id_pemeriksaan' && value !== '')) {

                let newObj = omit(errors, name);
                setErrors(newObj);
            }

            let isWD, isDD = false;

            if(name === 'wd' && value === true) {
                isWD = true;
              } else if(name === 'wd' && value === false) {
                isWD = false;
              }
              
              if(name === 'dd' && value === true) {
                isDD = true;
              } else if(name === 'dd' && value === false) {
                isDD = false;
              }

            // console.log('isWD', isWD);
            // console.log('isDD', isDD);

            // console.log(name, value);

            if((isWD === false && isDD === false)) {
                setErrors(errors => ({
                    ...errors,
                    wd: 'Kolom ini wajib dipilih salah satu',
                    dd: 'Kolom ini wajib dipilih salah satu'
                }))
            } else if((isWD === true && isDD === true)) {
                setErrors(errors => ({
                    ...errors,
                    wd: 'Kolom ini tidak boleh dipilih keduanya',
                    dd: 'Kolom ini tidak boleh dipilih keduanya'
                }))
            } else if((isWD === true && isDD === false) ||
                (isWD === false && isDD === true)) {

                let newObjwd = omit(errors, 'wd');
                setErrors(newObjwd);

                let newObjdd = omit(errors, 'dd');
                setErrors(newObjdd);
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