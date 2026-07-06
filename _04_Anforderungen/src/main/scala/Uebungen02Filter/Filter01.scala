package Uebungen02Filter

object Filter01 {
  def main(args: Array[String]): Unit = {
    val numbers = List(1, 2, 3, 4, 5)
    val evenNumbers = numbers.filter(number => number % 2 == 0)
    println(evenNumbers)
  }
}
