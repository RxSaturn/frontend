import { Certificate } from "@/core/types/certificate";
import Background from "@/assets/img/certificate/model-2023.png";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";

interface PdfDocumentProps {
  data: Certificate;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  background: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  code: {
    top: 40,
    right: 40,
    display: "flex",
    fontSize: "12px",
    textAlign: "right",
    position: "absolute",
    alignItems: "flex-end",
  },
  codeText: {
    fontWeight: "bold",
    fontFamily: "Helvetica-Bold",
  },
  certificate: {
    display: "flex",
    fontSize: "44px",
    marginTop: "60px",
    textAlign: "center",
    marginBottom: "8px",
    fontWeight: "medium",
    textTransform: "uppercase",
  },
  certificateEventTitle: {
    display: "flex",
    fontSize: "16px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "6px",
    fontFamily: "Helvetica-Bold",
  },
  local: {
    display: "flex",
    fontSize: "12px",
    textAlign: "center",
    marginBottom: "6px",
    textTransform: "uppercase",
  },
  department: {
    display: "flex",
    fontSize: "12px",
    textAlign: "center",
    marginBottom: "16px",
  },
  certificated: {
    display: "flex",
    fontSize: "20px",
    textAlign: "center",
  },
  name: {
    display: "flex",
    fontSize: "32px",
    marginTop: "30px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "30px",
    fontFamily: "Helvetica-Bold",
  },
  text: {
    display: "flex",
    lineHeight: 1.4,
    fontSize: "12px",
    padding: "0 80px",
    textAlign: "center",
  },
  setcImage: {
    width: 75,
    height: 75,
    display: "flex",
    marginTop: "30px",
    marginLeft: "100px",
  },
  ifmgImage: {
    width: 75,
    display: "flex",
    marginRight: "100px",
  },
  footer: {
    left: 240,
    bottom: 120,
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    justifyContent: "space-between",
  },
  sign: {
    display: "flex",
    marginTop: "60px",
    textAlign: "center",
    alignItems: "center",
  },
  signName: {
    width: "150px",
    display: "flex",
    fontSize: "10px",
    paddingTop: "10px",
    textTransform: "uppercase",
  },
  signRole: {
    display: "flex",
    fontSize: "8px",
  },
  authenticity: {
    left: 125,
    bottom: 45,
    fontSize: "8px",
    display: "flex",
    textAlign: "center",
    position: "absolute",
  },
});

export const PdfDocument: React.FC<PdfDocumentProps> = ({ data }) => {
  return (
    <Document>
      <Page orientation="landscape">
        <View style={styles.container}>
          <Image src={Background} style={styles.background} />

          <View style={styles.code}>
            <View style={styles.codeText}>
              <Text>Cód. de verificação</Text>
            </View>

            <Text>{data.authenticityCode}</Text>
          </View>

          <View style={styles.certificate}>
            <Text>Certificado</Text>
          </View>

          <View style={styles.certificateEventTitle}>
            <Text>VII Semana de Engenharia, Tecnologia e Computação</Text>
          </View>

          <View style={styles.local}>
            <Text>INSTITUTO FEDERAL DE EDUCAÇÃO, CIÊNCIA E TECNOLOGIA DE MINAS GERAIS</Text>
          </View>

          <View style={styles.department}>
            <Text>Departamento de Engenharia e Computação</Text>
          </View>

          <View style={styles.certificated}>
            <Text>Certificamos que</Text>
          </View>

          <View style={styles.name}>
            <Text>{data.userName}</Text>
          </View>

          <View style={styles.text}>
            <Text>{data.certificateText}</Text>
          </View>

          <View style={styles.footer}>
            <View style={styles.sign}>
              <Text style={styles.signName}>Jorge Luís Vieira Murilo</Text>
              <Text style={styles.signRole}>Coordenador da SETC</Text>
            </View>

            <View style={{ ...styles.sign, marginLeft: 60 }}>
              <Text style={styles.signName}>Cláudio Ribeiro de Sousa</Text>
              <Text style={styles.signRole}>Professor Orientador</Text>
            </View>
          </View>

          <View style={styles.authenticity}>
            <Text>
              Para verificar a autenticidade deste certificado, acesse https://setc.com.br/validar
              ou utilize o código QR no canto superior esquerdo e informe o código de verificação.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};
