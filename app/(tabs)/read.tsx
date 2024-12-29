import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";
import BookCard from "@/components/BookCard";

const AlreadyRead = () => {
  interface Book {
    id: string;
    title: string;
    author: string;
    publicationYear: number;
    genre: string[];
    description: string;
    coverImage: string;
  }

  const [readBooks, setReadBooks] = useState<Book[]>([]);


  const fetchReadBooks = async () => {
    try {

      const response = await fetch("https://openlibrary.org/search.json?q=fiction&limit=10");
      const data = await response.json();

      const booksWithImages = data.docs.map((book: any) => ({
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

      setReadBooks(booksWithImages);
    } catch (error) {
      console.error("Error fetching already read books:", error);
    }
  };

  useEffect(() => {
    fetchReadBooks();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Books I've Read</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.innerContainer}>
          {readBooks.length > 0 ? (
            readBooks.map((book) => (
              <BookCard
                read={true}
                key={book.id}
                title={book.title || "Untitled"}
                author={book.author}
                publicationYear={book.publicationYear}
                genre={book.genre}
                description={book.description}
                coverImage={book.coverImage}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>No books found in your read list.</Text>
          )}
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
    marginTop: 25,
  },
  header: {
    flexDirection: "row",
    marginLeft: 16,
    alignItems: "center",
    marginTop: 40,
    paddingHorizontal: 16,
  },
  greetingContainer: {
    flexDirection: "column",
    marginLeft: 36,
    marginBottom: 10,
  },
  greetingText: {
    color: "black",
    fontSize: 24,
    fontWeight: "bold",
  },
  scrollContent: {
    padding: 16,
    fontFamily: "SpaceMono",
    marginTop: 0,
    paddingTop: 0,
  },
  innerContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "SpaceMono",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    color: "#32CD32",
  },
});

export default AlreadyRead;
