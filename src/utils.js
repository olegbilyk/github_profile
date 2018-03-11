export function asyncLoadDataAsArray (arr, callback) {
  let accumulator = []
  let ready = Promise.resolve(null)

  arr.forEach((promise, index) => {
    ready = ready.then(() => promise).then(resolve => accumulator[index] = resolve)
  })

  return ready.then(() => accumulator).then(resolve => callback(false, [...resolve])).catch(error => callback(error, null))
}

export function asyncLoadDataAsObject (obj, callback) {
  let accumulator = {}
  let ready = Promise.resolve(null)

  Object.entries(obj).forEach(([key, value]) => {
    ready = ready.then(() => value).then(resolve => accumulator[key] = resolve)
  })

  return ready.then(() => accumulator).then(resolve => callback(false, {...resolve})).catch(error => callback(error, null))
}
