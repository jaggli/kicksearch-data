const oneof = require('./oneof')
const numeric = require('./numeric')

const noop = vehicles => vehicles

const filters = {
  MakeId: oneof('MakeId'),
  ModelId: oneof('ModelId'),
  FirstRegYear: numeric('FirstRegYear'),
  BodyTypeId: oneof('BodyTypeId'),
  FuelTypeId: oneof('FuelTypeId'),
  TransmissionTypeId: oneof('TransmissionTypeId'),
  ConsumptionRatingTypeId: oneof('ConsumptionRatingTypeId'),
  ConsumptionTotal: numeric('ConsumptionTotal'),
  Doors: numeric('Doors'),
  Seats: numeric('Seats'),
  Ccm: numeric('Ccm'),
  Hp: numeric('Hp'),
  BodyColorId: oneof('BodyColorId'),
  Price: numeric('Price'),
  Co2Emission: numeric('Co2Emission'),
  Km: numeric('Km'),
  InteriorColorId: oneof('InteriorColorId'),
  Cylinders: numeric('Cylinders'),
  Gears: numeric('Gears'),
  WeightTotal: numeric('WeightTotal'),
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
