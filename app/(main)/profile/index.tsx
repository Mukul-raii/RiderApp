import { LoadingSpinners } from "@/app/components/loadingScreens";
import { userStore } from "@/src/stores/user";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { auth } from "../../../src/utils/firebaseConfig";
import { AntDesign, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProfilePage = () => {
  const user = userStore((state) => state.user);
  const fetchUser = userStore((state) => state.fetchUser);
  const loading = userStore((state) => state.loading);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!user) fetchUser();
  }, [user]);

  if (!user || loading) {
    return <LoadingSpinners />;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: Math.max(insets.bottom, 20) + 80 }, // 80px for navbar
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* 🌅 Header Gradient */}
        <LinearGradient
          colors={["#14213d", "#000000"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.header, { paddingTop: insets.top + 20 }]}
        >
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.name?.charAt(0)?.toUpperCase() ||
                user?.email?.charAt(0)?.toUpperCase() ||
                "?"}
            </Text>
          </View>
          <Text style={styles.nameText}>{user?.name}</Text>
          <Text style={styles.memberText}>Premium Member</Text>
          <View style={styles.ratingContainer}>
            <AntDesign name="star" size={16} color="#fca311" />
            <Text style={styles.ratingText}>4.9</Text>
          </View>
        </LinearGradient>

        {/* 🪪 Info Card */}
        <View style={styles.infoCard}>
          <InfoRow
            icon={<AntDesign name="user" size={20} color="#fca311" />}
            label="Username"
            value={`@${user?.name || "rider"}`}
          />
          <InfoRow
            icon={<MaterialIcons name="email" size={20} color="#14213d" />}
            label="Email"
            value={user?.email}
          />
          <InfoRow
            icon={<Ionicons name="call" size={20} color="#000000" />}
            label="Phone"
            value={user?.phone || "Not provided"}
          />
        </View>

        {/* 📊 Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="car" size={24} color="#fca311" />
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Total Rides</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time" size={24} color="#14213d" />
            <Text style={styles.statValue}>12h</Text>
            <Text style={styles.statLabel}>Time Saved</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="wallet" size={24} color="#000000" />
            <Text style={styles.statValue}>₹240</Text>
            <Text style={styles.statLabel}>Saved</Text>
          </View>
        </View>

        {/* ⚙️ Options Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Settings</Text>
        </View>

        <View style={styles.optionsContainer}>
          <OptionRow
            icon={<Ionicons name="card" size={20} color="#fca311" />}
            label="Payment Methods"
            onPress={() => router.push("/")}
          />
          <OptionRow
            icon={<Ionicons name="notifications" size={20} color="#14213d" />}
            label="Notifications"
            onPress={() => router.push("/")}
          />
          <OptionRow
            icon={
              <Ionicons name="shield-checkmark" size={20} color="#000000" />
            }
            label="Privacy & Security"
            onPress={() => router.push("/")}
          />
          <OptionRow
            icon={
              <AntDesign name="customerservice" size={20} color="#fca311" />
            }
            label="Help & Support"
            onPress={() => router.push("/")}
          />
          <OptionRow
            icon={<AntDesign name="star" size={20} color="#fca311" />}
            label="Rate Your Experience"
            onPress={() => router.push("/")}
          />
        </View>

        {/* 🚪 Logout Button */}
        <TouchableOpacity
          onPress={() => auth.signOut()}
          style={styles.logoutButton}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={20} color="#14213d" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

/* -------------------- Reusable Components -------------------- */
const InfoRow = ({ icon, label, value }: any) => (
  <View style={styles.infoRow}>
    <View style={styles.infoIconContainer}>{icon}</View>
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

const OptionRow = ({ icon, label, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.optionRow}
    activeOpacity={0.7}
  >
    <View style={styles.optionLeft}>
      <View style={styles.optionIconContainer}>{icon}</View>
      <Text style={styles.optionLabel}>{label}</Text>
    </View>
    <AntDesign name="right" size={16} color="#9ca3af" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    height: 280,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffffff",
  },
  nameText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 4,
  },
  memberText: {
    color: "#e5e5e5",
    fontSize: 14,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(252, 163, 17, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  ratingText: {
    color: "#ffffff",
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "600",
  },
  infoCard: {
    marginHorizontal: 20,
    marginTop: -40,
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  infoIconContainer: {
    width: 44,
    height: 44,
    backgroundColor: "#f3f4f6",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    color: "#6b7280",
    fontSize: 12,
    marginBottom: 2,
    fontWeight: "500",
  },
  infoValue: {
    color: "#000000",
    fontWeight: "600",
    fontSize: 15,
  },
  statsContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000000",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: "#6b7280",
    fontWeight: "500",
  },
  sectionHeader: {
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
  },
  optionsContainer: {
    marginHorizontal: 20,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  optionLabel: {
    color: "#1f2937",
    fontWeight: "600",
    fontSize: 15,
  },
  logoutButton: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#fca311",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    gap: 8,
  },
  logoutText: {
    color: "#14213d",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default ProfilePage;
