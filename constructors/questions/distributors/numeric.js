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
    lower: values.slice(0, Math.max(medianIndex, 1)),
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
      if (acc[values[i]]) {
        acc[values[i]]++
        continue
      }
      acc[values[i]] = 1
      variantCount++
      //if (variantCount > 4) { break }
    }
    const variants = Object.keys(acc)
    let splitability = 0

    console.log(acc)

    switch (variants.length) {
      case 0:
      case 1: break
      case 2:
      case 3:
      case 4:
        let value
        let groupMembers = []
        while ((value = variants.shift())) {
          groupMembers.push(acc[value])
          ret.push({ type: 'eq', values: [value] })
        }
        splitability = math.min(groupMembers) * ret.length / values.length
        break
      default:
        const split = splitByMedian(values)
        split.lower = splitByMedian(split.lower)
        split.upper = splitByMedian(split.upper)
        let low
        let high

        low = split.lower.lower.slice(0, 1)[0]
        high = split.lower.lower.slice(-1)[0]
        if (split.lower.lower.length === 1 || low === high) {
          ret.push({ type: 'eq', values: [high] })
        } else {
          ret.push({ type: 'lt', values: [high] })
        }

        low = split.lower.upper.slice(0, 1)[0]
        high = split.lower.upper.slice(-1)[0]
        if (low) {
          if (split.lower.upper.length === 1 || low === high) {
            ret.push({ type: 'eq', values: [low] })
          } else {
            ret.push({ type: 'bt', values: [low, high] })
          }
        }

        low = split.upper.lower.slice(0, 1)[0]
        high = split.upper.lower.slice(-1)[0]
        if (low) {
          if (split.upper.lower.length === 1 || low === high) {
            ret.push({ type: 'eq', values: [low] })
          } else {
            ret.push({ type: 'bt', values: [low, high] })
          }
        }

        low = split.upper.upper.slice(0, 1)[0]
        high = split.upper.upper.slice(-1)[0]
        if (split.upper.upper.length === 1 || low === high) {
          ret.push({ type: 'eq', values: [low] })
        } else {
          ret.push({ type: 'gt', values: [low] })
        }

        splitability = ret.length / 4 // DIRTY because of performance
        break
    }

    data[key] = {
      values: ret,
      splitability
    }
  })

  return data
}
