module.exports = (vehicles, value) => {
  if (!value) { return vehicles }
  var make = parseInt(value, 10)
  console.log('weeeeeeeha 1')
  return vehicles.filter(vehicle => vehicle.MakeId === make)
}
