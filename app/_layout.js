import { Stack } from 'expo-router/stack';

export default function Layout() {
  return (
    <Stack
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
      }}
    >
      <Stack.Screen name="index" options={{headerShown: false}}/>
      <Stack.Screen name="AuthScreen" options={{headerShown: true,
        title: "Sign In",
      }} />
      <Stack.Screen name="home" options={{headerShown: false}} />
    </Stack>
  );
}