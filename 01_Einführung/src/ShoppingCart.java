import java.util.ArrayList;
import java.util.List;

public class ShoppingCart {

    private List<String> items = new ArrayList<>();
    private boolean bookAdded = false;

    public void addItem(String item) {
        items.add(item);
        if (isBook(item)) {
            bookAdded = true;
        }
    }

    public void deleteItem(String item) {
        items.remove(item);

        bookAdded = checkIfBookExists();
    }

    private boolean isBook(String item) {
        return item.toLowerCase().contains("book") || item.toLowerCase().contains("buch");
    }

    private boolean checkIfBookExists() {
        for (String s : items) {
            if (isBook(s)) return true;
        }
        return false;
    }

    public double getDiscountPercentage() {
        return bookAdded ? 0.05 : 0.0;
    }

    public List<String> getItems() {
        return items;
    }
}