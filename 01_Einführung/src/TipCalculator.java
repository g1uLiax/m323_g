import java.util.List;

class TipCalculator {

    public static int getTipPercentage(List<String> names) {
        int count = names.size();

        if (count == 0) {
            return 0;
        } else if (count > 5) {
            return 20;
        }
        else {
            return 10;
        }
    }
}
