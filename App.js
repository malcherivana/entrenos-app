import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Tabs } from "expo-router/tabs";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { COLORS } from "./src/theme";
import DataStatusBanner from "./src/components/DataStatusBanner";

import HomeScreen from "./src/screens/HomeScreen";
import SaudeScreen from "./src/screens/SaudeScreen";
import TratamentoScreen from "./src/screens/TratamentoScreen";
import PerguntasScreen from "./src/screens/PerguntasScreen";
import VagasScreen from "./src/screens/VagasScreen";
import DescarteScreen from "./src/screens/DescarteScreen";
import AdminScreen from "./src/screens/AdminScreen";

const ICONS = {
  index: "home",
  saude: "heart",
  tratamento: "list",
  perguntas: "message-circle",
  vagas: "briefcase",
  descarte: "trash-2",
  admin: "settings",
};

function HeaderLogo() {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={require("./assets/logo-symbol.png")} style={{ width: 26, height: 22, marginRight: 8 }} resizeMode="contain" />
      <Text style={{ fontFamily: "serif", fontStyle: "italic", fontSize: 18, color: COLORS.ink }}>EntreNós</Text>
    </View>
  );
}

function AdminHeaderButton() {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.navigate("/admin")} style={{ marginRight: 16 }}>
      <Feather name="settings" size={20} color={COLORS.inkSoft} />
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" backgroundColor={COLORS.cream} />
      <DataStatusBanner />
      <Tabs
        screenOptions={({ route }) => ({
          headerStyle: { backgroundColor: COLORS.cream, elevation: 0, shadowOpacity: 0, borderBottomWidth: 1, borderBottomColor: COLORS.line },
          headerTitleAlign: "center",
          headerTitle: () => <HeaderLogo />,
          headerRight: route.name === "admin" ? undefined : () => <AdminHeaderButton />,
          tabBarActiveTintColor: COLORS.ink,
          tabBarInactiveTintColor: COLORS.inkSoft,
          tabBarStyle: { backgroundColor: COLORS.cream, borderTopColor: COLORS.line },
          tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
          tabBarIcon: ({ color }) => <Feather name={ICONS[route.name]} size={20} color={color} />,
        })}
      >
        <Tabs.Screen name="index" component={HomeScreen} />
        <Tabs.Screen name="saude" component={SaudeScreen} />
        <Tabs.Screen name="tratamento" component={TratamentoScreen} />
        <Tabs.Screen name="perguntas" component={PerguntasScreen} />
        <Tabs.Screen name="vagas" component={VagasScreen} />
        <Tabs.Screen name="descarte" component={DescarteScreen} />
        <Tabs.Screen name="admin" component={AdminScreen} options={{ tabBarButton: () => null }} />
      </Tabs>
    </>
  );
}
