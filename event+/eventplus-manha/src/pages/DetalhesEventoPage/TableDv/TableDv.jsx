import React from "react";
import comentaryIcon from "../../../assets/images/comentary-icon.svg";
import { dateFormateDbToView } from "../../../Utils/stringFunction";

import "./TableDv.css";

const TableDv = ({ dados, description, descricaoEvento, fnConnect = null, fnShowModal = null }) => {
  return (
    <table className="tbal-data">
      <thead className="tbal-data__head">
        <tr className="tbal-data__head-row tbal-data__head-row--red-color">
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Evento
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
           Descrição
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Data
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Tipos Evento
          </th>
          <th className="tbal-data__head-title tbal-data__head-title--big">
            Feedback
          </th>
          
        </tr>
      </thead>
      <tbody>
        {dados.map((e) => {
          return (
            <tr className="table-data__head-row" key={tp.idEvento}>
            <td className="table-data__data table-data__data--big">
              {tp.nomeEvento}
            </td>
            <td
              className="table-data__data table-data__data--big table-data__data--handover"
              data-tooltip-id="description-tooltip"
              data-tooltip-content={e.descricao}
              data-tooltip-place="top"
            >
              {tp.descricao.substr(0, 15)} ...
              <Tooltip
                id="description-tooltip"
                className="custom-tootip"
              />
            </td>
            <td className="table-data__data table-data__data--big">
              {dateFormateDbToView(e.dataEvento)}
            </td>
            <td className="table-data__data table-data__data--big">
              {e.tiposEvento.titulo}
            </td>
            <td className="table-data__data table-data__data--big">
              {e.comentariosEvento}
            </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableDv;