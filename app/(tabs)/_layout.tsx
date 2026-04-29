import React from "react";
import { Tabs } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
	return (
		<Tabs
      initialRouteName="Dispensa"
      screenOptions={{
        // --- Estilos da Barra Inferior (Abas) ---
        tabBarActiveTintColor: '#2196F3',
        tabBarInactiveTintColor: '#9e9e9e',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 0,  
          elevation: 10,     
          shadowColor: '#000', 
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 10,
        },

        // --- Estilos do Cabeçalho Superior (Header) ---
        headerStyle: { 
          backgroundColor: '#ffffff', 
        },
        headerShadowVisible: false, 
        headerTitleAlign: 'left',
        headerTitleStyle: { 
          fontSize: 28,             
          fontWeight: '600',        
          color: '#1a1a1a',         
          letterSpacing: -0.5,
        },
      }}
    >
			<Tabs.Screen
				name="Compra"
				options={{
					title: "Compra",
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cart-check" size={size} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="Lista"
				options={{
					title: "Lista",
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="clipboard-text-outline" size={size} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="Dispensa"
				options={{
					title: "Dispensa",
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="format-list-bulleted" size={size} color={color} />,
				}}
			/>
		</Tabs>
	);
}
