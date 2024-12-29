import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";
import BookCard from "@/components/BookCard";
import { useLikeContext } from "@/contexts/LikeContext";

const Home = () => {
  type RouteParams = {
    username?: string;
  };

  const route = useRoute();
  const { username } = route.params as RouteParams;

  interface Book {
    id: number;
    title: string;
    author: string;
    publicationYear: number;
    genre: string[];
    description: string;
    coverImage: string;
  }

  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { likeCount } = useLikeContext();

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://openlibrary.org/search.json?q=fiction");
      const data = await response.json();
      const booksData = data.docs.map((book: any) => ({
        id: book.key,
        title: book.title,
        author: book.author_name ? book.author_name[0] : "Unknown",
        publicationYear: book.first_publish_year || "Unknown",
        genre: book.subject || ["Unknown"],
        description: book.description ? book.description : "No description available.",
        coverImage: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : "https://covers.openlibrary.org/b/id/placeholder-L.jpg",
      }));

      setBooks(booksData);
      setFilteredBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (text: string) => {
    setSearchTerm(text);
    if (text.trim() === "") {
      setFilteredBooks(books);
    } else {
      const response = await fetch(`https://openlibrary.org/search.json?q=${text}`);
      const data = await response.json();
      const filtered = data.docs.map((book: any) => ({
        id: book.key,
        title: book.title,
        author: book.author_name ? book.author_name[0] : "Unknown",
        publicationYear: book.first_publish_year || "Unknown",
        genre: book.subject || ["Unknown"],
        description: book.description ? book.description : "No description available.",
        coverImage: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
          : "https://covers.openlibrary.org/b/id/placeholder-L.jpg",
      }));
      setFilteredBooks(filtered);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>
            Hello{" "}
            <Text style={styles.usernameText}>{username || "Guest"}</Text>,
          </Text>
          <Text style={styles.welcomeText}>
            <Text style={styles.appName}>BookNest</Text>
          </Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search books..."
          value={searchTerm}
          onChangeText={handleSearch}
        />

        <TouchableOpacity style={styles.floatingButton}>
          <Image style={styles.heartIcon} source={require("../../assets/icons/done.png")} />
          <Text style={styles.floatingButtonText}>{likeCount}</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Loading books...</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.innerContainer}>
            {filteredBooks.map((book) => (
              <BookCard
                read={false}
                key={book.id}
                title={book.title || "Untitled"}
                author={book.author}
                publicationYear={book.publicationYear}
                genre={book.genre}
                description={book.description}
                coverImage={book.coverImage}
              />
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 25,
  },
  header: {
    flexDirection: "row",
    marginLeft: 16,
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "#32CD32",
    paddingVertical: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  greetingContainer: {
    marginLeft: 36,
  },
  greetingText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "SpaceMono",
  },
  usernameText: {
    fontFamily: "SpaceMono",
    color: "#FFD700",
  },
  welcomeText: {
    color: "#fff",
    fontSize: 25,
    fontFamily: "SpaceMono",
  },
  appName: {
    fontFamily: "SpaceMono",
    color: "#FFD700",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  input: {
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 15,
    width: "80%",
    backgroundColor: "#fff",
    fontFamily: "SpaceMono",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  floatingButton: {
    flexDirection: "row",
    position: "absolute",
    bottom: 110,
    right: 24,
    backgroundColor: "#32CD32",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  heartIcon: {
    height: 25,
    width: 25,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 8,
  },
  scrollContent: {
    padding: 16,
    fontFamily: "SpaceMono",
    marginTop: 0,
  },
  innerContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 18,
    color: "#32CD32",
  },
});

export default Home;
