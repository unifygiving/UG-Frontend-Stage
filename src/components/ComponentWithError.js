import React from 'react'

/*
Component manually trigger errors to test exception handling
*/

const ComponentWithError = () => {
  React.useEffect(() => {
    throw new Error('This is a test error thrown by ComponentWithError.')
  }, [])

  return null
}

export default ComponentWithError
