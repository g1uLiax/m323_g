import java.util.List;

public class DiscountCal {

    public static double getDiscountPercentage(List<String> items) {
        boolean hasBook = items.stream()
                .anyMatch(item -> item.toLowerCase().contains("book") ||
                        item.toLowerCase().contains("buch"));
        return hasBook ? 0.05 : 0.00;
    }
}