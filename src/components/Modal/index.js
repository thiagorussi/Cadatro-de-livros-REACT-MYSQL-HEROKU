import React, { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";

import { AiOutlineClose } from 'react-icons/ai';

export default function Modal(props) {

    const [tituloEdit, setTituloEdit] = useState()
    const [autorEdit, setAutorEdit] = useState()
    const [dataEdit, setDataEdit] = useState()

    //console.log(props.titulo)

    useEffect(() => {
        if (props.showModal) {
            setTituloEdit(props.titulo)
            setAutorEdit(props.autor)
            setDataEdit(props.data)
        }
    }, [props.showModal]) // qundo o estado de props.showModal mudar executa a função

    // const [editValues, setEditValues] = useState({
    //     id: props.id,
    //     titulo: props.titulo,
    //     autor: props.autor,
    //     data: props.data,
    // });


    // const handleaddValues = (value) => {
    //     setEditValues((prevValues) => ({
    //         ...prevValues,
    //         [value.target.name]: value.target.value,
    //     }));
    // };


    const handleEditLivros = () => {

        Axios.put("https://cadastro-livross.herokuapp.com/edit", {
            id: props.id,
            titulo: tituloEdit,
            autor: autorEdit,
            data: dataEdit,

        }).then(() => {
            props.setListLivros( //Atualizar na tela após editar
                props.listLivros.map((value) => {
                    return value.id == props.id
                        ? {
                            id: props.id,
                            titulo: tituloEdit,
                            autor: autorEdit,
                            data: dataEdit,
                        }
                        : value;
                })
            );
        });

        props.setShowModal(false)

    };

    function limparInputs() {

        setTituloEdit('')
        setAutorEdit('')
        setDataEdit('')
    }

    // function trazerValores() {

    //     setTituloEdit(props.titulo)
    //     setAutorEdit(props.autor)
    //     setDataEdit(props.data)
    // }

    // <Tabela setTituloEdit = {setTituloEdit} setAutorEdit = {setAutorEdit} setDataEdit = {setDataEdit}   />


    return (
        <>
            {props.showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative sm:w-1/2 my-6 mx-auto max-w-6xl">
                            {/*content*/}
                            <div className="border-0 rounded-3xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Editar
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-4 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => props.setShowModal(false)}
                                    >
                                        <span className="opacity-4 text-black  h-6 w-6 text-2xl ">
                                            <AiOutlineClose />
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="mt-3 relative flex-auto">
                                    <div class="w-full px-3 sm:w-1/1">
                                        <div class="mb-5">
                                            <label
                                                htmlFor="titleEdit"
                                                class="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                                Título
                                            </label>
                                            
                                            <input
                                                onChange={((e) => { setTituloEdit(e.target.value) })}
                                                value={tituloEdit}
                                                type="text"
                                                name="titulo"
                                                id="titulo"
                                                defaultValue={props.titulo}
                                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                    </div>
                                    <div class="w-full px-3 sm:w-1/1">
                                        <div class="mb-5">
                                            <label
                                                htmlFor="authorEdit"
                                                class="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                                Autor
                                            </label>
                                            <input
                                                onChange={((e) => { setAutorEdit(e.target.value) })}
                                                value={autorEdit}
                                                type="text"
                                                name="autor"
                                                id="autor"
                                                defaultValue={props.autor}
                                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                    </div>
                                    <div class="w-full px-3 sm:w-1/1">
                                        <div class="mb-5">
                                            <label
                                                htmlFor="dateEdit"
                                                class="mb-3 block text-base font-medium text-[#07074D]"
                                            >
                                                Data
                                            </label>
                                            <input
                                                onChange={((e) => { setDataEdit(e.target.value) })}
                                                value={dataEdit}
                                                type="date"
                                                name="data"
                                                id="data"
                                                defaultValue={props.data}
                                                class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 hover:text-red-800 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => props.setShowModal(false)}
                                    >
                                        CANCELAR
                                    </button>
                                    <button
                                        className="bg-emerald-500 hover:bg-emerald-400 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => handleEditLivros()}
                                    >
                                        Salvar
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}