import { Tabs } from "expo-router/tabs";
import { Ionicons } from "@expo/vector-icons";

export default function Layout() {
    return (
        <Tabs
        screenOptions={{
            headerStyle: {
              backgroundColor: "white",
            },
            headerTintColor: "black",
            headerTitleAlign: "center",
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: 18,
            },
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              backgroundColor: "white",
                borderTopWidth: 0,
                borderTopColor: "gray",
                height: 65,
                paddingBottom: 5,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
            
            },
            tabBarLabelStyle: {
              fontWeight: "normal",
                fontSize: 14,
            },

          }}
        >
            <Tabs.Screen name="collections" options={{
                headerShown: false,
                tabBarLabel: "Cataloge",
                tabBarIcon: ({focused}) => (
                    <Ionicons name="ios-home" size={focused ? 25 : 23} color={focused ? "blue" : "gray"} />
                )
            }}/>
            <Tabs.Screen name="profile" options={{
                headerShown: false,
                tabBarLabel: "Profile",
                tabBarIcon: ({focused}) => (
                    <Ionicons name="ios-person" size={focused ? 25 : 23} color={focused ? "blue" : "gray"} />
                )
            }}/>
            <Tabs.Screen name="history" options={{
                tabBarLabel: "Bookings",
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <Ionicons name="calendar-outline" size={focused ? 25 : 23} color={focused ? "blue" : "gray"} />
                )
            }}/>
            <Tabs.Screen name="supports" options={{
                tabBarLabel: "Need Help",
                tabBarIcon: ({focused}) => (
                    <Ionicons name="chatbox-ellipses-outline" size={focused ? 25 : 23} color={focused ? "blue" : "gray"} />
                )
            }}/>
        </Tabs>
    );
}