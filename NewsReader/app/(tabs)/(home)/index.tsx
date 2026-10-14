
import { router } from "expo-router";
import { FlatList,StyleSheet,Text,View,ScrollView,Pressable,} from "react-native";
import { useState } from "react";
import ArticleCard from "../../../components/article-card";
import { Article, ARTICLES } from "../../../data/articles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ArticleList() {
    const [selectedCategory, setSelectedCategory] =
        useState<string | null>(null);

    const categories = [
        "All",
        ...new Set(ARTICLES.map((article) => article.category)),
    ];

    const filteredArticles = selectedCategory
        ? ARTICLES.filter(
              (article) => article.category === selectedCategory
          )
        : ARTICLES;

    const handlePress = (article: Article) => {
        router.push({
            pathname: "/(tabs)/(home)/[id]",
            params: { id: article.id },
        });
    };

    return (
        <SafeAreaView style={styles.screen}>
            <FlatList
                data={filteredArticles}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <ArticleCard
                        article={item}
                        onPress={handlePress}
                    />
                )}
                contentContainerStyle={styles.list}
                ListHeaderComponent={
                    <View>
                        <Text style={styles.title}>Top Stories</Text>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.categoryList}
                        >
                            {categories.map((category) => {
                                const isActive =
                                    category === "All"
                                        ? selectedCategory === null
                                        : selectedCategory === category;

                                return (
                                    <Pressable
                                        key={category}
                                        onPress={() =>
                                            setSelectedCategory(
                                                category === "All"
                                                    ? null
                                                    : category
                                            )
                                        }
                                        style={[
                                            styles.categoryPill,
                                            isActive &&
                                                styles.activeCategoryPill,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.categoryText,
                                                isActive &&
                                                    styles.activeCategoryText,
                                            ]}
                                        >
                                            {category}
                                        </Text>
                                    </Pressable>
                                );
                            })}
                        </ScrollView>

                        <View style={styles.listHeader}>
                            <Text style={styles.listHeaderText}>
                                {filteredArticles.length} stories
                            </Text>
                        </View>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#F0F4F8",
    },
    list: {
        paddingTop: 12,
        paddingBottom: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#102653",
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    categoryList: {
        paddingHorizontal: 12,
        paddingVertical: 10,
        gap: 8,
    },
    categoryPill: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: "#E2E8F0",
    },
    activeCategoryPill: {
        backgroundColor: "#102653",
    },
    categoryText: {
        fontSize: 12,
        color: "#334155",
        fontWeight: "500",
    },
    activeCategoryText: {
        color: "#FFFFFF",
    },
    listHeader: {
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    listHeaderText: {
        fontSize: 12,
        color: "#94A3B8",
        textTransform: "uppercase",
        letterSpacing: 1,
    },
});
