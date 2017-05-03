module.exports = (vehicles, value) => {
  if (!value) { return vehicles }
  var make = parseInt(value, 10)
  return vehicles.filter(vehicle => vehicle.MakeId === make)
}
