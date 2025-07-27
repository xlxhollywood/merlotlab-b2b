import { createClient } from 'next-sanity'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false, // 실시간 데이터
})

// 공시정보 타장 정의
export interface Disclosure {
  _id: string
  title: string
  content: string
  date: string
  author: string
}

// 공고사항 타입 정의
export interface Notice {
  _id: string
  title: string
  content: string
  date: string
  author: string
}

// 공고사항 목록 가져오기
export async function getNotices(): Promise<Notice[]> {
  return await client.fetch(
    `*[_type == "notices" && published == true] | order(date desc) {
      _id,
      title,
      content,
      date,
      author
    }`
  )
}

// 공시정보 목록 가져오기
export async function getDisclosures(): Promise<Disclosure[]> {
  return await client.fetch(
    `*[_type == "disclosures" && published == true] | order(date desc) {
      _id,
      title,
      content,
      date,
      author
    }`
  )
}

// 특정 공시정보 가져오기
export async function getDisclosure(id: string): Promise<Disclosure | null> {
  return await client.fetch(
    `*[_type == "disclosures" && _id == $id][0] {
      _id,
      title,
      content,
      date,
      author
    }`,
    { id }
  )
}

// 특정 공고사항 가져오기
export async function getNotice(id: string): Promise<Notice | null> {
  return await client.fetch(
    `*[_type == "notices" && _id == $id][0] {
      _id,
      title,
      content,
      date,
      author
    }`,
    { id }
  )
}
