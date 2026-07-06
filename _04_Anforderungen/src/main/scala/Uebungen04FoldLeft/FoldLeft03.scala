package Uebungen04FoldLeft

object FoldLeft03 {
  def main(args: Array[String]): Unit = {
    val points = List((1, 3), (4, 8), (6, 2))

    val sumTuple = points.foldLeft((0, 0)) { (acc, point) =>
      val sumX = acc._1 + point._1
      val sumY = acc._2 + point._2
      (sumX, sumY)
    }
    val n = points.length
    val schwerpunkt = (sumTuple._1.toDouble / n, sumTuple._2.toDouble / n)
    println(s"Schwerpunkt: $schwerpunkt")
  }

}
