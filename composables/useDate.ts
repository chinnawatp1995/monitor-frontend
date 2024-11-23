const config = {
  timezone: 'Asia/Bangkok',
  defaultFormat: 'DD/MM/YYYY',
}

type UnitTime = 'year' | 'month' | 'week' | 'day' | 'hour' | 'minute' | 'second'

export default function () {
  const dayjs = useDayjs()

  const dateTimeFormat = (date: Date | string | number, fmt?: string) => {
    if (!date) return date?.toString()
    try {
      return dayjs.tz(date).format(fmt || config.defaultFormat)
    } catch (error) {
      return date?.toString()
    }
  }
  const startOfTime = (date: Date | string | number, unit: UnitTime) => {
    return dayjs.tz(date).startOf(unit).toDate()
  }
  const endOfTime = (date: Date | string | number, unit: UnitTime) => {
    return dayjs.tz(date).endOf(unit).toDate()
  }
  const addTime = (
    date: Date | string | number,
    duration: number,
    unit: UnitTime,
  ) => {
    return dayjs.tz(date).add(duration, unit).toDate()
  }
  const subTime = (
    date: Date | string | number,
    duration: number,
    unit: UnitTime,
  ) => {
    return dayjs.tz(date).subtract(duration, unit).toDate()
  }

  return {
    dateTimeFormat,
    config,
    startOfTime,
    endOfTime,
    addTime,
    subTime,
  }
}
