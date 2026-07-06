package Uebungen01Map

object Map04 {
  def main(args: Array[String]): Unit = {
    case class Adresse(strasse: String, hausnummer: Int, postleitzahl: String, stadt: String)

    val adressen = List(
      Adresse("Hauptstrasse", 10, "12345", "Musterstadt"),
      Adresse("Nebenstrasse", 5, "23456", "Beispielburg")
    )

    val formatted = adressen.map(adresse => s"${adresse.strasse}, ${adresse.hausnummer}, ${adresse.postleitzahl}, ${adresse.stadt}")
    println(formatted)
  }

}
