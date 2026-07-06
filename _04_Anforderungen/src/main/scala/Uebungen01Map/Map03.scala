package Uebungen01Map

object Map03 {
  def main(args: Array[String]): Unit = {
    val numbers = List(12, 45, 68, 100)
    val divided = numbers.map(number => number / 2)
    println(divided)
  }
}
