package Uebungen02Filter

object Filter03 {
  def main(args: Array[String]): Unit = {
    val numbers = List(12, 45, 68, 100)
    val bigNumbers = numbers.filter(_ > 50)
    println(bigNumbers)
  }
}
