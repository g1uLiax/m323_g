package Uebungen01Map

object Map05 {
  def main(args: Array[String]): Unit = {
    val namen = List("Max Mustermann", "Erika Mustermann")
    val upperCase = namen.map(firstname => firstname.split(" ")(0).toUpperCase())
    println(upperCase)
  }

}
