export default {
  name: 'notices',
  title: '공고사항',
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
      description: '공고사항의 상세 내용을 입력하세요'
    },
    {
      name: 'date',
      title: '작성일',
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
      description: 'author'
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