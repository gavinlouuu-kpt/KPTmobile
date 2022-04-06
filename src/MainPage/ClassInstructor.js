import React, { useState } from 'react'
import { View, Text, FlatList } from 'react-native'

import { Button } from "native-base";

import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

export default function ClassInstructor({ navigation }) {

  const [selectedId, setSelectedId] = useState(null);
  const [flatListWidth, setFlatListWidth] = useState(0);

  const renderItem = ({ item }) => {
    return (
      <View style={{
        height: 117,
        width: flatListWidth / 3 - 10,
        margin: 5,
        backgroundColor: "#ffffff",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}>
        <View style={{ margin: 5 }}>
          <Text style={{ fontSize: 18, lineHeight: 34, letterSpacing: 0.75 }}>01</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", justifyContent: "space-around" }}>
          <Text style={{ fontSize: 36, fontWeight: "bold", lineHeight: 50, letterSpacing: 1 }}>23</Text>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <MaterialCommunityIconsIcon
              name="heart-outline"
              size={24}
            />
            <Text style={{ fontSize: 14, fontWeight: "500", lineHeight: 22, letterSpacing: 0.25 }}>BPM</Text>
          </View>
        </View>
      </View>
    );
  };


  return (
    <View style={{ flex: 1 }}>
      <View style={{
        height: 52,
        backgroundColor: "#ffffff",
        margin: 10,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 24, fontWeight: "700", lineHeight: 32, letterSpacing: 1, margin: 10 }}>
            Class ID
          </Text>
          <View style={{ position: "relative" }}>
            <View style={{ backgroundColor: "#FFB400", flex: 1, height: "40%", width: "65%", position: "absolute", marginTop: "8%", marginLeft: "40%" }} />
            <Text style={{ fontSize: 48, fontWeight: "bold", letterSpacing: 1, lineHeight: 50, marginVertical: 5, marginLeft: 84, fontStyle: "italic" }}>9999</Text>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, marginHorizontal: 10 }}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={3}
          horizontal={false}
          onLayout={e => setFlatListWidth(e.nativeEvent.layout.width)}
        />
      </View>
      <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
        <Button size="lg" _text={{ fontWeight: 600, fontSize: 16, lineHeight: 28, letterSpacing: 0.75, paddingY: 1.5 }} style={{ borderRadius: 40, backgroundColor: "#5F2EEA" }} onPress={() => navigation.goBack()}>
          End Class
        </Button>
      </View>
    </View>
  )
}