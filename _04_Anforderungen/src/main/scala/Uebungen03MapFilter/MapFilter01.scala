package Uebungen03MapFilter

object MapFilter01 {
  def main(args: Array[String]): Unit = {
    case class Mitarbeiter(name: String, abteilung: String, gehalt: Int)

    val mitarbeiter = List(
      Mitarbeiter("Max Mustermann", "IT", 50000),
      Mitarbeiter("Erika Musterfrau", "Marketing", 45000),
      Mitarbeiter("Klaus Klein", "IT", 55000),
      Mitarbeiter("Julia Gross", "HR", 40000)
    )
    val result = mitarbeiter.filter(m => m.abteilung == "IT" && m.gehalt >= 50000).map(m => m.name.split(" ")(0).toUpperCase())
    println(result)

  }

}
