
# Aufgabe 1
| Aufgabe | Nur ein Rückgabewert | Resultat nur Abhängig von übergebenen Parametern | Verändert keine existierenden Werte | pure oder impure | 
|---------|----------------------|--------------------------------------------------|-------------------------------------|------------------|
| 1.1     | Ja                   | Nein                                             | Nein                                | impure           | 
| 1.2     | Ja                   | Ja                                               | Ja                                  | pure             | 
| 1.3     | Ja                   | Ja                                               | Ja                                  | pure             | 
| 1.4     | Ja                   | Nein                                             | Ja                                  | impure           | 
| 1.5     | Ja                   | Ja                                               | Ja                                  | pure             | 
| 1.6     | Ja                   | Ja                                               | Nein                                | impure           |

### Aufgabe 3

#### 3.1
````js
function sum_03(numbers) {
    if (numbers.length === 0) return 0;
    const [head, ...tail] = numbers;
    return head + sum_03(tail);
}
// Test
console.log(sum_03([]));
console.log(sum_03([1,2,3,4,5,6]));
console.log(sum_03([10, -5, 2]));
console.log(sum_03([0,0,0]));
````
Diese Funktion berechnet die Summe einer Liste rekursiv, indem sie das erste Element(``head``) zum Ergebnis der verbleibenden Restliste(``tail``) addiert. Sobald eine leere Liste erreicht wird, gibt die Abbruchbedingung den Wert 0 zurück und beendet die Kette.

#### 3.2
````js
function average_03(numbers, length = numbers.length) {
    if (numbers.length === 0) return 0;
    return sum_03(numbers) / length;
}
// Test
const MyNumbers = [1, 2, 3, 4, 5];
console.log("Average:", average_03(MyNumbers));
````
Zur Ermittlung des Durchschnitts nutzt die Funktion die rekursive Summenlogik und teilt das Gesamtergebnis durch die ursprüngliche Anzahl der Elemente. Ein Sicherheits-Check für leere Listen verhindert dabei mathematische Fehler wie die Division durch Null.

#### 3.3
````js
function sortStrings_03(list) {
    if (list.length <= 1) return list;
    const [pivot, ...rest] = list;

    const small = rest.filter(s => s.toLowerCase() < pivot.toLowerCase());
    const big = rest.filter(s => s.toLowerCase() >= pivot.toLowerCase());

    return [...sortStrings_03(small), pivot, ...sortStrings_03(big)]
}
// Test
const myStrings = ["Hello", "Baum", "apprentice"];
console.log(sortStrings_03(myStrings))
````
Dieser Algorithmus zerlegt die Liste ohne Veränderung der Originaldaten rekursiv in Teilbereiche, die kleiner oder grösser als eine gewähltes Vergleichselmenet(Pivot) sind. durch die Umwandlung in Kleinschreibung wird sichergestellt, dass die Sortierung unabhängig von der Gross und Kleinschreibung korrekt erfolgt.

#### 3.4
````js
const sortObjects_03 = (list) => {
    if (list.length <= 1) return list;
    const [pivot, ...rest] = list;

    const isSmaller = (a, b) => {
        if (a.date !== b.date) return a.date < b.date;
        if (a.prio !== b.prio) return a.prio < b.prio;
        return a.titel < b.titel;
    }

    const small = rest.filter(item => isSmaller(item, pivot));
    const big = rest.filter(item => !isSmaller(item, pivot));

    return [...sortObjects_03(small), pivot, ...sortObjects_03(big)];
}
// Test
const myObjects = [
    {date: "2026-01-01", prio: 2, titel: "B-Aufgabe"},
    {date: "2026-01-01", prio: 1, titel: "A-Aufgabe"},
    {date: "2025-02-01", prio: 5, titel: "Alt-Aufgabe"},
];
console.log(sortObjects_03(myObjects));
````
Die Funktion sortiert komplexe Datenstrukturen basierend auf einer festen Hierarchie aus Datum Priorität und Titel. Da bei jedem rekursiven Schritt neue Listen via Filter-Funktionen erstellt werden, bleibt der gesamte Sortierprozess eine Pure Function ohne Seiteneffekte.

#### 3.5
````js
function getLeaves_03(node) {
    if (!node.children || node.children.length === 0) {
        return [node];
    }

    return node.children.flatMap(child => getLeaves_03(child));
}
// Test
const myTree = {
    name: "Stamm",
    children: [
        {
            name: "Ast A",
            children: [
                { name: "Blatt A1" },
                { name: "Blatt A2" }
            ]
        },
        {
            name: "Ast B",
            children: []
        },
        {
            name: "Ast C",
            children: [
                {
                    name: "Zweig C1",
                    children: [{ name: "Blatt C1-1" }]
                }
            ]
        }
    ]
};

const leaves = getLeaves_03(myTree);
console.log("Anzahl der gefundenen Blätter:", leaves.length);
console.log("Namen der Blätter:", leaves.map(b => b.name));
````
Die Funktion durchläuft rekursiv alle Ebenen einer Baumstruktur und erkennt Knoten ohne Unterelemente zuverlässig als Blätter. Mithilfe der ``flatMap`` Methode werden die einzelnen Ergebnisse aus den verschiedenen Zweigen effizient zu einer einzigen, flachen Liste zusammengeführt.