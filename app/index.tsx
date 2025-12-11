import { Feather as Icon } from "@expo/vector-icons";
import React, { type ComponentProps } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BREAKPOINTS = {
  tablet: 768,
  largeTablet: 1024, // breakpoint baru untuk large tablet
};

// tipe nama icon yang valid dari Feather
type IconName = ComponentProps<typeof Icon>["name"];

const featureCards: Array<{
  title: string;
  description: string;
  icon: IconName;
}> = [
  {
    title: "Dashboard",
    description: "Ringkasan singkat performa bisnis Anda.",
    icon: "grid",
  },
  {
    title: "Calendar",
    description: "Atur jadwal meeting dan to-do secara terstruktur.",
    icon: "calendar",
  },
  {
    title: "Tasks",
    description: "Lacak progres tugas tim secara real-time.",
    icon: "check-circle",
  },
  {
    title: "Messages",
    description: "Komunikasi cepat antar anggota tim.",
    icon: "message-circle",
  },
];

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();

  const isTablet = width >= BREAKPOINTS.tablet;
  const isLargeTablet = width >= BREAKPOINTS.largeTablet;
  const isLandscape = width > height;

  // orientation-aware untuk GRID 
  const isWideLayout = isTablet || isLandscape;

  // ukuran icon responsif
  const iconSize = isLargeTablet ? 32 : isTablet ? 28 : 24;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          isTablet ? styles.containerTablet : styles.containerMobile,
        ]}
      >
        <View style={[styles.hero, isTablet ? styles.heroTablet : styles.heroMobile]}>
          <Text style={styles.overline}>
            {width >= BREAKPOINTS.tablet ? "Tablet" : "Mobile"} View
          </Text>
          <Text style={styles.title}>Dashboard Responsive</Text>
          <Text style={styles.subtitle}>
            Contoh layout yang otomatis menyesuaikan tampilan tablet & ponsel.
          </Text>
        </View>

        <View
          style={[
            styles.cardGrid,
            isWideLayout ? styles.cardGridTablet : styles.cardGridMobile,
          ]}
        >
          {featureCards.map((card) => (
            <View
              key={card.title}
              style={[
                styles.card,
                isWideLayout ? styles.cardTablet : styles.cardMobile,
              ]}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Icon name={card.icon} size={iconSize} style={styles.cardIcon} />
              </View>

              <Text style={styles.cardDesc}>{card.description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B1120",
  },
  container: {
    flexGrow: 1,
    gap: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  containerMobile: {
    alignItems: "stretch",
  },
  containerTablet: {
    maxWidth: 960,
    alignSelf: "center",
  },
  containerLargeTablet: {
    maxWidth: 1120,
  },
  hero: {
    borderRadius: 24,
    padding: 24,
    backgroundColor: "#111C33",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.07)",
  },
  heroMobile: {
    alignItems: "flex-start",
  },
  heroTablet: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 24,
  },
  overline: {
    color: "#8AB4FF",
    letterSpacing: 1,
    fontSize: 12,
    textTransform: "uppercase",
    marginBottom: 8,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    color: "#B8C6E3",
    fontSize: 16,
    marginTop: 8,
  },
  cardGrid: {
    flexWrap: "wrap",
  },
  cardGridMobile: {
    flexDirection: "column",
    gap: 12,
  },
  cardGridTablet: {
    flexDirection: "row",
    gap: 16,
    justifyContent: "space-between",
  },
  card: {
    flexGrow: 1,
    borderRadius: 20,
    padding: 20,
    backgroundColor: "#162544",
  },
  cardMobile: {
    width: "100%",
  },
  cardTablet: {
    width: "48%",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    columnGap: 8,
  },
  cardIcon: {
    marginLeft: "auto",
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  cardDesc: {
    color: "#B8C6E3",
    fontSize: 14,
    lineHeight: 20,
  },
});