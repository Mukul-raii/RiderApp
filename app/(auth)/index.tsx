import { signOut } from "firebase/auth";
import { Button, Text, View } from "react-native";
import { auth } from "../../firebaseConfig";

const Page = () => {
  const user = auth.currentUser;

  return (
    <View>
      <Text>Welcome back {user?.email}</Text>
      <Button title="Sign out" onPress={() => signOut(auth)} />
    </View>
  );
};
export default Page;
