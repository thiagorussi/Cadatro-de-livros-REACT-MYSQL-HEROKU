import { useState, useEffect } from 'react';
import './App.css';
import Axios from 'axios';

import { Tabela } from './components/exportsComponents'

function App() {

  //const [livros, setLivros] = useState([]); //BANCO

  const [codigo, setCodigo] = useState(true)
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [data, setData] = useState('')
  const [pesquisaCodigo, setPesquisaCodigo] = useState('')


  const [codigoPesquisa, setCodigoPesquisa] = useState("");
  const [tituloPesquisa, setTituloPesquisa] = useState("");
  const [autorPesquisa, setAutorPesquisa] = useState("");
  const [dataPesquisa, setDataPesquisa] = useState("");

  const [inCadastro, setInCadastro] = useState(true);
  const [tituloInicio, setTituloInicio] = useState('Cadastro de Livros');


  const [listLivros, setListLivros] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => { // puxando dados do banco e setando na variável listLivros
    Axios.get("https://cadastro-livross.herokuapp.com/getLivros").then((response) => { setListLivros(response.data); });
  }, [/*listLivros //atualiza sempre, faz get toda hora*/]);


  function cadastrar() {

    // const data = [codigo, titulo, autor, data];
    // const invalidData = Array.from(data.filter(d => !Boolean(d)));
    // if (invalidData.length) {
    //   alert('Preencha todos os campos');
    // }

    let isThis = true
    if (!titulo || !autor || !data) { //validar preenchimento de todos os campos
      alert('Preencha todos os campos')
    } else {
      listLivros.forEach(livro => {
        if (livro.id == codigo) {
          alert('CÓDIGO JÁ CADASTRADO!')
          isThis = false
        }
      });

      if (isThis) {
        Axios.post("https://cadastro-livross.herokuapp.com/register", {
          titulo,
          autor,
          data,
        }).then(() => {
          Axios.post("https://cadastro-livross.herokuapp.com/search", { //Para atualizar na tela
            titulo,
            autor,
            data,
          }).then((response) => {
            setListLivros([
              ...listLivros,
              {
                id: response.data[0].id,
                titulo,
                autor,
                data,
              },
            ]);
          });
        });
      };

    }

    limparInputs()
  }

  function pesquisar() {
    let isThis = false
    if (!codigoPesquisa) {
      alert('Digite o código que deseja pesquisar!')
      isThis = true
    } else {
      listLivros.forEach((livro) => {
        if (livro.id == codigoPesquisa) {
          setPesquisaCodigo(livro.id);
          setTituloPesquisa(livro.titulo);
          setAutorPesquisa(livro.autor);
          setDataPesquisa(livro.data);
          isThis = true
        }
      })
    }

    if (!isThis) {
      alert('Código não existe!')
    }
  }

  function limparInputs() {

    setTitulo('')
    setAutor('')
    setData('')
  }

  // function excluir(codigo) {
  //   listLivros.forEach((livro, index) => {
  //     if (livro.id == codigo) {
  //       Axios.delete(`http://localhost:3001/delete/${livro.id}`)
  //     }
  //   });
  // }

  function titulosIguais() {
    let qtdIguais = 0

    listLivros.forEach((livroOne, indexOne) => {
      let isThis = false
      listLivros.forEach((livroTwo, indexTwo) => {
        if (livroOne.titulo == livroTwo.titulo && indexOne != indexTwo) {
          //comparar titulos iguais e não comparar com ele mesmo 
          isThis = true;
        }
      });

      if (isThis) {
        qtdIguais++
      }

    });
    return qtdIguais;
  }

  function onOff() { //Pesquisar ou Cadastrar
    if (inCadastro) {
      setInCadastro(false);
      setTituloInicio('Pesquisar Livros')
    } else {
      setInCadastro(true);
      setTituloInicio('Cadastro de Livros')
    }
  }

  return (

    <>
      <div className='containerMain'  >

        <div class="container" >
          <div className='tituloCadastro'>
            <div class="mt-5 shadow-lg p-8 sm:px-24 text-sm rounded-3xl flex flex-row justify-between items-center w-full ">
              <label htmlFor="large-toggle" class="inline-flex relative items-center cursor-pointer">
                <input onClick={onOff} type="checkbox" value="" id="large-toggle" class="sr-only peer"></input>
                <div class="w-16 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 dark:peer-focus:ring-blue-100 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[8px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-[#6A64F1]"></div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
              </label>

              <div className='tituloCadastro'>{tituloInicio}</div>
            </div>
          </div>

          {
            inCadastro && (
              <>
                <div class="shadow-lg px-3 rounded-3xl p-7"> {/*INPUTS CADASTRO */}
                  <div class="mx-auto w-full mt-8 ">
                    <div class="-mx-3 flex flex-wrap">
                      
                      <div class="w-full px-3 sm:w-1/5">
                        <div class="mb-5">
                          <label
                            htmlFor="title"
                            class="mb-3 block text-base font-medium text-[#07074D]"
                          >
                            Título
                          </label>
                          <input
                            onChange={((e) => { setTitulo(e.target.value) })} value={titulo}
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Título"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          />
                        </div>
                      </div>
                      <div class="w-full px-3 sm:w-1/5">
                        <div class="mb-5">
                          <label
                            htmlFor="author"
                            class="mb-3 block text-base font-medium text-[#07074D]"
                          >
                            Autor
                          </label>
                          <input
                            onChange={((e) => { setAutor(e.target.value) })} value={autor}
                            type="text"
                            name="author"
                            id="author"
                            placeholder="Autor"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          />
                        </div>
                      </div>
                      <div class="w-full px-3 sm:w-1/5">
                        <div class="mb-5">
                          <label
                            htmlFor="date"
                            class="mb-3 block text-base font-medium text-[#07074D]"
                          >
                            Data
                          </label>
                          <input
                            onChange={((e) => { setData(e.target.value) })} value={data}
                            type="date"
                            name="date"
                            id="date"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-5 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          />
                        </div>
                      </div>
                      <div class="w-full px-3 sm:w-1/5">
                        <label
                          htmlFor="date"
                          class="sm:mb-9 block text-base"
                        >
                        </label>
                        <button
                          onClick={cadastrar}
                          class="hover:bg-[#706bf4] hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        >
                          Cadastrar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <Tabela
                  setListLivros={setListLivros} listLivros={listLivros} showModal={showModal} setShowModal={setShowModal}
                  codigo={codigo} titulo={titulo} autor={autor} data={data}>
                </Tabela>

                <div class="shadow-lg rounded-2xl font-semibold text-gray-700 mb-3 ">
                  <p class="p-3 text-left">Livros com mesmo título: {titulosIguais()}</p>
                </div>
              </>
            )
          }

          {
            !inCadastro && (

              <div className="containerPesquisa"> {/*PESQUISA*/}

                <div className='Inputpesquisa' class="  flex flex-wrap shadow-lg p-7 rounded-3xl mt-5 ">
                  <div class="w-full  sm:w-1/4 mt-5 ">
                    <div class="mb-3">
                      <label
                        htmlFor="search"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Pesquisar
                      </label>
                      <input
                        onChange={((e) => { setCodigoPesquisa(e.target.value) })} value={codigoPesquisa}
                        type="text"
                        name="search"
                        id="search"
                        placeholder='Código'
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div class="w-full sm:px-3 sm:w-1/5 ">
                    <label
                      htmlFor=""
                      class="sm:mb-14 block text-base"
                    >
                    </label>
                    <button
                      onClick={pesquisar}
                      class="hover:bg-[#706bf4] hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                    >
                      Pesquisar
                    </button>
                  </div>

                </div>

                <table class="px-3 w-full flex flex-row flex-no-wrap sm:bg-white overflow-hidden  my-5 shadow-lg  rounded-2xl">
                  <thead class="text-white">
                    <tr class=" rounded-md bg-[#6A64F1] flex flex-col flex-no wrap sm:table-row rounded-l-lg  mb-2 sm:mb-0">
                      <th class="p-3 text-left">Código</th>
                      <th class="p-3 text-left">Título</th>
                      <th class="p-3 text-left">Autor</th>
                      <th class="p-3 text-left">Data</th>

                    </tr>
                  </thead>
                  <tbody class=" flex-1 sm:flex-none  ">

                    <tr class="hover:bg-gray-100 flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0  ">
                      <td class="p-3">{pesquisaCodigo}</td>
                      <td class="p-3">{tituloPesquisa}</td>
                      <td class="p-3">{autorPesquisa}</td>
                      <td class="p-3">{dataPesquisa}</td>
                    </tr>

                  </tbody>
                </table>

              </div>
            )
          }

        </div>
      </div>
    </>
  );
}

export default App;
