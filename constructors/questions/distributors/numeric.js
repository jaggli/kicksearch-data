const math = require('mathjs')

module.exports = (vehicles, keys) => {
  const data = {}
  keys.forEach(key => {
    const values = vehicles.map(vehicle => vehicle[key])
      .filter(value => value > 0)
      .sort()
    const median = math.median(values)
    let medianIndex = Math.round(values.length / 2)

    while (values[medianIndex] != null && values[medianIndex] > median) {
      medianIndex--
    }
    while (values[medianIndex] != null && values[medianIndex] < median) {
      medianIndex++
    }

    const lowerHalf = values.slice(0, medianIndex)
    const upperHalf = values.slice(medianIndex)

    const lowerMedian = lowerHalf.length ? math.median(lowerHalf) : 0
    const upperMedian = upperHalf.length ? math.median(upperHalf) : 0

    data[key] = {
      values: [
        [lowerMedian],
        [lowerMedian, median],
        [median, upperMedian],
        [upperMedian]
      ]
    }
  })

  return data
}