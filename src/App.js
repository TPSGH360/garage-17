import { useState } from "react"
import "./App.css"
import Car from "./components/Car"
import { getAllCars } from "./api"

function App() {
  const [cars, setCars] = useState([])
  const [carName, setCarName] = useState("")
  const [carNumber, setCarNumber] = useState("")
  const [search, setSearch] = useState("")

  async function setAllCars() {
    const allCars = await getAllCars()
    setCars(allCars)
  }

  function addCar() {
    const newCar = { name: carName, number: carNumber }
    setCars([...cars, newCar]) // spread operator example
    setCarName("")
    setCarNumber("")
  }
  // Function to handle car deletion
  function deleteCar(index) {
    const updatedCars = cars.filter((car, carIndex) => carIndex !== index)
    setCars(updatedCars)
  }

  function updatedCars() {
    return cars.filter((car) => car.name.startsWith(search))
  }

  function setPrice(index, newPrice) {
    const updatedCars = cars.map((car, carIndex) =>
      carIndex === index ? { ...car, price: newPrice } : car
    )
    setCars(updatedCars)
  }

  return (
    <>
      <button onClick={setAllCars}>GET</button>
      Search:
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <br></br>
      {updatedCars().map((car, index) => (
        <Car
          key={index}
          car={car}
          deleteCar={deleteCar}
          index={index}
          setPrice={setPrice}
        />
      ))}
      <div className="card">
        Name:
        <input value={carName} onChange={(e) => setCarName(e.target.value)} />
        <br></br>
        Number:
        <input
          value={carNumber}
          onChange={(e) => setCarNumber(e.target.value)}
        />
        <br />
        <button onClick={addCar}>Add Car</button>
      </div>
    </>
  )
}

export default App
