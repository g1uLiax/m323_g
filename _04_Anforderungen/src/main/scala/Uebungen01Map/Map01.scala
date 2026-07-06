package Uebungen01Map

object Map01 {
  def main(args: Array[String]): Unit = {
    val numbers = List(1, 2, 3, 4, 5)
    val double = numbers.map(x => x * 2)
    println(double)
  }
}