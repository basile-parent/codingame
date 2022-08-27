const errorHandler = (err, req, res, next) => {
  // console.debug("INTERCEPTION : headerSent ?", res.headersSent)
  if (res.headersSent) {
    return next(err)
  }

  const errorBody = err.message || err
  console.warn("ERROR HANDLER : ", errorBody)
  res.status(getStatusCode(errorBody))
  if (_containsLoginInformations(errorBody)) {
    res.send("An error occured regarding Jira authorization")
  } else {
    if (typeof errorBody === "object") {
      res.json(errorBody)
    } else {
      res.send(errorBody + "")
    }
  }
}

const _containsLoginInformations = errorBody => {
  if (!errorBody) {
    return false
  }

  const jsonString = JSON.stringify(errorBody)
  return jsonString.includes("Basic ") || jsonString.includes("Authorization")
}

const getStatusCode = err => {
  if (err.statusCode && !isNaN(err.statusCode)) {
    return err.statusCode
  }
  if (err.status && !isNaN(err.status)) {
    return err.status
  }
  return 500
}

export default errorHandler