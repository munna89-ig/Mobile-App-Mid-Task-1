
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    View,
    Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ARTICLES } from "../../../data/articles";

type ArticleParams = { id?: string | string[] };

const CATEGORY_COLOURS: Record<
    string,
    { bg: string; text: string }
> = {
    Tech: { bg: "#EFF6FF", text: "#1D4ED8" },
    Policy: { bg: "#F0FDF4", text: "#15803D" },
    Research: { bg: "#FDF4FF", text: "#7E22CE" },
    Industry: { bg: "#FFF7ED", text: "#C2410C" },
    AI: { bg: "#E1F5EE", text: "#0F6E56" },
    Business: { bg: "#FEFCE8", text: "#854D0E" },
};

const DEFAULT_COLOUR = {
    bg: "#F1F5F9",
    text: "#475569",
};

export default function ArticleDetail() {
    const { id } = useLocalSearchParams<ArticleParams>();

    const [bookmarked, setBookmarked] = useState(false);

    const articleId = Array.isArray(id) ? id[0] : id;
    const article = ARTICLES.find((a) => a.id === articleId);

    if (!article) {
        return (
            <View style={styles.screen}>
                <Text style={styles.notFound}>
                    Article not found.
                </Text>
            </View>
        );
    }

    const colour =
        CATEGORY_COLOURS[article.category] ?? DEFAULT_COLOUR;

    return (
        <SafeAreaView style={styles.screen}>
            <ScrollView
                contentContainerStyle={styles.content}
            >
                <View
                    style={[
                        styles.badge,
                        { backgroundColor: colour.bg },
                    ]}
                >
                    <Text
                        style={[
                            styles.badgeText,
                            { color: colour.text },
                        ]}
                    >
                        {article.category}
                    </Text>
                </View>

                <Text style={styles.title}>
                    {article.title}
                </Text>

                <View style={styles.meta}>
                    <Text style={styles.author}>
                        {article.author}
                    </Text>

                    <Text style={styles.date}>
                        {article.date}
                    </Text>
                </View>

                <View style={styles.divider} />

                {article.body.split("\n\n").map((para, i) => (
                    <Text key={i} style={styles.body}>
                        {para}
                    </Text>
                ))}
            </ScrollView>

            {/* Floating Bookmark Button */}
            <Pressable
                onPress={() =>
                    setBookmarked((previous) => !previous)
                }
                style={({ pressed }) => [
                    styles.bookmarkButton,
                    pressed && styles.bookmarkPressed,
                ]}
                hitSlop={8}
                accessibilityRole="button"
                accessibilityLabel={
                    bookmarked
                        ? "Remove bookmark"
                        : "Add bookmark"
                }
            >
                <Ionicons
                    name={
                        bookmarked
                            ? "bookmark"
                            : "bookmark-outline"
                    }
                    size={24}
                    color="#FFFFFF"
                />
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    content: {
        padding: 20,
        paddingBottom: 100,
    },
    badge: {
        alignSelf: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        marginBottom: 14,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: "600",
    },
    title: {
        fontSize: 22,
        fontWeight: "800",
        color: "#0D1F4E",
        lineHeight: 30,
        marginBottom: 12,
    },
    meta: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 16,
    },
    author: {
        fontSize: 13,
        color: "#64748B",
        fontStyle: "italic",
    },
    date: {
        fontSize: 13,
        color: "#94A3B8",
    },
    divider: {
        height: 1,
        backgroundColor: "#F1F5F9",
        marginBottom: 20,
    },
    body: {
        fontSize: 15,
        color: "#334155",
        lineHeight: 24,
        marginBottom: 16,
    },
    bookmarkButton: {
        position: "absolute",
        bottom: 24,
        right: 20,
        width: 52,
        height: 52,
        borderRadius: 26,
        backgroundColor: "#102653",
        justifyContent: "center",
        alignItems: "center",
        elevation: 6,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    bookmarkPressed: {
        opacity: 0.75,
        transform: [{ scale: 0.95 }],
    },
    notFound: {
        padding: 40,
        textAlign: "center",
        color: "#94A3B8",
    },
});
