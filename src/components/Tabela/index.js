import React from 'react'
import Axios from 'axios';
import { useState } from 'react';

import { FaTrashAlt } from 'react-icons/fa';
import { GrEdit } from 'react-icons/gr';
import Modal from '../Modal';

export default function Tabela(props) {

    function excluir(codigo) {
        props.listLivros.forEach((livro) => {
            if (livro.id == codigo) {
                Axios.delete(`https://cadastro-livross.herokuapp.com/delete/${livro.id}`).then(() => {
                    props.setListLivros( //Atualizar na tela após deletar
                        props.listLivros.filter((value) => {
                            return value.id != livro.id;
                        })
                    );
                });
            }
        });
    }

    // const [livroMomento, setLivroMomento] = useState({
    //     codigo: '',
    //     titulo: '',
    //     autor: '',
    //     data: '',
    // })


    // function enviarModal (livroMomento1,isthis) { // os dados da posição correta para fazer a edição no MODAL
    //     livroMomento.codigo = livroMomento1.codigo
    //     livroMomento.titulo = livroMomento1.titulo
    //     livroMomento.autor = livroMomento1.autor
    //     livroMomento.data = livroMomento1.data
    //     props.setShowModal(isthis)
    // }

    const [codigo, setCodigo] = useState('')
    const [titulo, setTitulo] = useState('')
    const [autor, setAutor] = useState('')
    const [data, setData] = useState('')

    function enviarModal(livro, isthis) { // os dados da posição correta para fazer a edição no MODAL
        setCodigo(livro.id)
        setTitulo(livro.titulo)
        setAutor(livro.autor)
        setData(livro.data)
        props.setShowModal(isthis)
    }

    return (
        <>
            <Modal
                showModal={props.showModal} setShowModal={props.setShowModal}
                id={codigo}
                titulo={titulo}
                autor={autor}
                data={data}
                listLivros={props.listLivros}
                setListLivros={props.setListLivros}
            />

            <div class="overflow-x-auto relative">
                <table class=" px-3 w-full flex flex-row flex-no-wrap sm:bg-white shadow-lg rounded-2xl overflow-hidden my-5 "> {/*TABELA CADASTRO*/}
                    <thead class="text-white">
                        {
                            props.listLivros.map((livro) => {
                                return (
                                    <tr key={livro.id} class="rounded-md bg-[#6A64F1] flex flex-col flex-no wrap sm:table-row rounded-l-lg mb-2 mb-3 outline-none">
                                        <th class="p-3 text-left">Código</th>
                                        <th class="p-3 text-left">Título</th>
                                        <th class="p-3 text-left">Autor</th>
                                        <th class="p-3 text-left">Data</th>
                                        <th class="p-3 text-left" width="110px">Excluir</th>
                                    </tr>
                                )
                            })
                        }

                    </thead>
                    <tbody class="flex-1 sm:flex-none ">
                        {

                            props.listLivros.map((livro) => {
                                return (
                                    <tr key={livro.id} class="hover:bg-gray-100 flex flex-col flex-no wrap sm:table-row mb-3 sm:mb-0 mt-3  ">
                                        <td class="p-3">{livro.id}</td>
                                        <td class="p-3">{livro.titulo}</td>
                                        <td class="p-3">{livro.autor}</td>
                                        <td class="p-3">{livro.data}</td>
                                        <td class=" p-3 ">
                                            <button class='mr-5' onClick={() => excluir(livro.id)}><FaTrashAlt /></button>
                                            <button onClick={() => enviarModal(livro, true)} ><GrEdit /></button></td>
                                    </tr>
                                )
                            })

                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}