package Uebungen05FlatMap

object FlatMap02 {
  def main(args: Array[String]): Unit = {
    val personen = List(
      ("Max", List("Blau", "Grün")),
      ("Anna", List("Rot")),
      ("Julia", List("Gelb", "Blau", "Grün"))
    )

    val einzigartigeFarben = personen.flatMap(person => person._2).distinct
    println(einzigartigeFarben)
  }
}
