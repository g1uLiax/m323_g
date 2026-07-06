package Uebungen04FoldLeft

object FoldLeft02 {
  def main(args: Array[String]): Unit = {
    val textTeile = List("Hello", " ", "Welt", "!")
    val kombiniert = textTeile.foldLeft("")((acc, wort) => acc + wort)
    println(kombiniert)
  }

}
