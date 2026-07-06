package Uebungen06ForComprehension

object ForComprehension02 {
  def main(args: Array[String]): Unit = {
    val numbers = 1 to 20
    val evens = for {
      n <- numbers
      if n % 2 == 0
    } yield n
    println(evens)
  }
}
