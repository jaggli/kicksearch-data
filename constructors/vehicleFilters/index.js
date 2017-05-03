const make = require('./make')
const price = require('./price')
const noop = vehicles => vehicles

const filters = {
  MakeId: make,
  ModelId: noop,
  FirstRegYear: noop,
  BodyTypeId: noop,
  FuelTypeId: noop,
  TransmissionTypeId: noop,
  ConsumptionRatingTypeId: noop,
  ConsumptionTotal: noop,
  Doors: noop,
  Seats: noop,
  Ccm: noop,
  Hp: noop,
  BodyColorId: noop,
  Price: price,
  Co2Emission: noop,
  Km: noop,
  InteriorColorId: noop,
  Cylinders: noop,
  Gears: noop,
  WeightTotal: noop,
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
