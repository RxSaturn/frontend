import { ParticipationReportUser } from "@/core/types/reports";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";
import Brand from "@/assets/img/setc2024.png";
import { PRINCIPAL_FULL_NAME } from "@/core/constants";

type PdfDocumentProps = {
  title: string;
  classText: string;
  courseText: string;
  users: ParticipationReportUser[];
  columns: { name: string; size: number; ignore?: boolean }[];
};

const styles = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
  },
  fixedHeader: {
    left: 0,
    top: 10,
    color: "white",
    fontSize: "12px",
    textAlign: "center",
    position: "absolute",
    padding: "4px 8px 4px 4px",
    backgroundColor: "#1863FF",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
  },
  brand: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
    marginBottom: "20px",
  },
  image: {
    height: 75,
    width: 75,
  },
  header: {
    width: "100%",
    display: "flex",
    fontSize: "18px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
    textTransform: "uppercase",
    fontFamily: "Helvetica-Bold",
  },
  title: {
    width: "100%",
    display: "flex",
    fontSize: "14px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
    fontFamily: "Helvetica-Bold",
  },
  subTitle: {
    width: "100%",
    display: "flex",
    fontSize: "14px",
    textAlign: "center",
    marginBottom: "20px",
    textTransform: "uppercase",
  },
  rowView: {
    display: "flex",
    fontSize: "12px",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderCollapse: "collapse",
  },
  pageNumber: {
    right: 0,
    bottom: 10,
    width: "20%",
    color: "white",
    padding: "4px",
    fontSize: "12px",
    textAlign: "center",
    position: "absolute",
    borderTopLeftRadius: "10px",
    backgroundColor: "#1863FF",
    borderBottomLeftRadius: "10px",
  },
});

export const PdfDocument = ({ title, users, columns, classText, courseText }: PdfDocumentProps) => {
  return (
    <Document>
      <Page style={styles.page}>
        <>
          <Text fixed style={styles.fixedHeader}>
            {PRINCIPAL_FULL_NAME}
          </Text>

          <View style={styles.brand}>
            <Image source={Brand} style={styles.image} />
          </View>

          <View style={styles.title}>
            <Text>{title}</Text>
          </View>

          <View style={styles.header}>
            <Text>{`Relatório de presença`}</Text>
          </View>

          {!!courseText && (
            <View style={styles.subTitle}>
              <Text>{`${courseText.replace("-", "")}${classText.replace("-", " - ")}`}</Text>
            </View>
          )}

          <View style={styles.rowView} fixed>
            {columns.map((item, index) => {
              return (
                !item.ignore && (
                  <Text
                    key={index}
                    style={{
                      width: `${item.size}%`,
                      padding: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                      border: "1px solid #000",
                      fontFamily: "Helvetica-Bold",
                    }}
                  >
                    {item.name}
                  </Text>
                )
              );
            })}
          </View>

          {users.map((rowData, index) => (
            <View style={styles.rowView} key={`${rowData.name}-${index}`} wrap={false}>
              <Text
                style={{ width: `${columns[0].size}%`, border: "1px solid #000", padding: "4px" }}
              >
                {index + 1}
              </Text>

              <Text
                style={{
                  padding: "4px",
                  textAlign: "left",
                  border: "1px solid #000",
                  width: `${columns[1].size}%`,
                }}
              >
                {rowData.name}
              </Text>

              {!courseText && (
                <Text
                  style={{ width: `${columns[2].size}%`, border: "1px solid #000", padding: "4px" }}
                >
                  {rowData.course}
                </Text>
              )}

              <Text
                style={{ width: `${columns[3].size}%`, border: "1px solid #000", padding: "4px" }}
              >
                {`${Number(rowData.participationPercentage).toFixed(0)}%`}
              </Text>
            </View>
          ))}

          <Text
            fixed
            style={styles.pageNumber}
            render={({ pageNumber, totalPages }) => {
              return `${pageNumber} / ${totalPages}`;
            }}
          />
        </>
      </Page>
    </Document>
  );
};
