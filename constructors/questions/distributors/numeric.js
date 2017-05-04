const math = require('mathjs')

module.exports = (vehicles, keys) => {
  const data = {}
  keys.forEach(key => {
    const values = vehicles.map(vehicle => vehicle[key]).sort()
    const median = math.median(values)
    let medianIndex = Math.round(values.length / 2)

    while (values[medianIndex] != null && values[medianIndex] > median) {
      medianIndex--
    }
    while (values[medianIndex] != null && values[medianIndex] < median) {
      medianIndex++
    }

    const lower = math.median(values.slice(0, medianIndex))
    const upper = math.median(values.slice(medianIndex))

    data[key] = {
      values: [
        [lower],
        [lower, median],
        [median, upper],
        [upper]
      ]
    }
  })

  return data
}