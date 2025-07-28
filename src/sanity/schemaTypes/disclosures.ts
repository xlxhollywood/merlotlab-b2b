export default {
  name: 'disclosures',
  title: '공시정보',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '제목',
      type: 'string',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'content',
      title: '내용',
      type: 'text',
      rows: 10,
      description: '공시정보의 상세 내용을 입력하세요'
    },
    {
      name: 'featuredImage',
      title: '대표 이미지',
      type: 'image',
      options: {
        hotspot: true, // 이미지 크롭 기능
      },
      fields: [
        {
          name: 'alt',
          title: '공시 정보 설명',
          type: 'string',
          description: '공시 정보 설명'
        }
      ]
    },
    // 🔥 첨부파일 필드 추가
    {
      name: 'attachments',
      title: '첨부파일',
      type: 'array',
      description: '추가 이미지나 자료를 업로드하세요',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              title: '파일 설명',
              type: 'string',
              description: '파일에 대한 설명을 입력하세요'
            }
          ]
        }
      ]
    },
    {
      name: 'date',
      title: '공시일',
      type: 'date',
      validation: (Rule: any) => Rule.required(),
      initialValue: () => new Date().toISOString().split('T')[0]
    },
    {
      name: 'author',
      title: '작성자',
      type: 'string',
      initialValue: '관리자'
    },
    {
      name: 'published',
      title: '게시여부',
      type: 'boolean',
      initialValue: true
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'date',
      description: 'author',
    },
    prepare(selection: any) {
      const {title, subtitle, description} = selection
      return {
        title: title,
        subtitle: `${subtitle} | ${description}`
      }
    }
  }
}