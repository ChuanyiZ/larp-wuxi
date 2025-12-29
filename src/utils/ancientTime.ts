type TimeSegment = {
  branch: string
  rangeStart: number
  rangeEnd: number
}

const earthlyBranches: TimeSegment[] = [
  { branch: '子', rangeStart: 23, rangeEnd: 1 },
  { branch: '丑', rangeStart: 1, rangeEnd: 3 },
  { branch: '寅', rangeStart: 3, rangeEnd: 5 },
  { branch: '卯', rangeStart: 5, rangeEnd: 7 },
  { branch: '辰', rangeStart: 7, rangeEnd: 9 },
  { branch: '巳', rangeStart: 9, rangeEnd: 11 },
  { branch: '午', rangeStart: 11, rangeEnd: 13 },
  { branch: '未', rangeStart: 13, rangeEnd: 15 },
  { branch: '申', rangeStart: 15, rangeEnd: 17 },
  { branch: '酉', rangeStart: 17, rangeEnd: 19 },
  { branch: '戌', rangeStart: 19, rangeEnd: 21 },
  { branch: '亥', rangeStart: 21, rangeEnd: 23 },
]

const hourToShi = (hour: number): string => {
  const normalized = ((hour % 24) + 24) % 24
  for (const segment of earthlyBranches) {
    if (segment.rangeStart < segment.rangeEnd) {
      if (normalized >= segment.rangeStart && normalized < segment.rangeEnd) return segment.branch
    } else {
      // wrap-around (e.g., 子时 23-1)
      if (normalized >= segment.rangeStart || normalized < segment.rangeEnd) return segment.branch
    }
  }
  return ''
}

const hourToHalf = (hour: number): string => {
  return hour % 2 === 0 ? '正' : '初'
}

const quarters = ['初刻', '二刻', '三刻', '四刻', '五刻', '六刻', '七刻', '八刻']

const quarterFromMinutes = (minutes: number): string => {
  const idx = Math.floor(minutes / 15)
  return quarters[idx] ?? ''
}

export const toTraditionalTime = (date: Date = new Date()): string => {
  const hour = date.getHours()
  const minutes = date.getMinutes()
  const shi = hourToShi(hour)
  const half = hourToHalf(hour)
  const quarterLabel = quarterFromMinutes(minutes)
  return `${shi}${half}${quarterLabel}`
}
