const send = (res, obj) => {
  let data = JSON.stringify(obj, null, '  ')

  // TODO: last-modified header new Date("2016-12-02T14:36:04.000Z").toUTCString()

  res.writeHead(200, {
    'Content-Length': Buffer.byteLength(data, 'utf8'),
    'Content-Type': 'application/json'
  })
  res.end(data)
}

const sendError = (res, status, message, data) => {
  data = data || {}
  res.status = status
  send(res, Object.assign({ status, message }, data))
}

const notFound = (res, data) => sendError(res, 404, 'Not found', data)
const badInput = (res, data) => sendError(res, 400, 'Bad request', data)

module.exports = {
  send,
  notFound,
  badInput
}
