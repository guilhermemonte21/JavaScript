import React, { useState, useEffect } from 'react';
import './EventosPage.css'
import Title from '../../Components/Title/Title';
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import eventTypeImage from "../../assets/images/tipo-evento.svg"
import Container from '../../Components/Container/Container';
import MainContent from '../../Components/MainContent/MainContent'
import { Input, Select } from "../../Components/FormComponents/FormComponents";
import { Button } from "../../Components/FormComponents/FormComponents";
import api from "../../Services/Service";
import eventImage from '../../assets/images/evento.svg'

import TableEv from "./TableEv/TableEv";
import Notification from "../../Components/Notification/Notification";
import Spinner from "../../Components/Spinner/Spinner"
import { Await } from 'react-router-dom';


const EventosPage = () => {
    const [frmEdit, setFrmEdit] = useState(false);
    const [frmEditData, setFrmEditData] = useState(false);
    const [showSpinner, setShowSpinner] = useState(true)
    const [nome, setNome] = useState("");
    const [DataEvent, setDataEvent] =useState("");
    const [descricao, setDescricao] = useState("");
    const [titulo, setTitulo] = useState("");
    const [idEvento, setIdEvento] = useState(null)
    const [idInstituicao, setIdInstituicao]= useState("347f3096-dee0-4040-b172-762079882564")
    const [idTipoEvento, setIdTipoEvento]= useState("")
    const [TipoEvento, setTipoEvento]= useState([])
    const [eventos, setEventos] = useState([]); // Array.
    const [notifyUser, setNotifyUser] = useState({}); // Array.


    useEffect(() => {
        async function loadTypes() {
            try {
                const retorno = await api.get("/Evento");
                setEventos(retorno.data)
                const volta =await api.get("/TiposEvento")
                setTipoEvento(volta.data)
                console.log(TipoEvento)
                
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
      console.log(nome, descricao, idTipoEvento, DataEvent, idInstituicao)

      // Validar pelo menos 3 caractéres.
      if (nome.trim().lenght < 3) {
          alert("O título deve ter no mínimo 3 caractéres!")
          return;
      }

      // Chamar a API
      try {
        const retorno = await api.post("/Evento", {nomeEvento:nome, descricao:descricao, idTipoEvento: idTipoEvento, DataEvento:DataEvent, idInstituicao:idInstituicao});

        setNotifyUser({
          titleNote: "Sucesso",
          textNote: `Cadastrado com sucesso!`,
          imgIcon: "success",
          imgAlt:
            "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
          showMessage: true,
        });
       
        
        const searchEventos = await api.get("/Evento");
        // const revolta = await api.get("/Instituicao")
        // setIdInstituicao(revolta.data.idInstituicao)
        // setIdInstituicao (await api.get("/Evento").data.idInstituicao)
        setEventos(searchEventos.data);
        
        console.log(retorno.data)
     
       
           
        
        setTitulo(""); //limpa a variável
      setNome(""); //limpa a variável
      setDescricao(""); //limpa a variável
      setEventos(""); //limpa a variável
      setDataEvent(""); 
      setIdTipoEvento("");
      
      

      } catch (error) {
          console.log("Erro na API!")
          console.log(error)
      }
  }


    async function handleDelete(idEvento) {    
        try {
            const retorno = await api.delete(`/Evento/${idEvento}`);

            setNotifyUser({
                titleNote: "Sucesso",
                textNote: `Deletado com sucesso!`,
                imgIcon: "success",
                imgAlt:
                  "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
                showMessage: true,
              });
            const retornoGet = await api.get('/Evento')
            setEventos(retornoGet.data)
    
            
          } catch (error) {
            console.log("Erro ao deletar o elemento selecionado...");
          }
       }

       async function handleUpdate(e) {
        e.preventDefault();
        try{
            const retorno = await api.put('/Evento/' + idEvento, {
                
              nome:nome,
              descricao:descricao,
              titulo:titulo,
              Data:DataEvent
            })
            const retornoGet = await api.get('/Evento')
            setEventos(retornoGet.data)
            alert("atualizado com sucesso")
            // editActionAbort()
        }
        catch(error){
            alert("Problems on atualization. Verify your internet conexion")
        }
    }
      // async function showUpdateForm{

      // }


  //   function editActionAbort() {
  //     alert("Cancelar a tela de edição de dados.") 
  //     setTitulo("");
  //     setEventos("");
  //     setDataEvent("");
  //     setDescricao("")
  //     setIdEvento(null)
  // }

    return(
        <MainContent>
        <section className='cadastro-evento-section'>

            <Container>
            <div className='cadastro-evento__box'>
            <Title titleText={'Página de eventos'}/>
            <ImageIllustrator 
            alterText={""}
            imageRender={eventImage}
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
                    id="Nome"
                    placeholder="Nome"
                    name="Nome"
                    type="text"
                    required="required"
                    value={frmEditData.nome}
                    manipulationFunction={(e) => {
                      setNome(e.target.value);

                    }}
                    />
                    <Input 
                    id="Desc"
                    placeholder="Descricao"
                    name="Descricao"
                    type="text"
                    required="required"
                    value={frmEditData.descricao}
                    manipulationFunction={(e) => {
                      setDescricao(e.target.value);
                    }}
                    />
                    <Select
                    dados={TipoEvento}
                    id="tipoEvento"
                    placeholder="Tipo Evento"
                    name="TipoEvento"
                    type="text"
                    required="required"
                    value={frmEditData.idTipoEvento}
                    manipulationFunction={(e) => {
                        setIdTipoEvento(e.target.value)
                    }}
                    />
                     <Input
                      id="Data"
                      placeholder="Data do Evento"
                      name={"data"}
                       type={"date"}
                      required={"required"}
                      value={frmEditData.DataEvent}
                      manipulationFunction={(e) => setDataEvent(e.target.value)} 
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
                    //   handleUpdate(event)
                    }}
                    />

                    <Button
                    textButton="Cancelar"
                    id="cancelar"
                    name="cancelar"
                    type="button"
                    // manipulationFunction={editActionAbort}
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

        <section className="lista-eventos-section">
                <Container>
                    <Title titleText={"Lista de Eventos"} color="white"/>
                    
                    <TableEv 
                    dados={eventos}
                    // fnUpdate={showUpdateForm}
                    fnDelete={handleDelete}           
                    />
                </Container>
            </section>

       
        </MainContent>
    )
};

export default EventosPage;