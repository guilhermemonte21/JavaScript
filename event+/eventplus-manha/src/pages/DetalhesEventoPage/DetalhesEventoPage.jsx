import React from 'react';
import api, { loginResource } from "../../Services/Service";
import Container from "../../components/Container/Container";
import Title from "../../components/Title/Title";
import MainContent from "../../components/MainContent/MainContent";
import { Input } from '../../components/FormComponents/FormComponents';


const DetalhesEventoPage = () => {
    const [nomeEvento, setNomeEvento] = useState(""); //Nome do evento
  const [descricaoEvento, setDescricaoEvento] = useState(""); //Descrição do Evento
  const [dataEvento, setDataEvento] = useState(""); //Tipo do Evento escolhido ???
  const [feedback, setFeedback] = useState([]);


    return (
        

        <Container>
          <Title titleText={nomeEvento} className="custom-title" />

          <Input
                      type="date"
                      required={true}
                      id="dataEvento"
                      name="dataEvento"
                      placeholder={dataEvento}
                      value={dataEvento}
                      manipulationFunction={(e) =>
                        setDFataEvento(e.target.value)
                      }

                
            />
            <Input
             type="text"
             required={true}
             id="descricao"
             name="descricao"
             placeholder="Descrição"
             value={descricaoEvento}
             manipulationFunction={(e) =>
               setDescricaoEvento(e.target.value)
             }
            />
            



              {/* Listagem de tipo de eventos */}
        <section className="lista-eventos-section">
          <Container>
            <Title titleText={"Detalhes de Eventos"} color="white" />
            <Table
              dados={eventos}
              
            />
          </Container>
        </section>
        <MainContent/>
          </Container>
    );
};

export default DetalhesEventoPage;