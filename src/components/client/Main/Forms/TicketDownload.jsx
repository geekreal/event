import { PDFDownloadLink } from '@react-pdf/renderer'
import React from 'react'
import TicketGen from '../TicketGen'

const TicketDownload = () => {
  return (
    <div>
      <PDFDownloadLink document={<TicketGen />} fileName="mon_fichier.pdf">
      Télécharger le fichier PDF
    </PDFDownloadLink>
    </div>
  )
}

export default TicketDownload