import React, { useState } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet } from 'react-native';

const INITIAL_DATA = [
  {
    title: 'Frios e Laticínios',
    data: [
      { id: '1', name: 'Iogurte', ideal: 6, buy: 6 },
      { id: '2', name: 'Leite', ideal: 6, buy: 0 },
      { id: '3', name: 'Queijo', ideal: 1, buy: 0 },
    ],
  },
  {
    title: 'Limpeza',
    data: [
      { id: '4', name: 'Desinfetante', ideal: 3, buy: 0 },
      { id: '5', name: 'Detergente', ideal: 4, buy: 0 },
      { id: '6', name: 'Sabão em pó', ideal: 2, buy: 2 },
    ],
  },
];

export default function ListaScreen() {
  const [sections, setSections] = useState(INITIAL_DATA);

  const updateBuy = (itemId: string, delta: number) => {
    setSections(prevSections => 
      prevSections.map(section => ({
        ...section,
        data: section.data.map(item => {
          if (item.id === itemId) {
            return { ...item, buy: Math.max(0, item.buy + delta) };
          }
          return item;
        })
      }))
    );
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <View style={[styles.sectionHeader, { justifyContent: 'center' }]}>
            <Text style={styles.sectionTitle}>{title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <View style={styles.leftActions}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.ideal}</Text>
              </View>
              <Text style={styles.itemName}>{item.name}</Text>
            </View>

            <View style={styles.counterBox}>
              <TouchableOpacity 
                style={styles.counterBtn}
                onPress={() => updateBuy(item.id, -1)}
              >
                <Text style={styles.counterBtnText}>-</Text>
              </TouchableOpacity>
              
              <Text style={styles.counterValue}>{item.buy}</Text>
              
              <TouchableOpacity 
                style={styles.counterBtn}
                onPress={() => updateBuy(item.id, 1)}
              >
                <Text style={styles.counterBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  sectionHeader: { 
    backgroundColor: '#e3f2fd',
    paddingVertical: 8, 
    paddingHorizontal: 16, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  
  sectionTitle: { 
    fontSize: 14, 
    fontWeight: '900',
    color: '#1976d2',           
    flex: 1, 
    textAlign: 'left',
    textTransform: 'uppercase', 
    letterSpacing: 1,           
  },
  itemRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingVertical: 14, 
    paddingHorizontal: 16, 
    backgroundColor: '#fff', 
    marginHorizontal: 16, 
    marginBottom: 8,      
    borderRadius: 12,     
    elevation: 2,         
    shadowColor: '#000',  
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2, 
  },
  leftActions: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    flex: 1 
  },
  itemName: { 
    fontSize: 16, 
    color: '#333' 
  },
  counterBox: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  counterBtn: { 
    backgroundColor: '#2196F3', 
    width: 32, 
    height: 32, 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 4 
  },
  counterBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  counterValue: { width: 35, textAlign: 'center', fontSize: 16 },
  badge: {
    backgroundColor: '#03A9F4', 
    width: 28, 
    height: 28, 
    borderRadius: 14, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 12 
  },
  badgeText: { color: '#fff', fontWeight: 'bold', fontSize: 14 }
});