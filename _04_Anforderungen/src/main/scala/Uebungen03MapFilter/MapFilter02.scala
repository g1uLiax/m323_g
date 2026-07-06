package Uebungen03MapFilter

object MapFilter02 {
  def main(args: Array[String]): Unit = {
    val kurse = List(
      "Programmierung in Scala",
      "Datenbanken",
      "Webentwicklung mit JavaScript",
      "Algorithmen und Datenstrukturen"
    )
    val bearbeiteteKurse = kurse.filter(k => k.contains("Daten")).map(k => k.replace(" ", ""))
    val alphabetisch = bearbeiteteKurse.sorted
    val umgekehrt = bearbeiteteKurse.sorted.reverse

    println(s"Alphabetisch: $alphabetisch")
    println(s"Umgekehrt: $umgekehrt")
  }

}
