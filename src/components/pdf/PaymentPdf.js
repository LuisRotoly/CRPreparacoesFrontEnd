import React from "react";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { getFormmatedDate, getFormmatedMoney } from "../../stringHelper";
import logo from "../../images/ChicoRacingLogo.png";
import { styles } from "./PdfConstants";

function PaymentPdf(props) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.spaceTop}></View>
        <View style={styles.row}>
          <View style={styles.row50Centered}>
            <Image src={logo} style={styles.image} />
          </View>
          <View style={styles.row50Centered}>
            <Text style={styles.titleData}>Chico Racing Oficina</Text>
            <Text style={styles.titleData}>
              Rua Francisca da Luz Quartim Barbosa, 50
            </Text>
            <Text style={styles.titleData}>Boa Vista, Itapira-SP</Text>
            <Text style={styles.titleData}>Whatsapp (19) 99380-9690</Text>
          </View>
        </View>
        <View style={styles.spaceTop}></View>
        <View style={styles.rowColored}>
          <Text style={styles.clientData}>Dados Cliente / Moto</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row60}>Nome: {props.client}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row60}>Moto/Mod: {props.bikeNameAndBrand}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row60}>Placa: {props.plate}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row60}>
            Valor Total do Serviço: R$ {getFormmatedMoney(props.totalValue)}
          </Text>
        </View>

        <View style={styles.spaceTop}></View>
        <View style={styles.rowColored}>
          <Text style={styles.boldAndFontSize16}>Pagamentos</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.paymentData}>Data de Pagamento</Text>
          <Text style={styles.paymentNotes}>Observações</Text>
          <Text style={styles.paymentFormat}>Forma</Text>
          <Text style={styles.paymentTotal}>Valor</Text>
        </View>
        {props.paymentList.map(
          ({ id, value, notes, paymentFormat, paidAt }) => (
            <View style={styles.row} key={id}>
              <Text style={styles.row25Centered}>
                {getFormmatedDate(paidAt)}
              </Text>
              <Text style={styles.row40}>{notes}</Text>
              <Text style={styles.row20Centered}>{paymentFormat.type}</Text>
              <Text style={styles.row15Centered}>
                R$ {getFormmatedMoney(value)}
              </Text>
            </View>
          )
        )}
        <View style={styles.row}>
          <Text style={styles.value}></Text>
          <Text style={styles.value}></Text>
          <Text style={styles.value}></Text>
          <Text style={styles.value}></Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.description}></Text>
          <Text style={styles.quantity}></Text>
          <Text style={styles.totalToBePaid}>Resta a pagar</Text>
          <Text style={styles.total}>
            R$ {getFormmatedMoney(props.valueToBePaid)}
          </Text>
        </View>
        <View style={styles.spaceTop}>
          <Text style={styles.paymentFinalData}>
            Data Finalização: {getFormmatedDate(props.finalizedAt)}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
export default PaymentPdf;
