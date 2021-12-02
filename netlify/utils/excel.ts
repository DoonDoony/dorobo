import ExcelJS from 'exceljs'
import { forEach, toPairs } from 'lodash'
import { Restaurant } from '../types'

const headers = {
  name: '업체명',
  address: '주소',
  phone: '전화번호',
  category: '카테고리',
  subtitle: '서브타이틀',
  rating: '별점',
  visitorReviewCount: '방문자리뷰',
  blogReviewCount: '블로그리뷰',
}

type Row = {
  [key: string]: Restaurant[]
}

export async function toExcelFromFromRestaurants(rows: Row[]) {
  const workbook = new ExcelJS.Workbook()
  rows.forEach(restaurants => {
    forEach(restaurants, (items, place) => {
      const sheet = workbook.addWorksheet(place)
      sheet.columns = toPairs(headers).map(([key, value]) => {
        return {
          header: value,
          key,
        }
      })
      const rows = items.map(item => {
        return {
          name: item.name,
          address: item.address,
          phone: item.phone,
          category: item.category,
          subtitle:
            item.michelinGuide &&
            `미쉐린 가이드 서울 ${item.michelinGuide.year}`,
          rating: item.visitorReviewScore,
          visitorReviewCount: item.visitorReviewCount,
          blogReviewCount: item.blogCafeReviewCount,
        }
      })
      sheet.addRows(rows)
    })
  })

  const arrayBuffer = await workbook.xlsx.writeBuffer()
  return Buffer.from(new Uint8Array(arrayBuffer))
}
