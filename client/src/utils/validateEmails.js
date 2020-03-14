// Helpers for Email validation
export default (emails) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


  const invalidEmailArr = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => emailRegex.test(email) === false)

  if (invalidEmailArr.length) {
    return `These emails are invalid: ${invalidEmailArr}`
  }

};
