import React from 'react'
import { Page, Text, View, Document, 
  StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';
import  affiche  from "../../../../assets/client/images/affiche.jpg";

// Create styles
const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    desc: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    image:{
      height: "200px",
      width: "200px"
    }
  });

const TicketGenerate = () => {

  return(
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.image}>
          <Image style={styles.image} src={affiche}/>
        </View>
        <View style={styles.desc}>
          <Text>www.ivenos.com</Text>
            <Text>Date</Text>
            <Text>N°: TX: </Text>
            <Text>Numéro paiement</Text>
          <Text>Type ticket VIP</Text>
            <Text>Event name - Lieu - Heure - Exigence</Text>
            <Text>Description</Text>
          <Text>ORGANISATEUR - Contact : </Text>
        </View>
          
          {/* <Text
            style={styles.pageNumber}
            render={({pageNumber, totalPages}) => `${pageNumber} / ${totalPages}`}
          ></Text> */}
      </Page>
    </Document>
  )
}

export default TicketGenerate