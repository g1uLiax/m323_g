import java.util.ArrayList;
import java.util.List;

public class Reise {

    public static List<String> addDestination(List<String> route, String destination) {
        List<String> newRoute = new ArrayList<>(route);
        newRoute.add(destination);
        return newRoute;
    }

    public static List<String> changeDestination(List<String> route, int index, String newDestination) {
        List<String> newRoute = new ArrayList<>(route);
        newRoute.set(index, newDestination);
        return newRoute;
    }

    public static List<String> removeDestination(List<String> route, int index) {
        List<String> newRoute = new ArrayList<>(route);
        newRoute.remove(index);
        return newRoute;
    }

    public static List<String> getRoute(List<String> route) {
        return route;
    }
}