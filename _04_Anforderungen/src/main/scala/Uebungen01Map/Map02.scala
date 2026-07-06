package Uebungen01Map

object Map02 {
  def main(args: Array[String]): Unit = {
    val names = List("Alice", "Bob", "Charlie")
    val upperCase = names.map(name => name.toUpperCase)
    println(upperCase)
  }

}
