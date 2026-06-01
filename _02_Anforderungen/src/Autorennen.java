import java.util.ArrayList;
import java.util.List;

public class Autorennen {

    public static List<Double> addLapTime(List<Double> lapTimes, double times) {
        List<Double> newLapTime = new ArrayList<>(lapTimes);
        newLapTime.add(times);
        return newLapTime;
    }

    public static double calculateTime(List<Double> lapTimes) {
        if (lapTimes.size() <= 1) {
            return 0.0;
        }

        double total = 0;
        // Startet bei 1 um die Warm-up round zu überspringen
        for (int i = 1; i < lapTimes.size(); i++) {
            total += lapTimes.get(i);
        }
        return total;
    }

    public static double calculateAverageTime(List<Double> lapTimes) {
        if (lapTimes.size() <= 1) {
            return 0.0;
        }

        double totalTime = calculateTime(lapTimes);
        int relevantLaps = lapTimes.size() -1;

        return totalTime / relevantLaps;
    }

    public static List<Double> getLapTimes(List<Double> lapTimes) {
        return lapTimes;
    }
}