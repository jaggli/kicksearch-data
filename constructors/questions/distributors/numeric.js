module.exports = (vehicles, keys) => {
  const data = {}
  keys.forEach(key => {
    data[key] = vehicles.map(vehicle => vehicle[key])
  })

  const ret = {
    values: [
      [1],
      [1, 2],
      [2, 3],
      [3]
    ]
  }
  
  return ret
}



// module.exports = (vehicles, keys) => {
//   const data = vehicles
//     .reduce((data, vehicle) => {
//       keys.forEach(key => {
//         const value = vehicle[key]
//         data[key] = data[key] || {}
//         data[key][value] = (data[key][value] || 0) + 1
//       })
//       return data
//     }, {})

//   const ret = {
//     values: [
//       [1],
//       [1, 2],
//       [2, 3],
//       [3]
//     ]
//   }

//   console.log(data)
  
//   return ret
// }
