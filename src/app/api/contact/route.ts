// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      inquiryType, 
      businessType, 
      companyName, 
      region, 
      managerName, 
      phone, 
      email, 
      message 
    } = body

    // 1. 입력값 검증
    if (!inquiryType || !businessType || !managerName || !phone || !email || !message) {
      return NextResponse.json(
        { error: '필수 항목을 모두 입력해주세요.' },
        { status: 400 }
      )
    }

    // 개인이 아닌 경우 기관명 검증 추가
    if (businessType !== "개인" && !companyName) {
      return NextResponse.json(
        { error: '기관명을 입력해주세요.' },
        { status: 400 }
      )
    }

    // 2. 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식을 입력해주세요.' },
        { status: 400 }
      )
    }

    // 3. Supabase에 데이터 저장
    const { data, error: dbError } = await supabase
      .from('contact_forms')
      .insert([
        {
          inquiry_type: inquiryType,
          business_type: businessType,
          company_name: companyName || null,
          region: region || null,
          manager_name: managerName,
          phone: phone,
          email: email,
          message: message,
        },
      ])
      .select()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: '데이터 저장 중 오류가 발생했습니다.' },
        { status: 500 }
      )
    }

    // 4. 관리자에게 이메일 발송
    try {
      await resend.emails.send({
        from: 'sales@merlotlab.com',
        to: ['sales@merlotlab.com'],
        subject: `[메를로랩] 새로운 ${inquiryType === 'business' ? '견적 문의' : '모의 견적'}: ${managerName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #583CF2; border-bottom: 2px solid #583CF2; padding-bottom: 10px;">
              새로운 ${inquiryType === 'business' ? '견적 문의' : '모의 견적'}가 도착했습니다
            </h2>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #333; margin-top: 0;">문의자 정보</h3>
              <p><strong>문의 구분:</strong> ${inquiryType === 'business' ? '견적 문의' : '모의 견적'}</p>
              <p><strong>사업장 유형:</strong> ${businessType}</p>
              <p><strong>담당자:</strong> ${managerName}</p>
              ${companyName ? `<p><strong>기관명:</strong> ${companyName}</p>` : ''}
              ${region ? `<p><strong>지역:</strong> ${region}</p>` : ''}
              <p><strong>전화번호:</strong> ${phone}</p>
              <p><strong>이메일:</strong> ${email}</p>
            </div>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #333;">문의 내용</h3>
              <div style="background-color: #fff; padding: 15px; border-left: 4px solid #583CF2; border-radius: 4px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <p style="color: #666; font-size: 12px;">
              이 메일은 메를로랩 홈페이지 문의 양식을 통해 자동 발송되었습니다.<br>
              접수 시간: ${new Date().toLocaleString('ko-KR')}
            </p>
          </div>
        `,
      })
    } catch (emailError) {
      console.error('관리자 메일 발송 실패:', emailError)
    }

    // 5. 고객에게 자동 응답 이메일 발송
    try {
      await resend.emails.send({
        from: 'sales@merlotlab.com',
        to: [email],
        subject: '[메를로랩] 문의 접수 완료',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #583CF2;">문의 접수가 완료되었습니다</h2>
            
            <p>안녕하세요, <strong>${managerName}</strong>님!</p>
            
            <p>메를로랩에 ${inquiryType === 'business' ? '견적 문의' : '모의 견적 문의'}를 해주셔서 감사합니다.</p>
            
            <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin-top: 0; color: #333;">접수된 문의 정보</h3>
              <p><strong>문의 구분:</strong> ${inquiryType === 'business' ? '견적 문의' : '모의 견적'}</p>
              <p><strong>신청자 유형:</strong> ${businessType}</p>
              <p><strong>접수 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
            </div>
            
            <p>담당자가 검토 후 영업일 기준 24시간 내에 연락드리겠습니다.</p>
            
            <div style="background-color: #583CF2; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h4 style="margin: 0; color: white;">📞 긴급 문의</h4>
              <p style="margin: 5px 0 0 0;">전화: 02-862-1700 (평일 09:00-18:00)</p>
            </div>
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">
            <div style="color: #666; font-size: 14px;">
              <p><strong>메를로랩</strong></p>
              <p>서울특별시 금천구 디지털로9길 68 (가산동) 대륭포스트 타워 5차 2002~2005호</p>
              <p>이메일: sales@merlotlab.com</p>
              <p>웹사이트: <a href="https://merlotlab.com" style="color: #583CF2;">merlotlab.com</a></p>
            </div>
          </div>
        `,
      })
    } catch (autoReplyError) {
      console.error('고객 자동응답 메일 발송 실패:', autoReplyError)
    }

    return NextResponse.json(
      { 
        message: '문의가 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.',
        data: data?.[0] 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    )
  }
}