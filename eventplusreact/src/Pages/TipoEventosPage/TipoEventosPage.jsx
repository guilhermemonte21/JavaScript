import React, { useState, useEffect } from 'react';
import './TipoEventosPage.css';
import Title from '../../Components/Title/Title';
import MainContent from '../../Components/MainContent/MainContent'

import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import eventTypeImage from "../../assets/images/tipo-evento.svg"
import Container from '../../Components/Container/Container';

import { Input } from "../../Components/FormComponents/FormComponents";
import { Button } from "../../Components/FormComponents/FormComponents";
import api from "../../Services/Service";

import TableTp from "./TableTp/TableTp";
import Notification from "../../Components/Notification/Notification";
import Spinner from "../../Components/Spinner/Spinner"

const TipoEventosPage = () => {

    const [frmEdit, setFrmEdit] = useState(false);
    const [showSpinner, setShowSpinner] = useState(true)
    const [titulo, setTitulo] = useState("");
    const [idEvento, setIdEvento] = useState(null)
    const [tipoEventos, setTipoEventos] = useState([]); // Array.
    const [notifyUser, setNotifyUser] = useState({}); // Array.

    useEffect(() => {
        async function loadTypes() {
            try {
                const retorno = await api.get("/TiposEvento");
                setTipoEventos(retorno.data)
            } catch(error) {
                console.log("Erro na API");
                console.log(error);
            }
        }
        loadTypes();
    }, []);

   async function handleSubmit(e) {
        // Parar o submit do formulário.
        e.preventDefault();

        // Validar pelo menos 3 caractéres.
        if (titulo.trim().lenght < 3) {
            alert("O título deve ter no mínimo 3 caractéres!")
            return;
        }

        // Chamar a API
        try {
          const retorno = await api.post("/TiposEvento", {titulo:titulo});

          setNotifyUser({
            titleNote: "Sucesso",
            textNote: `Cadastrado com sucesso!`,
            imgIcon: "success",
            imgAlt:
              "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
            showMessage: true,
          });

          console.log("Cadastrado com sucesso!");           
          console.log(retorno.data);
          
          setTitulo("") // Limpa a variavel.

        } catch (error) {
            console.log("Erro na API!")
            console.log(error)
        }
    }


    async function handleDelete(idTipoEvento) {    
        try {
            const retorno = await api.delete(`/TiposEvento/${idTipoEvento}`);

            setNotifyUser({
                titleNote: "Sucesso",
                textNote: `Deletado com sucesso!`,
                imgIcon: "success",
                imgAlt:
                  "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
                showMessage: true,
              });
            const retornoGet = await api.get('/TiposEvento')
            setTipoEventos(retornoGet.data)
    
            
          } catch (error) {
            console.log("Erro ao deletar o elemento selecionado...");
          }
       }


    // ATUALIZAÇÃO DOS DADOS:
    async function showUpdateForm(idElemento) {
       setFrmEdit(true)
        const retorno = await api.get('./TiposEvento' + idElemento)

        try{
        setTitulo(retorno.data.titulo)
        setIdEvento(retorno.data.idTipoEvento)
        }
        catch(error){
            alert("Nao foi possivel mostrar a tela de edit. try again")
        }
    }

    async function handleUpdate(e) {
        e.preventDefault();
        try{
            const retorno = await api.put('/TiposEvento/' + idEvento, {
                titulo:titulo
            })
            const retornoGet = await api.get('/TiposEvento')
            setTipoEventos(retornoGet.data)
            alert("atualizado com sucesso")
            editActionAbort()
        }
        catch(error){
            alert("Problems on atualization. Verify your internet conexion")
        }
    }

    function editActionAbort() {
        alert("Cancelar a tela de edição de dados.") 
        setTitulo("");
        setIdEvento(null)
    }


    return (
        <MainContent>
            <Notification {...notifyUser} setNotifyUser={setNotifyUser}/>
            { showSpinner ? <Spinner/> :null}
            {/* CADASTRO DE TIPO DE EVENTO */}
            <section className='cadastro-evento-section'>

            <Container>
            <div className='cadastro-evento__box'>
            <Title titleText={'Página de tipos de eventos'}/>
            <ImageIllustrator 
            alterText={""}
            imageRender={eventTypeImage}
            />

<form action="" 
              className="ftipo-evento"
              onSubmit={frmEdit ? handleUpdate : handleSubmit}
              >
                 
                 {/* Cadastrar ou editar? */}
                 {
                  !frmEdit ? 
                  (
                    //Cadastrar
                    <>
                    <Input 
                    id="Titulo"
                    placeholder="Título"
                    name="titulo"
                    type="text"
                    required="required"
                    value={titulo}
                    manipulationFunction={(e) => {
                      setTitulo(e.target.value);
                    }}
                    />
                 
                    <Button
                    textButton="Cadastrar"
                    id="cadastrar"
                    name="cadastrar"
                    type="submit"
                    />
                    </>
                  ) : (

                    //Editar
                    <>
                    <Input 
                    id="Titulo"
                    placeholder={titulo}
                    name="titulo"
                    type="text"
                    required="required"
                    value={titulo}
                    manipulationFunction={(e) => {
                      setTitulo(e.target.value);
                    }}
                    />
                 <div className='buttons-editbox'>
                    <Button
                    textButton="Atualizar"
                    id="atualizar"
                    name="atualizar"
                    type="button"
                    className="Atualizar"
                    additionalClass="button-component--middle"
                    manipulationFunction={(event) => {
                      handleUpdate(event)
                    }}
                    />

                    <Button
                    textButton="Cancelar"
                    id="cancelar"
                    name="cancelar"
                    type="button"
                    manipulationFunction={editActionAbort}
                    additionalClass="button-component--middle"
                    />
                 </div>
                    </>
                  
                  )
                 }
              </form>
            </div>
          </Container>
        </section>

            {/* LISTAGEM DE TIPO DE EVENTO */}
            <section className="lista-eventos-section">
                <Container>
                    <Title titleText={"Lista Tipo de Eventos"} color="white"/>
                    
                    <TableTp 
                    dados={tipoEventos}
                    fnUpdate={showUpdateForm}
                    fnDelete={handleDelete}           
                    />
                </Container>
            </section>
        </MainContent>
    );
};

export default TipoEventosPage;