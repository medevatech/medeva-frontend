import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

var urlProvinsi = "https://ibnux.github.io/data-indonesia/provinsi.json";
var urlKabupaten = "https://ibnux.github.io/data-indonesia/kabupaten/";
var urlKecamatan = "https://ibnux.github.io/data-indonesia/kecamatan/";
var urlKelurahan = "https://ibnux.github.io/data-indonesia/kelurahan/";

const Address = () => { 
    const dispatch = useDispatch();
    // const provinceData = useSelector(state => state.province);
    // const cityData = useSelector(state => state.city);
    // const subdistrictData = useSelector(state => state.subdistrict);
    // const wardData = useSelector(state => state.ward);

    const onLoadProvinsi = async () => {
    // async function onLoadProvinsi() {
        try {
            const response = await fetch(urlProvinsi);
            // console.log(response);
                
            if (response.ok) {
                let data = await response.json();
                for(var i = 0; i < data.length; i++){
                    dispatch({type: "GET_PROVINCE", payload: [{ label: data[i].nama, value: data[i].nama, key: data[i].id }] });
                }
            } else {
                throw Error(`Error status: ${response.status}`);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const changeKota = async (id_prov) => {
    // async function changeKota(id_prov) {
        try {
            const response = await fetch(`${urlKabupaten}/${id_prov}.json`);
            // console.log(response);
                
            if (response.ok) {
                let data = await response.json();
                dispatch({type: "GET_CITY", payload: [] });
                for(var i = 0; i < data.length; i++){
                    dispatch({type: "GET_CITY", payload: [{ label: data[i].nama, value: data[i].nama, key: data[i].id }] });
                }
            } else {
                throw Error(`Error status: ${response.status}`);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const changeKecamatan = async (id_kota) => {
    // async function changeKecamatan(id_kota) {
        try {
            const response = await fetch(`${urlKecamatan}/${id_kota}.json`);
            // console.log(response);
                
            if (response.ok) {
                let data = await response.json();
                dispatch({type: "GET_SUBDISTRICT", payload: [] });
                for(var i = 0; i < data.length; i++){
                    dispatch({type: "GET_SUBDISTRICT", payload: [{ label: data[i].nama, value: data[i].nama, key: data[i].id }] });
                }
            } else {
                throw Error(`Error status: ${response.status}`);
            }
        } catch (e) {
            console.log(e);
        }
    }

    const changeKelurahan = async (id_kecamatan) => {
    // async function changeKelurahan(id_kecamatan) {
        try {
            const response = await fetch(`${urlKelurahan}/${id_kecamatan}.json`);
            // console.log(response);
                
            if (response.ok) {
                let data = await response.json();
                dispatch({type: "GET_WARD", payload: [] });
                for(var i = 0; i < data.length; i++){
                    dispatch({type: "GET_WARD", payload: [{ label: data[i].nama, value: data[i].nama, key: data[i].id }] });
                }
            } else {
                throw Error(`Error status: ${response.status}`);
            }
        } catch (e) {
            console.log(e);
        }
    }
}

export default Address
// export { onLoadProvinsi, changeKota, changeKecamatan, changeKelurahan }
