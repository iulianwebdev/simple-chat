const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:3001' : 'https://uri.test'

const ajax = function (uri, payload, method) {
  let requestMethod = method || 'GET'

  let requestObj = {
    method: requestMethod,
    headers: {
      'content-type': 'application/json'
    }
  }

  if (requestMethod === 'POST') {
    requestObj.body = JSON.stringify(payload)
  }

  window.fetch(API_URL + '/' + uri, requestObj).then(response => {
    if (response.ok) {
      console.log(response.body)
    }
  })
}
