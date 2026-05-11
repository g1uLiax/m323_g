class Aufg1 {
    public static int calculateScore(String word){
        int score = 0;
        for (char c : word.toCharArray()) {
            if (c != 'a') {
                score++;
            }
        }
        return score;
    }

    public static int wordScore(String word){
        return (int) word.chars()
                .filter(c -> c != 'a')
                .count();
    }

    public static void main(String[] args) {
        boolean calc9 = calculateScore("imperative") == 9;
        boolean calc2 = calculateScore("no") == 2;
        boolean word9 = wordScore("declarative") == 9;
        boolean word3 = wordScore("yes") == 3;

        if (calc2 && calc9 && word3 && word9 == true) {
            System.out.println("yes");
        }
    }
}