import React from "react";
import ReactPDF, {
  PDFDownloadLink,
  Document,
  Page,
  pdf,
  PDFViewer,
} from "@react-pdf/renderer";
import ReactDOM from "react-dom";
import TicketGenerate from "./Forms/TicketGenerate";

const TicketGen = () => {
  return (
    <div>
      <PDFViewer>
        <TicketGenerate/>
      </PDFViewer><br />
      <PDFDownloadLink document={<TicketGenerate />} fileName="TICKET">
        {({loading}) =>
          loading ? (
            <button>Chargement en cours...</button>
          ) : (
            <button>Télécharger</button>
          )
        }
      </PDFDownloadLink>
    </div>
  );
};

export default TicketGen;
