import { createClient } from "next-sanity"

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2024-01-01",
  useCdn: false, // 실시간 데이터
})

// Disclosure 타입 정의를 하나로 통합
export interface Disclosure {
  _id: string
  _createdAt: string // _createdAt 추가
  title: string
  date: string
  author: string
  content: string
  published: boolean
  featuredImage?: {
    asset: { _ref: string; url: string }
    alt?: string // alt 속성 추가
    // 다른 이미지 관련 속성 (예: hotspot, crop)이 있다면 여기에 추가
  }
  attachments?: any[] // 첨부파일은 다운로드 기능에서 신경쓰지 않으므로 그대로 둡니다.
  imageUrl?: string // 대표 이미지 URL을 위한 필드
}

// 공고사항 타입 정의
export interface Notice {
  _id: string
  title: string
  content: string
  date: string
  author: string
}

// 네비게이션용 인터페이스 추가
export interface NavigationItem {
  _id: string
  title: string
}

// 공고사항 목록 가져오기
export async function getNotices(): Promise<Notice[]> {
  return await client.fetch(`
    *[_type == "notices" && published == true] | order(date desc) {
      _id,
      title,
      content,
      date,
      author
    }
  `)
}

// 공시정보 목록 가져오기
export async function getDisclosures(): Promise<Disclosure[]> {
  return await client.fetch(`
    *[_type == "disclosures" && published == true] | order(date desc) {
      _id,
      _createdAt,
      title,
      content,
      date,
      author,
      "imageUrl": featuredImage.asset->url // featuredImage의 URL을 imageUrl로 가져옴
    }
  `)
}

// 특정 공시정보 가져오기
export async function getDisclosure(id: string): Promise<Disclosure | null> {
  return await client.fetch(
    `
        *[_type == "disclosures" && _id == $id][0] {
          _id,
          title,
          content,
          date,
          author,
          featuredImage { // featuredImage 객체 전체를 가져옴
            asset->{ // asset 참조의 세부 정보
              _id,
              url,
              originalFilename,
              mimeType
            },
            alt // <-- alt 필드를 여기서 가져옴
          },
          attachments[]{
            asset->{
              _id,
              url,
              originalFilename,
              mimeType
            }
          },
          "imageUrl": featuredImage.asset->url // overview 페이지를 위해 imageUrl 유지
        }`,
    { id },
  )
}

// 특정 공고사항 가져오기
export async function getNotice(id: string): Promise<Notice | null> {
  return await client.fetch(
    `
    *[_type == "notices" && _id == $id][0] {
      _id,
      title,
      content,
      date,
      author
    }`,
    { id },
  )
}

// 이전 공시정보 가져오기
export async function getPrevDisclosure(currentId: string, currentDate: string): Promise<NavigationItem | null> {
  return await client.fetch(
    `
    *[_type == "disclosures" && published == true && date < $currentDate && _id != $currentId] | order(date desc)[0] {
      _id,
      title
    }`,
    { currentId, currentDate },
  )
}

// 다음 공시정보 가져오기
export async function getNextDisclosure(currentId: string, currentDate: string): Promise<NavigationItem | null> {
  return await client.fetch(
    `
    *[_type == "disclosures" && published == true && date > $currentDate && _id != $currentId] | order(date asc)[0] {
      _id,
      title
    }`,
    { currentId, currentDate },
  )
}

// 이전 공고사항 가져오기
export async function getPrevNotice(currentId: string, currentDate: string): Promise<NavigationItem | null> {
  return await client.fetch(
    `
    *[_type == "notices" && published == true && date < $currentDate && _id != $currentId] | order(date desc)[0] {
      _id,
      title
    }`,
    { currentId, currentDate },
  )
}

// 다음 공고사항 가져오기
export async function getNextNotice(currentId: string, currentDate: string): Promise<NavigationItem | null> {
  return await client.fetch(
    `
    *[_type == "notices" && published == true && date > $currentDate && _id != $currentId] | order(date asc)[0] {
      _id,
      title
    }`,
    { currentId, currentDate },
  )
}

export { client }
