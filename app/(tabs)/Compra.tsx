import React, { useState } from "react";
import { View, Text, SectionList, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const INITIAL_DATA = [
	{
		title: "Frios e Laticínios",
		data: [
			{ id: "1", name: "Iogurte", ideal: 6, bought: 0, checked: false },
			{ id: "2", name: "Queijo", ideal: 2, bought: 0, checked: false },
		],
	},
	{
		title: "Limpeza",
		data: [{ id: "6", name: "Sabão em pó", ideal: 1, bought: 0, checked: false }],
	},
];

export default function CompraScreen() {
	const [sections, setSections] = useState(INITIAL_DATA);

	const toggleItem = (itemId: string) => {
		setSections((prevSections) =>
			prevSections.map((section) => ({
				...section,
				data: section.data.map((item) => {
					if (item.id === itemId) {
						const isNowChecked = !item.checked;
						return {
							...item,
							checked: isNowChecked,
							bought: isNowChecked ? item.ideal : 0,
						};
					}
					return item;
				}),
			})),
		);
	};

	const updateBought = (itemId: string, delta: number) => {
		setSections((prevSections) =>
			prevSections.map((section) => ({
				...section,
				data: section.data.map((item) => {
					if (item.id === itemId) {
						const newBought = Math.max(0, item.bought + delta);
						const isChecked = newBought >= item.ideal;
						return { ...item, bought: newBought, checked: isChecked };
					}
					return item;
				}),
			})),
		);
	};

	const finalizarCompra = () => {
		Alert.alert("Sucesso", "Compra finalizada com sucesso! Os itens irão para a sua Dispensa.");
	};

	return (
		<View style={styles.container}>
			<SectionList
				contentContainerStyle={{ paddingBottom: 80 }}
				sections={sections}
				keyExtractor={(item) => item.id}
				renderSectionHeader={({ section: { title } }) => (
					<View style={[styles.sectionHeader, { justifyContent: "center" }]}>
						<Text style={styles.sectionTitle}>{title}</Text>
					</View>
				)}
				renderItem={({ item }) => (
					<View style={[styles.itemRow, item.checked && styles.itemRowChecked]}>
						{/* Lado Esquerdo: Checkbox e Nome */}
						<TouchableOpacity style={styles.leftActions} activeOpacity={0.7} onPress={() => toggleItem(item.id)}>
							<MaterialCommunityIcons
								name={item.checked ? "checkbox-marked" : "checkbox-blank-outline"}
								size={26}
								color={item.checked ? "#4CAF50" : "#ccc"}
								style={{ marginRight: 12 }}
							/>
							<Text style={[styles.itemName, item.checked && styles.itemNameChecked]}>{item.name}</Text>
						</TouchableOpacity>

						{/* Lado Direito: Contador (Comprado / Ideal) */}
						<View style={styles.counterBox}>
							<TouchableOpacity
								style={[styles.counterBtn, item.checked && { backgroundColor: "#81c784" }]}
								onPress={() => updateBought(item.id, -1)}
							>
								<Text style={styles.counterBtnText}>-</Text>
							</TouchableOpacity>

							<Text style={styles.counterValue}>
								{item.bought} <Text style={{ color: "#888", fontSize: 12 }}>/ {item.ideal}</Text>
							</Text>

							<TouchableOpacity
								style={[styles.counterBtn, item.checked && { backgroundColor: "#81c784" }]}
								onPress={() => updateBought(item.id, 1)}
							>
								<Text style={styles.counterBtnText}>+</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			/>

			{/* BOTÃO FINALIZAR COMPRA */}
			<View style={styles.footerContainer}>
				<TouchableOpacity style={styles.finishBtn} onPress={finalizarCompra} activeOpacity={0.8}>
					<MaterialCommunityIcons name="check-all" size={24} color="#fff" style={{ marginRight: 8 }} />
					<Text style={styles.finishBtnText}>Finalizar Compra</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#f8f9fa" },
	sectionHeader: {
		backgroundColor: "#e3f2fd",
		paddingVertical: 8,
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
	itemRowChecked: { backgroundColor: "#f0fdf4" },
	leftActions: { flexDirection: "row", alignItems: "center", flex: 1 },
	itemName: { fontSize: 16, color: "#333" },
	itemNameChecked: { textDecorationLine: "line-through", color: "#888" },

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
	counterValue: { width: 45, textAlign: "center", fontSize: 16, fontWeight: "bold", color: "#333" },

	footerContainer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		padding: 16,
		backgroundColor: "#fff",
		borderTopWidth: 1,
		borderColor: "#e0e0e0",
		elevation: 10,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	finishBtn: {
		backgroundColor: "#4CAF50",
		flexDirection: "row",
		paddingVertical: 14,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	finishBtnText: {
		color: "#fff",
		fontSize: 18,
		fontWeight: "bold",
	},
});
