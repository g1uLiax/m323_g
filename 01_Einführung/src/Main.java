import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args){
        // Aufgabe 2
        // Imperative ShoppingCart Class
        System.out.println("\n\n--- Imperative Ergebnisse (Shopping Cart) ---");

        ShoppingCart cart = new ShoppingCart();

        cart.addItem("Java Handbuch");
        cart.addItem("Tasche");
        System.out.println("Items: " + cart.getItems());
        System.out.println("Rabatt: " + cart.getDiscountPercentage());

        cart.deleteItem("Java Handbuch");
        System.out.println("Rabatt: " + cart.getDiscountPercentage());

        // Funktionale DiscountCalculator Class
        System.out.println("\n--- Funktionale Ergebnisse ---");
        List<String> functionalCart = new ArrayList<>();
        functionalCart.add("Brot");
        functionalCart.add("Clean Code (Book)");

        double discount = DiscountCal.getDiscountPercentage(functionalCart);
        System.out.println("Items: " + functionalCart);
        System.out.println("Rabatt (erwartet 0.05): " + discount);

        functionalCart.remove("Clean Code (Book)");
        discount = DiscountCal.getDiscountPercentage(functionalCart);
        System.out.println("Nach Löschen - Rabatt (erwartet 0.0): " + discount);


        // Aufgabe 3
        // Pure Function
        System.out.println("\n\n--- Pure Function (TipCalc) ---");
        List<String> names = new ArrayList<>();
        names.add("Fritz");
        names.add("Franz");
        names.add("Hugo");
        names.add("Erwin");
        names.add("Markus");
        names.add("Martin");
        names.add("Heiri");

        int tip = TipCalculator.getTipPercentage(names);
        System.out.println("Gruppe " + names);
        System.out.println("Tip percentage " + tip + " %");
    }
}