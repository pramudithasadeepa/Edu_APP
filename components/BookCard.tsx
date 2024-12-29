import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useLikeContext } from "@/contexts/LikeContext";

const BookCard = ({
  read,
  title,
  author,
  publicationYear,
  genre,
  description,
  coverImage,
}: {
  read: boolean;
  title: string;
  author: string;
  publicationYear: number;
  genre: string[];
  description: string;
  coverImage: string;
}) => {
  const [Liked, setLiked] = useState(false);

  const readIcon = Liked
    ? require("../assets/icons/donenil.png")
    : require("../assets/icons/doneline.png");

  const { incrementLike, decrementLike } = useLikeContext();

  const toggleLike = () => {
    if (Liked) {
      decrementLike();
    } else {
      incrementLike();
    }
    setLiked(!Liked);
  };

  return (
    <View style={styles.card}>
      <Image style={styles.coverImage} source={{ uri: coverImage }} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>by {author}</Text>
        <Text style={styles.genre}>Genre: {genre.join(", ")}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <TouchableOpacity style={styles.likeButton} onPress={toggleLike}>
        <Image style={styles.likeIcon} source={read ? require("../assets/icons/donenil.png") : readIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    margin: 15,
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    width: "90%",
    overflow: "hidden",
    position: "relative",
  },
  coverImage: {
    width: "100%",
    height: 250,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  detailsContainer: {
    padding: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    color: "#555",
    marginVertical: 5,
  },
  genre: {
    fontSize: 14,
    color: "#777",
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  likeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 8,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  likeIcon: {
    width: 30,
    height: 30,
  },
});

export default BookCard;
