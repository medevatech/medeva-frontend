import React, { useState } from 'react';

var urlProvinsi = "https://ibnux.github.io/data-indonesia/provinsi.json";
var urlKabupaten = "https://ibnux.github.io/data-indonesia/kabupaten/";
var urlKecamatan = "https://ibnux.github.io/data-indonesia/kecamatan/";
var urlKelurahan = "https://ibnux.github.io/data-indonesia/kelurahan/";

const Address = () => { 
    const [selectedProvince, setSelectedProvince] = useState([]);
    const [selectedCity, setSelectedCity] = useState([]);
    const [selectedSubdistrict, setSelectedSubdistrict] = useState([]);
    const [selectedWard, setSelectedWard] = useState([]);

    const [provinsi, setProvinsi] = useState([]);
    const [kota, setKota] = useState([]);
    const [kecamatan, setKecamatan] = useState([]);
    const [kelurahan, setKelurahan] = useState([]);

    const [selectProvince, setSelectProvince] = useState([]);
    const [selectCity, setSelectCity] = useState([]);
    const [selectSubdistrict, setSelectSubdistrict] = useState([]);
    const [selectWard, setSelectWard] = useState([]);

    const handleChangeProv = (event) => {
        setSelectProvince(event);
        setProvinsi(event.value);
        changeKota(event.key);
    };

    const handleChangeCity = event => {
        setSelectCity(event);
        setKota(event.value);
        changeKecamatan(event.key);
    };

    const handleChangeSubdistrict = event => {
        setSelectSubdistrict(event);
        setKecamatan(event.value);
        changeKelurahan(event.key);
    };

    const handleChangeWard = event => {
        setSelectWard(event);
        setKelurahan(event.value);
    };

    const onLoadProvinsi = async () => {
        try {
            const response = await fetch(urlProvinsi);
            // console.log(response);
                
            if (response.ok) {
                let data = await response.json();
                for(var i = 0; i < data.length; i++){
                    setSelectedProvince(current => 
                    [...current, { label: data[i].nama, value: data[i].nama, key: data[i].id }]
                    );
                }
            } else {
                throw Error(`Error status: ${response.status}`);
            }
        } catch (e) {
            console.log(e);
        }
        }

    const changeKota = async (id_prov) => {
        try {
            const response = await fetch(`${urlKabupaten}/${id_prov}.json`);
            // console.log(response);
                
            if (response.ok) {
                let data = await response.json();
                setSelectedCity([]);
                for(var i = 0; i < data.length; i++){
                    setSelectedCity(current => 
                    [...current, { label: data[i].nama, value: data[i].nama, key: data[i].id }]
                    );
                }
            } else {
                throw Error(`Error status: ${response.status}`);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const changeKecamatan = async (id_kota) => {
        try {
            const response = await fetch(`${urlKecamatan}/${id_kota}.json`);
            // console.log(response);
                
            if (response.ok) {
                let data = await response.json();
                setSelectedSubdistrict([]);
                for(var i = 0; i < data.length; i++){
                    setSelectedSubdistrict(current => 
                    [...current, { label: data[i].nama, value: data[i].nama, key: data[i].id }]
                    );
                }
            } else {
                throw Error(`Error status: ${response.status}`);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const changeKelurahan = async (id_kecamatan) => {
        try {
            const response = await fetch(`${urlKelurahan}/${id_kecamatan}.json`);
            // console.log(response);
                
            if (response.ok) {
                let data = await response.json();
                setSelectedWard([]);
                for(var i = 0; i < data.length; i++){
                    setSelectedWard(current => 
                    [...current, { label: data[i].nama, value: data[i].nama, key: data[i].id }]
                    );
                }
            } else {
                throw Error(`Error status: ${response.status}`);
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export { 
    Address
    // onLoadProvinsi, changeKota, changeKecamatan, changeKelurahan,
    // handleChangeProv, handleChangeCity, handleChangeSubdistrict, handleChangeWard,
    // selectedProvince, selectedCity, selectedSubdistrict, selectedWard,
    // selectProvince, selectCity, selectSubdistrict, selectWard,
    // provinsi, kota, kecamatan, kelurahan
}