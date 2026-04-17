import React, { useState } from "react";
import { View, Text, SectionList, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const INITIAL_DATA = [
	{
		title: "Frios e Laticínios",
		data: [
			{ id: "1", name: "Iogurte", count: 0 },
			{ id: "2", name: "Leite", count: 0 },
		],
	},
	{
		title: "Limpeza",
		data: [{ id: "4", name: "Desinfetante", count: 0 }],
	},
];

export default function DispensaScreen() {
	const [sections, setSections] = useState(INITIAL_DATA);

	const updateCount = (itemId: string, delta: number) => {
		setSections((prevSections) =>
			prevSections.map((section) => ({
				...section,
				data: section.data.map((item) => {
					if (item.id === itemId) {
						return { ...item, count: Math.max(0, item.count + delta) };
					}
					return item;
				}),
			})),
		);
	};

	const addCategory = () => {
		const newCategory = {
			title: `Nova Categoria ${sections.length + 1}`,
			data: [],
		};
		setSections([...sections, newCategory]);
	};

	return (
		<View style={styles.container}>
			<SectionList
				sections={sections}
				keyExtractor={(item, index) => item.id + index}
				renderSectionHeader={({ section: { title } }) => (
					<View style={styles.sectionHeader}>
						<Text style={styles.sectionTitle}>{title}</Text>
						<TouchableOpacity style={styles.addSectionBtn}>
							<MaterialCommunityIcons name="plus" size={20} color="#fff" />
						</TouchableOpacity>
					</View>
				)}
				renderItem={({ item }) => (
					<View style={styles.itemRow}>
						<View style={styles.leftActions}>
							<TouchableOpacity style={styles.iconBtn}>
								<MaterialCommunityIcons name="pencil-outline" size={22} color="#333" />
							</TouchableOpacity>
							<TouchableOpacity style={styles.iconBtn}>
								<MaterialCommunityIcons name="trash-can-outline" size={22} color="#333" />
							</TouchableOpacity>
							<Text style={styles.itemName}>{item.name}</Text>
						</View>

						<View style={styles.counterBox}>
							<TouchableOpacity style={styles.counterBtn} onPress={() => updateCount(item.id, -1)}>
								<Text style={styles.counterBtnText}>-</Text>
							</TouchableOpacity>
							<Text style={styles.counterValue}>{item.count}</Text>
							<TouchableOpacity style={styles.counterBtn} onPress={() => updateCount(item.id, 1)}>
								<Text style={styles.counterBtnText}>+</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
				renderSectionFooter={({ section }) =>
					section.data.length === 0 ?
						<View style={styles.emptySection}>
							<Text style={styles.emptyText}>Nenhum item nesta categoria</Text>
						</View>
					:	null
				}
			/>

			<TouchableOpacity style={styles.fab} onPress={addCategory} activeOpacity={0.8}>
				<MaterialCommunityIcons name="folder-plus" size={28} color="#fff" />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#f8f9fa" },
	sectionHeader: {
		backgroundColor: "#e3f2fd",
		paddingVertical: 14,
		paddingHorizontal: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 24,
		marginBottom: 12,
		marginHorizontal: 16,
		borderRadius: 20,
	},

	sectionTitle: {
		fontSize: 14,
		fontWeight: "900",
		color: "#1976d2",
		flex: 1,
		textAlign: "left",
		textTransform: "uppercase",
		letterSpacing: 1,
	},
	itemRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 14,
		paddingHorizontal: 16,
		backgroundColor: "#fff",
		marginHorizontal: 16,
		marginBottom: 8,
		borderRadius: 12,

		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
	},
	addSectionBtn: {
		backgroundColor: "#2196F3",
		width: 32,
		height: 32,
		borderRadius: 16,
		justifyContent: "center",
		alignItems: "center",
	},
	leftActions: { flexDirection: "row", alignItems: "center", flex: 1 },
	iconBtn: { marginRight: 16 },
	itemName: { fontSize: 16, color: "#333" },
	counterBox: { flexDirection: "row", alignItems: "center" },
	counterBtn: {
		backgroundColor: "#2196F3",
		width: 32,
		height: 32,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 4,
	},
	counterBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
	counterValue: { width: 35, textAlign: "center", fontSize: 16 },

	fab: {
		position: "absolute",
		right: 20,
		bottom: 20,
		backgroundColor: "#2196F3",
		width: 60,
		height: 60,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 3,
	},
	emptySection: {
		padding: 20,
		alignItems: "center",
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderColor: "#eee",
	},
	emptyText: {
		color: "#999",
		fontStyle: "italic",
	},
});
