import React from "react";
import { Tabs } from "expo-router";
import { Image, View, StyleSheet } from "react-native";
import {LikeProvider} from "../../contexts/LikeContext";

const PlaceholderIcon = ({ source, color, width = 25, height = 25 }: { source: any; color: string; width?: number; height?: number }) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={source}
        style={[styles.iconImage, { tintColor: color, width, height }]}
        resizeMode="contain"
      />
    </View>
  );
};

const TabLayout = () => {
  return (
    <LikeProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#32CD32",
          tabBarInactiveTintColor: "#808080",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "white",
            borderColor: "#32CD32",
            borderWidth: 1,
            borderRadius: 10,
            height: 40,
            elevation: 5,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            position: "absolute",
            width: "80%",
            alignSelf: "center",
            marginBottom: 20,
            marginLeft: 40,
          },
        }}
      >

        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,

            tabBarIcon: ({ color }) => (
              <PlaceholderIcon
                source={require("../../assets/icons/home.png")}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="read"
          options={{
            title: "Read",
            headerShown: false,

            tabBarIcon: ({ color }) => (
              <PlaceholderIcon
                source={require("../../assets/icons/donenil.png")}
                color={color}
                width={20}
                height={20}
              />
            ),
          }}
        />


      </Tabs>
    </LikeProvider>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  iconImage: {
    width: 25,
    height: 25,
  },
});

export default TabLayout;
