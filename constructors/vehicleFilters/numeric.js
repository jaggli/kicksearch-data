module.exports = key => (vehicles, value) => {
  if (!value) { return vehicles }
  value = value.split('-').map(fromto => parseInt(fromto, 10))
  if (value.length !== 2) { return vehicles }
  let [ from, to ] = value
  from = from || -Infinity
  to = to || Infinity
  return vehicles.filter(vehicle => from <= vehicle[key] && to >= vehicle[key])
}