import { View, StyleSheet, Font } from "@react-pdf/renderer"
import TableHeader from "./core/columns/tableHeader"
import TableRows from "./core/columns/tableRows"
import { AttendanceForTeacherGroupType } from "../presence-management/teacher-presence/teacher-presence-table/core/_models"
import amiri from "../../assets/fonts/Amiri-Regular.ttf"
import { useParams } from "react-router-dom";

Font.register({
    family: "Amiri",
    src: amiri,
    fontStyle: "normal",
    fontWeight: "normal",
})

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap:"25px",
        marginRight:50
    },
    table: {
        display: "flex",
       
        width: "40vw",

        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginBottom: 10,
        
    },
})

function generateTables(groups: AttendanceForTeacherGroupType[]) {
    const tables: JSX.Element[] = []
    console.log(groups.toString)

    const { percentage } = useParams<{ percentage: string }>();


    groups.forEach((group, index) => {
        // Adjust rowsPerTable based on your requirements
        // const rowsPerTable = 24;
        console.log("index,", index)

        tables.push(
            <View style={styles.table} key={index}>
                {/* Pass the alldays array to the TableHeader */}
                <TableHeader alldays={group.alldays} />
                <TableRows group={group} />
            </View>
        )
    })

    return tables
}

export default function SalaryStatementTable({
    groups,
}: {
    groups: AttendanceForTeacherGroupType[]
}) {
    return <View style={styles.container}>{generateTables(groups)}</View>
}
