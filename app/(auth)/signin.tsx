import { Link, router } from "expo-router";
import React, { useState } from "react";
import LottieView from "lottie-react-native";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    setErrors({ username: "", password: "" });

    let isValid = true;
    if (!username) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: "Please enter your username",
      }));
      isValid = false;
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Please enter your password",
      }));
      isValid = false;
    } else if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters",
      }));
      isValid = false;
    }

    if (isValid) {
      router.push(`/home?username=${username}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.innerContainer}>
          <View style={styles.logoContainer}>
            <LottieView
              source={require("../../assets/animation/lottie anmation.json")}
              autoPlay
              loop={true}
              style={{
                height: 200,
                width: 200,
                marginBottom: 30,
                marginTop: 40,
              }}
            />
            <Text style={styles.welcomeText}>Welcome Back to EduLearn!</Text>
            <Text style={styles.subText}>
             Open the door to endless learning and expand your knowledge.
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Username"
              style={styles.input}
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
            {errors.username ? (
              <Text style={styles.errorText}>{errors.username}</Text>
            ) : null}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Password"
              style={styles.input}
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            {errors.password ? (
              <Text style={styles.errorText}>{errors.password}</Text>
            ) : null}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.inputButtonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.footerText}>
              Don't have an account?{" "}
              <Link href={"/signup"}>
                <Text style={styles.signupLink}>Create an Account</Text>
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    fontFamily: "SpaceMono",
    justifyContent: "center",
  },
  scrollContent: {
    padding: 16,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#32CD32",
    fontFamily: "SpaceMono",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "black",
    textAlign: "center",
    marginHorizontal: 20,
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: 16,
    alignItems: "center",
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#32CD32",
    paddingHorizontal: 10,
    width: "90%",
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    width: "90%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#32CD32",
    borderRadius: 10,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  inputButtonText: {
    fontWeight: "500",
    color: "white",
    fontSize: 18,
  },
  footerText: {
    paddingTop: 20,
  },
  signupLink: {
    color: "#32CD32",
    fontWeight: "bold",
  },
  errorText: {
    color: "black",
    fontSize: 12,
    marginTop: 5,
  },
});

export default Signin;
