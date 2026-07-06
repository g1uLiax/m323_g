package Uebungen02Filter

object Filter04 {
  def main(args: Array[String]): Unit = {
    val words = List("Scala", "ist", "fantastisch")
    val sWords = words.filter(_.startsWith("S"))
    println(sWords)
  }
}
