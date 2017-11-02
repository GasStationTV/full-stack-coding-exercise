import R from 'ramda'

const idRegex = /^[0-9a-fA-F]{24}$/

const isId = R.test(idRegex)

export default { idRegex, isId }
