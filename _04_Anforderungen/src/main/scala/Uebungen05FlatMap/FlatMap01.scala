package Uebungen05FlatMap

object FlatMap01 {
  def main(args: Array[String]): Unit = {
    val verschachtelt = List(List(1, 2), List(3, 4), List(5, 6))
    val verdoppeltUndFlach = verschachtelt.flatMap(sub => sub.map(n => n * 2))
    println(verdoppeltUndFlach)
  }
}
