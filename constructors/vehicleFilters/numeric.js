module.exports = key => (vehicles, value) => {
  if (!value) { return vehicles }
  value = value.pop ? value.pop() : value
  value = value.split('-').map(fromto => parseFloat(fromto))
  if (value.length === 1) {
    return vehicles.filter(vehicle => vehicle[key] === value[0])
  }
  if (value.length !== 2) { return vehicles }
  let [ from, to ] = value
  from = from || -Infinity
  to = to || Infinity
  return vehicles.filter(vehicle => from <= vehicle[key] && to > vehicle[key])
}
