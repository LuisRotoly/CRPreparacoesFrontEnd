import React from "react";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import { getFormmatedDate, getFormmatedMoney } from "../../stringHelper";
import logo from "../../images/ChicoRacingLogo.png";
import { styles } from "./PdfConstants";

function SingleSalePdf(props) {
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
          <Text style={styles.clientData}>Dados Cliente</Text>
          <Text style={styles.bikeData}>Dados Moto</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row60}>Nome: {props.client}</Text>
          <Text style={styles.row40}>Placa: {props.bike[0]}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row60}>Endereço: {props.address}</Text>
          <Text style={styles.row40}>Moto/Mod: {props.bike[1]}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row60}>CPF/CNPJ: </Text>
          <Text style={styles.row40}>Ano: {props.bike[2]}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row60}>Telefone: </Text>
          <Text style={styles.row40}>KM: {props.bike[3]}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row60}>Data Nasc:</Text>
          <Text style={styles.row40}>Marca: {props.bike[4]}</Text>
        </View>
        <View style={styles.spaceTop}></View>
        <View style={styles.rowColored}>
          <Text style={styles.boldAndFontSize16}>Peças</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.description}>Descrição</Text>
          <Text style={styles.quantity}>Qtd</Text>
          <Text style={styles.value}>Valor Unit.</Text>
          <Text style={styles.total}>Total</Text>
        </View>
        {props.singleSaleRelBikePartList.map(
          ({ bikePart, quantity, value }) => (
            <View style={styles.row} key={bikePart.id}>
              <Text style={styles.row60}>{bikePart.name}</Text>
              <Text style={styles.row10Centered}>{quantity}</Text>
              <Text style={styles.row15Centered}>
                R$ {getFormmatedMoney(value)}
              </Text>
              <Text style={styles.row15Centered}>
                R$ {getFormmatedMoney(quantity * value)}
              </Text>
            </View>
          )
        )}
        <View style={styles.row}>
          <Text style={styles.description}></Text>
          <Text style={styles.quantity}></Text>
          <Text style={styles.value}>Total Geral</Text>
          <Text style={styles.total}>
            R$ {getFormmatedMoney(props.totalValue)}
          </Text>
        </View>

        <View style={styles.space60Top}>
          <Text style={styles.data}>
            ______________________________________________
          </Text>
        </View>
        <View style={styles.spaceTop}>
          <Text style={styles.data}>
            Data: {getFormmatedDate(props.createdDate)}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
export default SingleSalePdf;
