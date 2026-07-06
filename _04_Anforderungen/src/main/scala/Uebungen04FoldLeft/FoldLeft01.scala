package Uebungen04FoldLeft

object FoldLeft01 {
  def main(args: Array[String]): Unit = {
    val zahlen = List(1, 2, 3, 4, 5)
    val summe = zahlen.foldLeft(0)((acc, n) => acc + n)
    println(summe)
  }

}
