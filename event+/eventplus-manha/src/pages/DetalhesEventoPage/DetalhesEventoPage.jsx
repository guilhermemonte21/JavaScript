import React from 'react';
import api, { loginResource } from "../../Services/Service";
import Container from "../../components/Container/Container";
import Title from "../../components/Title/Title";
import MainContent from "../../components/MainContent/MainContent";
import { Input } from '../../components/FormComponents/FormComponents';


const DetalhesEventoPage = () => {
  const { id } = useParams();
  const { userData } = useContext(UserContext);

  const [eventos, setEventos] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [idEvento, setidEvento] = useState(id);
  const [nomeEvento, setnomeEvento] = useState("");
  const [descricao, setdescricao] = useState("");
  const [dataEvento, setdataEvento] = useState("");


  async function loadEventsType() {
    setShowSpinner(true);

    try {
        const promise = await api.get(eventsResource)
        setEventos(promise.data);
        const promiseEvento = await api.get(`/Evento/${idEvento}`)
        setdescricao(promiseEvento.data.descricao)
        setnomeEvento(promiseEvento.data.nomeEvento)
        setdataEvento(promiseEvento.data.dataEvento)


    } catch (error) { }
    setShowSpinner(false);
}
async function loadComentario() {
    setShowSpinner(true);

    try {
        const promiseFull = await api.get(commentaryEventResource + `?id=${id}`)
        const promise = await api.get(commentaryEventResource + `/ListarSomenteExibe?id=${id}`)
       
        console.log(userData.role);
       setComentarios(userData.role === "Administrador"  ? promiseFull.data : promise.data );
       
       
    } catch (error) { }
    setShowSpinner(false);
}
  
async function loadComentario() {
  setShowSpinner(true);

  try {
      const promiseFull = await api.get(commentaryEventResource + `?id=${id}`)
      const promise = await api.get(commentaryEventResource + `/ListarSomenteExibe?id=${id}`)
     
      console.log(userData.role);
     setComentarios(userData.role === "Administrador"  ? promiseFull.data : promise.data );
     
     
  } catch (error) { }
  setShowSpinner(false);
}



useEffect(() => {

  loadEventsType();
  loadComentario();

}, [userData])


    return (
        

      <>
      <MainContent>
          <Container>
              <Title titleText={"Event Details"} additionalClass="custom-title" />
              <br />
                  

              <div className="container__detalhes">

        

                  <DetalhesEvents
                      key={idEvento}
                      title={nomeEvento}
                      description={descricao}
                      eventDate={dataEvento}
                  />

                 
                  <Table
                      dados={comentarios}
                      idEvento={idEvento}
                  />




              </div>

          </Container>
      </MainContent>
      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}


  </>
    );
};

export default DetalhesEventoPage;