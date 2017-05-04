const math = require('mathjs')
const sort = (a, b) => {
  if (a === b) { return 0 }
  return a > b ? 1 : -1
}

const splitByMedian = values => {
  if (!values.length) {
    return {
      lower: [],
      upper: []
    }
  }

  const median = math.median(values)
  let medianIndex = Math.round(values.length / 2)

  while (values[medianIndex] != null && values[medianIndex] > median) {
    medianIndex--
  }
  while (values[medianIndex] != null && values[medianIndex] <= median) {
    medianIndex++
  }

  return {
    lower: values.slice(0, medianIndex),
    upper: values.slice(medianIndex)
  }
}

module.exports = (vehicles, keys) => {
  const data = {}
  keys.forEach(key => {
    const values = vehicles.map(vehicle => vehicle[key])
      .filter(value => value > 0)
      .sort(sort)
    const ret = []

    const acc = {}
    const len = values.length
    let variantCount = 0
    for (let i = 0; i < len; i++) {
      if (acc[values[i]]) { continue }
      acc[values[i]] = 1
      variantCount++
      if (variantCount > 4) { break }
    }
    const variants = Object.keys(acc)

    switch (variants.length) {
      case 0:
      case 1: break
      case 2:
      case 3:
      case 4:
        let value
        while ((value = variants.shift())) {
          ret.push({ type: 'eq', values: [value] })
        }
        break
      default:
        const split = splitByMedian(values)
        split.lower = splitByMedian(split.lower)
        split.upper = splitByMedian(split.upper)

        if (split.lower.lower.length === 1) {
          ret.push({ type: 'eq', values: [split.lower.lower.pop()] })
        } else {
          ret.push({ type: 'lt', values: [split.lower.lower.pop()] })
        }
        if (split.lower.upper.length === 1) {
          ret.push({ type: 'eq', values: [split.lower.upper.pop()] })
        } else {
          ret.push({ type: 'bt', values: [split.lower.upper.shift(), split.lower.upper.pop()] })
        }
        if (split.upper.lower.length === 1) {
          ret.push({ type: 'eq', values: [split.upper.lower.pop()] })
        } else {
          ret.push({ type: 'bt', values: [split.upper.lower.shift(), split.upper.lower.pop()] })
        }
        if (split.upper.upper.length === 1) {
          ret.push({ type: 'eq', values: [split.upper.upper.shift()] })
        } else {
          ret.push({ type: 'gt', values: [split.upper.upper.shift()] })
        }
    }

    data[key] = ret
  })

  return data
}