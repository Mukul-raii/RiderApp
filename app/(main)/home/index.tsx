import { LocationPin } from "@/app/components/locationPin";
import { DriverLocation } from "@/app/components/viewDriver";
import { useRideStore } from "@/src/stores/useRiderStore";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const Page = () => {
  const router = useRouter();
  const { liveRide } = useRideStore();
  const [showMap, setShowMap] = useState(false);
  const [showDriverLocation, setShowDriverLocation] = useState(false);

  useEffect(() => {
    useRideStore.getState().getliveRide();
  }, []);

  if (showMap) return <LocationPin type="pickup" setShowMap={setShowMap} />;
  if (showDriverLocation)
    return <DriverLocation setShowDriverLocation={setShowDriverLocation} />;

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 56,
          paddingBottom: 24,
        }}
      >
        {/* Header */}
        <View style={{ marginBottom: 32 }}>
          <View className="flex-row justify-between items-center">
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "#14213d",
                  fontSize: 28,
                  fontWeight: "700",
                  marginBottom: 4,
                }}
              >
                Hey, Rider 👋
              </Text>
              <Text style={{ color: "#14213d", fontSize: 14, opacity: 0.6 }}>
                Where would you like to go today?
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#e5e5e5",
                padding: 12,
                borderRadius: 16,
              }}
            >
              <Feather name="settings" size={22} color="#14213d" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Live Ride - Priority Section */}
        {liveRide && (
          <View style={{ marginBottom: 24 }}>
            <LinearGradient
              colors={["#fca311", "#e09200"]}
              style={{
                borderRadius: 24,
                padding: 24,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 12,
                elevation: 5,
              }}
            >
              <View
                className="flex-row justify-between items-start"
                style={{ marginBottom: 16 }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 20,
                      fontWeight: "700",
                      marginBottom: 4,
                    }}
                  >
                    🚖 Active Ride
                  </Text>
                  <Text
                    style={{ color: "#ffffff", fontSize: 13, opacity: 0.9 }}
                  >
                    {liveRide.status === "ASSIGNED"
                      ? "Driver is on the way"
                      : liveRide.status === "IN_PROGRESS"
                        ? "Your ride is in progress"
                        : "Preparing your ride"}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: "rgba(255,255,255,0.25)",
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 11,
                      fontWeight: "600",
                    }}
                  >
                    {liveRide.status}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderRadius: 16,
                  padding: 16,
                  marginBottom: 16,
                }}
              >
                <View
                  className="flex-row items-center"
                  style={{ marginBottom: 12 }}
                >
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "#ffffff",
                      marginRight: 12,
                    }}
                  />
                  <Text style={{ color: "#ffffff", fontSize: 15, flex: 1 }}>
                    {liveRide.fromLocation}
                  </Text>
                </View>
                <View
                  style={{
                    width: 2,
                    height: 16,
                    backgroundColor: "rgba(255,255,255,0.4)",
                    marginLeft: 3,
                    marginBottom: 4,
                  }}
                />
                <View className="flex-row items-center">
                  <Feather
                    name="map-pin"
                    size={16}
                    color="#ffffff"
                    style={{ marginRight: 8 }}
                  />
                  <Text
                    style={{
                      color: "#ffffff",
                      fontSize: 15,
                      fontWeight: "600",
                      flex: 1,
                    }}
                  >
                    {liveRide.toLocation}
                  </Text>
                </View>
              </View>

              {liveRide.status === "IN_PROGRESS" && (
                <View>
                  <View style={{ marginBottom: 12 }}>
                    <Text
                      style={{
                        color: "#111827",
                        fontSize: 16,
                        fontWeight: "800",
                        letterSpacing: 2,
                        backgroundColor: "rgba(255,255,255,0.9)",
                        paddingVertical: 8,
                        paddingHorizontal: 12,
                        borderRadius: 12,
                        alignSelf: "flex-start",
                      }}
                    >
                      OTP: {String(liveRide.otp)}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => setShowDriverLocation(true)}
                    style={{
                      backgroundColor: "#ffffff",
                      paddingVertical: 14,
                      paddingHorizontal: 24,
                      borderRadius: 16,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Feather
                      name="navigation"
                      size={18}
                      color="#fca311"
                      style={{ marginRight: 8 }}
                    />
                    <Text
                      style={{
                        color: "#fca311",
                        fontSize: 15,
                        fontWeight: "700",
                      }}
                    >
                      Track Driver
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </LinearGradient>
          </View>
        )}

        {/* Search Box */}
        <TouchableOpacity
          onPress={() => router.push("/(main)/home/rideForm")}
          style={{
            backgroundColor: "#e5e5e5",
            borderRadius: 20,
            padding: 20,
            marginBottom: 24,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#ffffff",
              padding: 10,
              borderRadius: 12,
              marginRight: 16,
            }}
          >
            <Feather name="search" size={20} color="#14213d" />
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#14213d",
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 2,
              }}
            >
              Where to?
            </Text>
            <Text style={{ color: "#14213d", fontSize: 13, opacity: 0.6 }}>
              Search your destination
            </Text>
          </View>
          <Feather name="chevron-right" size={20} color="#14213d" />
        </TouchableOpacity>

        {/* No Active Ride */}
        {!liveRide && (
          <View
            style={{
              backgroundColor: "#e5e5e5",
              borderRadius: 20,
              padding: 32,
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <View
              style={{
                backgroundColor: "#ffffff",
                padding: 16,
                borderRadius: 20,
                marginBottom: 16,
              }}
            >
              <Feather name="map-pin" size={32} color="#14213d" />
            </View>
            <Text
              style={{
                color: "#14213d",
                fontSize: 17,
                fontWeight: "600",
                marginBottom: 4,
              }}
            >
              No active rides
            </Text>
            <Text style={{ color: "#14213d", fontSize: 14, opacity: 0.6 }}>
              Start your journey today
            </Text>
          </View>
        )}

        {/* Stats */}
        <View className="flex-row" style={{ marginBottom: 24, gap: 8 }}>
          {[
            { icon: "calendar", label: "Trips", value: "24" },
            { icon: "clock", label: "Hours", value: "8.5h" },
            { icon: "trending-up", label: "Distance", value: "152km" },
          ].map((item, i) => (
            <View
              key={i}
              style={{
                flex: 1,
                backgroundColor: "#e5e5e5",
                padding: 16,
                borderRadius: 16,
                alignItems: "center",
              }}
            >
              <Feather
                name={item.icon as any}
                size={22}
                color="#14213d"
                style={{ marginBottom: 8 }}
              />
              <Text
                style={{
                  color: "#14213d",
                  fontSize: 18,
                  fontWeight: "700",
                  marginBottom: 2,
                }}
              >
                {item.value}
              </Text>
              <Text style={{ color: "#14213d", fontSize: 12, opacity: 0.6 }}>
                {item.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Recent Destinations */}
        <View>
          <Text
            style={{
              color: "#14213d",
              fontSize: 17,
              fontWeight: "700",
              marginBottom: 16,
            }}
          >
            Recent Destinations
          </Text>

          {[
            { name: "Downtown Office", time: "19 min away" },
            { name: "Sakura Mall", time: "27 min away" },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: "#e5e5e5",
                borderRadius: 16,
                padding: 16,
                marginBottom: 8,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#ffffff",
                  padding: 10,
                  borderRadius: 12,
                  marginRight: 16,
                }}
              >
                <Feather name="map-pin" size={18} color="#14213d" />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: "#14213d",
                    fontSize: 15,
                    fontWeight: "600",
                    marginBottom: 2,
                  }}
                >
                  {item.name}
                </Text>
                <Text style={{ color: "#14213d", fontSize: 13, opacity: 0.6 }}>
                  {item.time}
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color="#fca311" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Page;
