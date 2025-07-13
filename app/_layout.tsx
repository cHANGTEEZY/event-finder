// app/_layout.tsx
import "./globals.css";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
      <Slot />
  );
}
