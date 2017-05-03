module.exports = key => (vehicles, value) => {
  if (!value) { return vehicles }
  value = value.split(',').map(id => parseInt(id, 10))
  if (value.length === 0) { return vehicles }
  return vehicles.filter(vehicle => value.includes(vehicle[key]))
}
