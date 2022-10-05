import React, { useEffect, useState } from "react"
type Statement = [string, string, string]

const statements: Statement[] = JSON.parse(localStorage.getItem("triplet-statements") ?? "[]") ?? [
  ["Davey", "brother of", "Maddie"],
  ["Maddie", "ex-girlfriend of", "Elie"],
  ["Elie", "attends", "Duke"],
]
const TripletList = () => {
  const [triplets, setTriplets] = useState<Statement[]>(statements)
  const [objects, setObjects] = useState<{ [id: string]: Statement[] }>({})
  useEffect(() => {
    localStorage.setItem("triplet-statements", JSON.stringify(triplets))
    setObjects(
      triplets.reduce((objectsSoFar: { [id: string]: Statement[] }, nextTriplet) => {
        const [src, edge, trg] = nextTriplet.map((e) => e.toLocaleLowerCase().trim())
        objectsSoFar[src] = [...(src in objectsSoFar ? objectsSoFar[src] : []), nextTriplet]
        // objectsSoFar[edge] = [...(edge in objectsSoFar ? objectsSoFar[edge] : []), nextTriplet]
        objectsSoFar[trg] = [...(trg in objectsSoFar ? objectsSoFar[trg] : []), nextTriplet]
        return objectsSoFar
      }, {})
    )
  }, [triplets])
  return (
    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
      <div>
        <button
          onClick={(e) => {
            const newTriplets: string[] = window.prompt("new triplet")?.split("  ") ?? []
            if (newTriplets.length <= 2) return

            //otherwise
            const firstThree: Statement = newTriplets
              .slice(0, 3)
              .map((e) => e.toLocaleLowerCase().trim()) as Statement

            setTriplets((prev) => [firstThree, ...prev])
          }}
        >
          add triplet
        </button>
        {triplets.map((statement) => (
          <div>{statement.join("  -  ")}</div>
        ))}
        <br></br>
      </div>
      <div>
        <br></br>
        {Object.entries(objects).map(([obj, statements]) => (
          <div>
            {obj}
            <div>
              {statements.map((statement) => (
                <div>&nbsp;&nbsp;&nbsp;&nbsp;{statement.join(" - ")}</div>
              ))}
            </div>
            <br></br>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TripletList
