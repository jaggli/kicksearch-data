module.exports = (vehicles, question) => {
  const data = vehicles
    .map(vehicle => vehicle[question.id])
    .reduce((data, value) => {
      data[value] = (data[value] || 0) + 1
      return data
    }, {})

  const ret = {
    values: [
      [1],
      [1, 2],
      [2, 3],
      [3]
    ]
  }

  console.log(vehicles.length)
  
  return ret
}
