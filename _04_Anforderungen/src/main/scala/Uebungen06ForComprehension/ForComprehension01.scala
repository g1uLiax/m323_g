package Uebungen06ForComprehension

object ForComprehension01 {
  def main(args: Array[String]): Unit = {
    val numbers = 1 to 10
    val squares = for (n <- numbers) yield n * n
    println(squares)
  }
}
