import React from "react";
import { Page, Text, View, Document, Image } from "@react-pdf/renderer";
import {
  getFormmatedDate,
  getFormmatedMoney,
  isEmpty,
} from "../../stringHelper";
import logo from "../../images/ChicoRacingLogo.png";
import { styles } from "./PdfConstants";

function BudgetPdf(props) {
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
          <Text style={styles.row60}>Nome: {props.client[0]}</Text>
          <Text style={styles.row40}>Placa: {props.bike[0]}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row60}>
            Endereço: {props.address},{props.client[1]}
          </Text>
          <Text style={styles.row40}>Moto/Mod: {props.bike[1]}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row60}>CPF/CNPJ: {props.client[2]}</Text>
          <Text style={styles.row40}>Ano: {props.bike[2]}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row60}>Telefone: {props.client[3]}</Text>
          <Text style={styles.row40}>KM: {props.bike[3]}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.row60}>Data Nasc: {props.client[4]}</Text>
          <Text style={styles.row40}>Marca: {props.bike[4]}</Text>
        </View>

        <View style={styles.spaceTop}></View>
        <View style={styles.rowColored}>
          <Text style={styles.boldAndFontSize16}>
            Problemas Relatados Pelo Cliente
          </Text>
        </View>
        <View style={styles.row}>
          <Text>{props.problems}</Text>
        </View>

        <View style={styles.spaceTop}></View>
        <View style={styles.rowColored}>
          <Text style={styles.boldAndFontSize16}>Peças/Serviços</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.description}>Descrição</Text>
          <Text style={styles.quantity}>Qtd</Text>
          <Text style={styles.value}>Valor Unit.</Text>
          <Text style={styles.total}>Total</Text>
        </View>
        {props.laborOrBikePartBudgetList.map(
          ({ name, quantity, value }, index) => (
            <View style={styles.row} key={index}>
              <Text style={styles.row60}>{name}</Text>
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
          <Text style={styles.value}></Text>
          <Text style={styles.total}></Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.description}></Text>
          <Text style={styles.quantity}></Text>
          <Text style={styles.parts}>Total Serviços</Text>
          <Text style={styles.parts}>
            R$ {getFormmatedMoney(props.totalValueBikeService)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.description}></Text>
          <Text style={styles.quantity}></Text>
          <Text style={styles.parts}>Total Peças</Text>
          <Text style={styles.parts}>
            R$ {getFormmatedMoney(props.totalValueBikePart)}
          </Text>
        </View>
        {isEmpty(props.discountPercentage) ? (
          <View style={styles.row}>
            <Text style={styles.description}></Text>
            <Text style={styles.quantity}></Text>
            <Text style={styles.value}>Total Geral</Text>
            <Text style={styles.total}>
              R$ {getFormmatedMoney(props.totalValue)}
            </Text>
          </View>
        ) : (
          <View style={styles.row}>
            <Text style={styles.description}>
              Desconto de {props.discountPercentage}%
            </Text>
            <Text style={styles.quantity}></Text>
            <Text style={styles.value}>Total Geral</Text>
            <Text style={styles.total}>
              R$ {getFormmatedMoney(props.totalValue)}
            </Text>
          </View>
        )}
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
export default BudgetPdf;
