import { useRideStore } from "@/src/stores/useRiderStore";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGlobalLoader } from "@/src/stores/useGlobalLoader";

const Page = () => {
  const { allrides, loading } = useRideStore();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    useGlobalLoader.getState().show();
    useRideStore.getState().getAllRides();
    useGlobalLoader.getState().hide();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={["#14213d", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 20 }]}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerIcon}>
            <Ionicons name="time-outline" size={28} color="#fca311" />
          </View>
          <Text style={styles.headerTitle}>My Rides</Text>
          <Text style={styles.headerSubtitle}>
            {allrides?.length || 0} trips completed
          </Text>
        </View>
      </LinearGradient>

      {/* Content */}
      <View style={styles.content}>
        {/* Loader */}
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#fca311" />
            <Text style={styles.loaderText}>Loading your rides...</Text>
          </View>
        )}

        {/* Empty State */}
        {!loading && (!allrides || allrides.length === 0) ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="car-outline" size={64} color="#d1d5db" />
            </View>
            <Text style={styles.emptyTitle}>No Rides Yet</Text>
            <Text style={styles.emptySubtitle}>
              Your ride history will appear here once you start booking rides
            </Text>
          </View>
        ) : (
          <FlatList
            data={allrides}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderRide}
            contentContainerStyle={[
              styles.listContainer,
              { paddingBottom: Math.max(insets.bottom, 20) + 100 },
            ]}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

const getStatusStyle = (status: string) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return {
        bg: "#dcfce7",
        text: "Completed",
        color: "#16a34a",
        icon: "checkmark-circle",
      };
    case "cancelled":
      return {
        bg: "#fee2e2",
        text: "Cancelled",
        color: "#dc2626",
        icon: "close-circle",
      };
    case "ongoing":
      return {
        bg: "#dbeafe",
        text: "Ongoing",
        color: "#2563eb",
        icon: "play-circle",
      };
    default:
      return {
        bg: "#fef3c7",
        text: status,
        color: "#d97706",
        icon: "time",
      };
  }
};

const renderRide = ({ item }: { item: any }) => {
  const statusStyle = getStatusStyle(item.status);

  return (
    <View style={styles.rideCard}>
      {/* Header Row */}
      <View style={styles.rideHeader}>
        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={16} color="#6b7280" />
          <Text style={styles.dateText}>
            {new Date(item.createdAt).toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
          <Ionicons
            name={statusStyle.icon as any}
            size={12}
            color={statusStyle.color}
          />
          <Text style={[styles.statusText, { color: statusStyle.color }]}>
            {statusStyle.text}
          </Text>
        </View>
      </View>

      {/* Route Section */}
      <View style={styles.routeContainer}>
        {/* From Location */}
        <View style={styles.locationRow}>
          <View style={styles.locationIconContainer}>
            <View style={styles.fromDot} />
          </View>
          <View style={styles.locationDetails}>
            <Text style={styles.locationLabel}>Pickup</Text>
            <Text style={styles.locationText} numberOfLines={2}>
              {item.fromLocation}
            </Text>
          </View>
        </View>

        {/* Connector Line */}
        <View style={styles.connectorLine} />

        {/* To Location */}
        <View style={styles.locationRow}>
          <View style={styles.locationIconContainer}>
            <Ionicons name="location" size={18} color="#fca311" />
          </View>
          <View style={styles.locationDetails}>
            <Text style={styles.locationLabel}>Drop-off</Text>
            <Text style={styles.locationText} numberOfLines={2}>
              {item.toLocation}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.rideFooter}>
        <View style={styles.fareContainer}>
          <Text style={styles.fareLabel}>Total Fare</Text>
          <Text style={styles.fareAmount}>
            ₹{item.amount?.toFixed(2) || "—"}
          </Text>
        </View>
        <TouchableOpacity style={styles.detailsButton} activeOpacity={0.7}>
          <Text style={styles.detailsButtonText}>View Details</Text>
          <Ionicons name="chevron-forward" size={16} color="#fca311" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerContent: {
    alignItems: "center",
  },
  headerIcon: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(252, 163, 17, 0.2)",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#e5e5e5",
  },
  content: {
    flex: 1,
    marginTop: -16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  loaderText: {
    marginTop: 16,
    color: "#6b7280",
    fontSize: 14,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingTop: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    backgroundColor: "#f3f4f6",
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 20,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  rideCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  rideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dateText: {
    fontSize: 13,
    color: "#6b7280",
    fontWeight: "500",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  routeContainer: {
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  locationIconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  fromDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#14213d",
  },
  connectorLine: {
    width: 2,
    height: 24,
    backgroundColor: "#e5e7eb",
    marginLeft: 15,
    marginVertical: 4,
  },
  locationDetails: {
    flex: 1,
    marginLeft: 8,
  },
  locationLabel: {
    fontSize: 11,
    color: "#9ca3af",
    fontWeight: "600",
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  locationText: {
    fontSize: 14,
    color: "#1f2937",
    fontWeight: "500",
    lineHeight: 18,
  },
  rideFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  fareContainer: {
    flex: 1,
  },
  fareLabel: {
    fontSize: 11,
    color: "#6b7280",
    fontWeight: "500",
    marginBottom: 2,
  },
  fareAmount: {
    fontSize: 20,
    fontWeight: "700",
    color: "#14213d",
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#fef3e2",
    borderRadius: 12,
    gap: 4,
  },
  detailsButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fca311",
  },
});
