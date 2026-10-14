import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ArticleCard from "@/components/article-card";

export default function HomeScreen() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
        <ArticleCard
            article={{
                id: "1",
                title: "The Future of AI: How Artificial Intelligence is Transforming Industries",
                author: "John Doe",
                summary: "Artificial Intelligence (AI) is rapidly changing the way we live and work. From healthcare to finance, AI is being used to improve efficiency, reduce costs, and enhance decision-making. In this article, we explore the various applications of AI across different industries and discuss the potential benefits and challenges associated with its adoption.",
                body: "Artificial Intelligence (AI) is rapidly changing the way we live and work. From healthcare to finance, AI is being used to improve efficiency, reduce costs, and enhance decision-making. In this article, we explore the various applications of AI across different industries and discuss the potential benefits and challenges associated with its adoption. In healthcare, AI is being used to analyze medical images, predict patient outcomes, and assist in diagnosis. In finance, AI algorithms are being used for fraud detection, risk assessment, and algorithmic trading. However, the adoption of AI also raises ethical concerns, such as job displacement and privacy issues. As AI continues to evolve, it is crucial for policymakers, businesses, and society to address these challenges and ensure that AI is used responsibly and ethically.",
                category: "Tech",
                date: "2023-10-15",
            }}
            onPress={() => {}}
        />
     </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
});
