import BigNumber from 'bignumber.js'
BigNumber.config({
  EXPONENTIAL_AT: 100,
  FORMAT: {
    prefix: '', // string to prepend
    decimalSeparator: '.', // decimal separator
    groupSeparator: ',', // grouping separator of the integer part
    groupSize: 3, // primary grouping size of the integer part
    secondaryGroupSize: 0, // secondary grouping size of the integer part
    fractionGroupSeparator: ' ', // grouping separator of the fraction part
    fractionGroupSize: 0, // grouping size of the fraction part
    suffix: '', // string to append
  },
})
export default function () {
  const add = (x: (number | string | BigNumber)[]) => {
    return BigNumber.sum.apply(null, x).toNumber()
  }
  const minus = (x: number, y: number) => {
    return new BigNumber(x).minus(new BigNumber(y)).toNumber()
  }
  const multiply = (x: number, y: number) => {
    return new BigNumber(x).multipliedBy(new BigNumber(y)).toNumber()
  }
  const divided = (x: number, y: number) => {
    return new BigNumber(x).dividedBy(new BigNumber(y)).toNumber()
  }
  const compare = (x: number, y: number) => {
    return new BigNumber(x).comparedTo(new BigNumber(y))
  }
  const flooring = (value: number, place = 2, isRoundUp: false) => {
    if (!value || !place) return
    try {
      const format = new BigNumber(value).toFixed(
        Number(place),
        isRoundUp ? BigNumber.ROUND_UP : BigNumber.ROUND_DOWN
      )
      return format
    } catch (error) {
      return value
    }
  }
  const currencyFormat = (value: number | string, decimal?: number) => {
    const valid = value && !isNaN(+value) && isFinite(+value)
    if (!valid) return value
    try {
      const format = decimal
        ? new BigNumber(value).toFormat(decimal).toString()
        : new BigNumber(value).toFormat().toString()
      return format
    } catch (error) {
      return value
    }
  }
  return {
    add,
    minus,
    multiply,
    divided,
    compare,
    flooring,
    currencyFormat,
  }
}
