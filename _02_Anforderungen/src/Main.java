import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Main {
    public static void main(String[] args) {
        // Aufgabe 1 Reise planen
        System.out.println("\n-- Reise Planen --");
        List<String> route = new ArrayList<>();
        route = Reise.addDestination(route, "Paris");
        route = Reise.addDestination(route, "Rom");
        route = Reise.addDestination(route, "Berlin");

        System.out.println("Nach addDestination:");
        System.out.println(route);

        route = Reise.changeDestination(route, 1, "Madrid");

        System.out.println("Nach changeDestination:");
        System.out.println(route);

        route = Reise.removeDestination(route, 0);

        System.out.println("Nach removeDestination:");
        System.out.println(route);

        System.out.println("Aktuelle Route:");
        System.out.println(Reise.getRoute(route));


        // Aufgabe 2 Word Count
        System.out.println("\n\n-- Wordcount --");
        List<String> words = new ArrayList<>();
        words = Word.enterWord(words,"Aluminium");
        words = Word.enterWord(words, "Kürbis");
        words = Word.enterWord(words, "Erfolgreich");

        System.out.println("Unsortierte Wörter: " + words);

        for (String word : words) {
            System.out.println("Wort: " + word + "-> Score: " + Word.calculateScore(word));
        }

        List<String> sorted = Word.sortWords(words);
        System.out.println("Sortierte Wörter: " +  sorted);


        // Aufgabe 3 Autorennen
        System.out.println("\n\n-- Autorennen --");
        List<Double> laptimes = new ArrayList<>();

        laptimes = Autorennen.addLapTime(laptimes, 90.00);
        laptimes = Autorennen.addLapTime(laptimes, 45.5);
        laptimes = Autorennen.addLapTime(laptimes, 44.5);

        System.out.println("Alle Zeiten: " + laptimes);

        double total = Autorennen.calculateTime(laptimes);
        System.out.println("Gesamtzeit (ohne warm-up):" + total);

        double average = Autorennen.calculateAverageTime(laptimes);
        System.out.println("Durchschnitt (ohne warm-up):" + average);
    }
}