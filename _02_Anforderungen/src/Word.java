import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class Word {

    public static List<String> enterWord(List<String> words, String word) {
        List<String> newList = new ArrayList<>(words);
        newList.add(word);
        return newList;
    }

    public static int calculateScore(String word) {
        int score = 0;
        for (char c : word.toLowerCase().toCharArray()) {
            if (c != 'a') {
                score++;
            }
        }
        return score;
    }

    public static List<String> sortWords(List<String> words) {
        List<String> sorted = new ArrayList<>(words);
        sorted.sort(Comparator.comparingInt(Word::calculateScore).reversed());
        return sorted;
    }

    public static List<String> getWords(List<String> words) {
        return words;
    }
}