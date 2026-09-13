import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { documentName, fileType } = body;

    // Simulate AI document classification & NER (Named Entity Recognition) extraction
    const filenameLower = (documentName || '').toLowerCase();

    let extractedData = {
      confidenceScore: 0.94,
      documentType: 'TRANSFER_DECISION',
      suggestedTitle: 'Project Transfer Decision - MSS Expansion',
      employeeCode: 'EMP-001',
      employeeName: 'Nguyen Van A',
      decisionDate: '2024-05-28',
      effectiveDate: '2024-06-01',
      oldValue: 'Project ABC',
      newValue: 'MSS Project',
      sourceSystem: 'SharePoint',
      sourcePath: `SharePoint://HR/Transfers/2024/${documentName || 'Transfer_Decision.pdf'}`,
      extractedTextSnippet:
        'DECISION OF THE BOARD OF DIRECTORS: Article 1: Transfer Mr. Nguyen Van A (EMP-001) from Project ABC to MSS Project effective June 1st, 2024.',
    };

    if (filenameLower.includes('exit') || filenameLower.includes('resignation')) {
      extractedData = {
        confidenceScore: 0.98,
        documentType: 'EXIT_INTERVIEW_FORM',
        suggestedTitle: 'Exit Interview & Departure Survey',
        employeeCode: 'EMP-002',
        employeeName: 'Tran Thi B',
        decisionDate: '2024-09-20',
        effectiveDate: '2024-09-30',
        oldValue: 'ACTIVE',
        newValue: 'TERMINATED',
        sourceSystem: 'SharePoint',
        sourcePath: `SharePoint://HR/Offboarding/2024/${documentName || 'Exit_Interview.pdf'}`,
        extractedTextSnippet:
          'EXIT INTERVIEW FORM: Subject: Tran Thi B (EMP-002). Last Working Date: 30 Sep 2024. Main reason for departure: Career transition.',
      };
    } else if (filenameLower.includes('appointment') || filenameLower.includes('promotion')) {
      extractedData = {
        confidenceScore: 0.96,
        documentType: 'APPOINTMENT_DECISION',
        suggestedTitle: 'Promotion & Position Appointment Decision',
        employeeCode: 'EMP-001',
        employeeName: 'Nguyen Van A',
        decisionDate: '2024-12-25',
        effectiveDate: '2025-01-01',
        oldValue: 'Software Engineer',
        newValue: 'Senior Software Engineer',
        sourceSystem: 'SharePoint',
        sourcePath: `SharePoint://HR/Appointments/2025/${documentName || 'Appointment_Decision.pdf'}`,
        extractedTextSnippet:
          'PROMOTION DECISION: Appoint Mr. Nguyen Van A (EMP-001) to Senior Software Engineer position effective January 1, 2025.',
      };
    }

    return NextResponse.json({ success: true, extractedData });
  } catch (error) {
    console.error('Error simulating AI extraction:', error);
    return NextResponse.json({ error: 'AI Extraction failed' }, { status: 500 });
  }
}
