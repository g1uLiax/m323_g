package Uebungen02Filter

object Filter02 {
  def main(args: Array[String]): Unit = {
    val namen = List("Alice", "Bob", "Charlie", "Diana")
    val langeNamen = namen.filter(name => name.length > 4)
    println(langeNamen)
  }

}
