const make = require('./make')

const noop = vehicles => vehicles
const genericNumeric = key => (vehicles, value) => {
  if (!value) { return vehicles }
  value = value.split('-').map(fromto => parseInt(fromto, 10))
  if (value.length !== 2) { return vehicles }
  let [ from, to ] = value
  from = from || -Infinity
  to = to || Infinity
  return vehicles.filter(vehicle => from <= vehicle[key] && to >= vehicle[key])
}

const filters = {
  MakeId: make,
  ModelId: noop,
  FirstRegYear: genericNumeric('FirstRegYear'),
  BodyTypeId: noop,
  FuelTypeId: noop,
  TransmissionTypeId: noop,
  ConsumptionRatingTypeId: noop,
  ConsumptionTotal: genericNumeric('ConsumptionTotal'),
  Doors: genericNumeric('Doors'),
  Seats: genericNumeric('Seats'),
  Ccm: genericNumeric('Ccm'),
  Hp: genericNumeric('Hp'),
  BodyColorId: noop,
  Price: genericNumeric('Price'),
  Co2Emission: genericNumeric('Co2Emission'),
  Km: genericNumeric('Km'),
  InteriorColorId: noop,
  Cylinders: genericNumeric('Cylinders'),
  Gears: genericNumeric('Gears'),
  WeightTotal: genericNumeric('WeightTotal'),
  IsAccidented: noop,
  Equipment: noop
}

module.exports = {
  applyQuery: (vehicles, query) => Object.keys(query || {})
    .reduce(
      (vehicles, id) => (filters[id] || noop)(vehicles, query[id]),
      vehicles
    )
}
