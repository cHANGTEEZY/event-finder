import { Redirect } from "expo-router";

export default function Index() {
  return <Redirect href={"/(tabs)/profile"} />;
}

// import useAuthStore from "@/store/auth.store";
// import { Redirect } from "expo-router";

// export default function Index() {
//   const { isAuthenticated } = useAuthStore();

//   if (isAuthenticated) {
//     return <Redirect href={"/(tabs)/home"} />;
//   }

//   return <Redirect href={"/(auth)/sign-in"} />;
// }
