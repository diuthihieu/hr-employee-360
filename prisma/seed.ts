import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding People360 demo data...');

  // Clean existing data
  await prisma.offboardingCase.deleteMany();
  await prisma.attendanceSummary.deleteMany();
  await prisma.competencyScore.deleteMany();
  await prisma.competencyAssessment.deleteMany();
  await prisma.performanceReview.deleteMany();
  await prisma.trainingRecord.deleteMany();
  await prisma.document.deleteMany();
  await prisma.employeeEvent.deleteMany();
  await prisma.employee.deleteMany();

  // 1. Nguyen Van A (EMP-001) - Promoted, Transferred, Active
  const emp1 = await prisma.employee.create({
    data: {
      employeeCode: 'EMP-001',
      fullName: 'Nguyen Van A',
      email: 'nguyen.van.a@company.com',
      joinDate: new Date('2023-03-15'),
      employmentStatus: 'ACTIVE',
      currentTitle: 'Senior Software Engineer',
      currentDepartment: 'Software Engineering',
      currentProject: 'MSS Project',
      currentManager: 'Pham Hoang Nam',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      location: 'Ho Chi Minh City',
    },
  });

  // Events for Nguyen Van A
  const e1_ev1 = await prisma.employeeEvent.create({
    data: {
      employeeId: emp1.id,
      eventType: 'RECRUITMENT',
      eventDate: new Date('2023-02-10'),
      title: 'Interview & Candidate Selection',
      description: 'Passed technical coding round and culture fit interview with 4.5/5 score.',
      status: 'COMPLETED',
    },
  });

  const e1_ev2 = await prisma.employeeEvent.create({
    data: {
      employeeId: emp1.id,
      eventType: 'ONBOARD',
      eventDate: new Date('2023-03-15'),
      effectiveFrom: new Date('2023-03-15'),
      title: 'Joined Company as Junior Developer',
      description: 'Initial employment onboarding in Software Engineering department.',
      newValue: 'Junior Software Engineer',
      status: 'COMPLETED',
    },
  });

  const e1_ev3 = await prisma.employeeEvent.create({
    data: {
      employeeId: emp1.id,
      eventType: 'PROBATION',
      eventDate: new Date('2023-05-15'),
      title: 'Probation Assessment Passed',
      description: 'Passed 2-month probation with official score 4.1/5. Recommended for official contract.',
      oldValue: 'Probationary Employee',
      newValue: 'Official Employee',
      status: 'COMPLETED',
    },
  });

  const e1_ev4 = await prisma.employeeEvent.create({
    data: {
      employeeId: emp1.id,
      eventType: 'PROJECT_CHANGE',
      eventDate: new Date('2024-06-01'),
      effectiveFrom: new Date('2024-06-01'),
      title: 'Project Transfer Decision',
      description: 'Transferred core developer role from ABC Project to MSS Project due to strategic expansion.',
      oldValue: 'Project ABC',
      newValue: 'MSS Project',
      status: 'COMPLETED',
    },
  });

  const e1_ev5 = await prisma.employeeEvent.create({
    data: {
      employeeId: emp1.id,
      eventType: 'APPOINTMENT',
      eventDate: new Date('2025-01-01'),
      effectiveFrom: new Date('2025-01-01'),
      title: 'Promotion to Senior Software Engineer',
      description: 'Promoted based on 2024 Annual Performance rating of 4.4/5 and technical leadership on MSS Project.',
      oldValue: 'Software Engineer',
      newValue: 'Senior Software Engineer',
      status: 'COMPLETED',
    },
  });

  const e1_ev6 = await prisma.employeeEvent.create({
    data: {
      employeeId: emp1.id,
      eventType: 'SALARY_CHANGE',
      eventDate: new Date('2025-01-01'),
      effectiveFrom: new Date('2025-01-01'),
      title: 'Annual Salary Adjustment',
      description: 'Salary adjustment accompanying promotion to Senior Engineer.',
      oldValue: '$1,800 USD',
      newValue: '$2,500 USD',
      status: 'COMPLETED',
    },
  });

  // Documents for Nguyen Van A
  const d1_1 = await prisma.document.create({
    data: {
      employeeId: emp1.id,
      eventId: e1_ev1.id,
      documentType: 'CV',
      documentTitle: 'Nguyen_Van_A_Curriculum_Vitae_2023.pdf',
      documentDate: new Date('2023-02-05'),
      fileName: 'CV_Nguyen_Van_A.pdf',
      fileType: 'pdf',
      sourceSystem: 'SharePoint',
      sourcePath: 'SharePoint://HR/Recruitment/2023/CV_Nguyen_Van_A.pdf',
      sourceUrl: 'https://sharepoint.company.com/hr/recruitment/2023/CV_Nguyen_Van_A.pdf',
      version: '1.0',
      documentStatus: 'VALID',
    },
  });

  const d1_2 = await prisma.document.create({
    data: {
      employeeId: emp1.id,
      eventId: e1_ev1.id,
      documentType: 'INTERVIEW_EVALUATION',
      documentTitle: 'Interview_Evaluation_Form_EMP001.pdf',
      documentDate: new Date('2023-02-12'),
      fileName: 'Interview_Eval_EMP001.pdf',
      fileType: 'pdf',
      sourceSystem: 'SharePoint',
      sourcePath: 'SharePoint://HR/Recruitment/Evaluations/Interview_Eval_EMP001.pdf',
      version: '1.0',
      documentStatus: 'VALID',
    },
  });

  const d1_3 = await prisma.document.create({
    data: {
      employeeId: emp1.id,
      eventId: e1_ev2.id,
      documentType: 'LABOUR_CONTRACT',
      documentTitle: 'Labour_Contract_HDLD_2023_089.pdf',
      documentDate: new Date('2023-03-15'),
      effectiveDate: new Date('2023-03-15'),
      fileName: 'HDLD_2023_089.pdf',
      fileType: 'pdf',
      sourceSystem: 'Local HR Folder',
      sourcePath: '\\\\NAS-HR\\Contracts\\2023\\HDLD_2023_089.pdf',
      version: '1.0',
      documentStatus: 'VALID',
    },
  });

  const d1_4 = await prisma.document.create({
    data: {
      employeeId: emp1.id,
      eventId: e1_ev4.id,
      documentType: 'TRANSFER_DECISION',
      documentTitle: 'Decision_Transfer_Project_MSS_2024_045.pdf',
      documentDate: new Date('2024-05-28'),
      effectiveDate: new Date('2024-06-01'),
      fileName: 'Transfer_MSS_2024_045.pdf',
      fileType: 'pdf',
      sourceSystem: 'OneDrive Enterprise',
      sourcePath: 'OneDrive://HR-Transfers/2024/Transfer_MSS_2024_045.pdf',
      version: '1.0',
      documentStatus: 'VALID',
    },
  });

  const d1_5 = await prisma.document.create({
    data: {
      employeeId: emp1.id,
      eventId: e1_ev5.id,
      documentType: 'APPOINTMENT_DECISION',
      documentTitle: 'Decision_Appointment_Senior_Developer_2025_002.pdf',
      documentDate: new Date('2024-12-25'),
      effectiveDate: new Date('2025-01-01'),
      fileName: 'Appointment_Senior_2025_002.pdf',
      fileType: 'pdf',
      sourceSystem: 'SharePoint',
      sourcePath: 'SharePoint://HR/Appointments/2025/Appointment_Senior_2025_002.pdf',
      version: '1.0',
      documentStatus: 'VALID',
    },
  });

  // Training Records for EMP-001
  await prisma.trainingRecord.createMany({
    data: [
      {
        employeeId: emp1.id,
        courseCode: 'TRN-AWS-01',
        courseName: 'AWS Certified Solutions Architect Training',
        trainingType: 'External',
        startDate: new Date('2023-07-01'),
        completionDate: new Date('2023-08-15'),
        learningHours: 40,
        learningHoursInsideWorkingTime: 24,
        learningHoursOutsideWorkingTime: 16,
        score: 92,
        result: 'Distinction',
        certificateUrl: 'https://sharepoint.company.com/certificates/AWS_NguyenVanA.pdf',
      },
      {
        employeeId: emp1.id,
        courseCode: 'TRN-SEC-02',
        courseName: 'Enterprise Application Security & OWASP Top 10',
        trainingType: 'Internal',
        startDate: new Date('2024-03-10'),
        completionDate: new Date('2024-03-12'),
        learningHours: 16,
        learningHoursInsideWorkingTime: 16,
        learningHoursOutsideWorkingTime: 0,
        score: 88,
        result: 'Passed',
      },
      {
        employeeId: emp1.id,
        courseCode: 'TRN-LEAD-01',
        courseName: 'Tech Lead Leadership & Code Review Best Practices',
        trainingType: 'Workshop',
        startDate: new Date('2024-11-05'),
        completionDate: new Date('2024-11-07'),
        learningHours: 12,
        learningHoursInsideWorkingTime: 8,
        learningHoursOutsideWorkingTime: 4,
        score: 95,
        result: 'Distinction',
      },
    ],
  });

  // Performance Reviews for EMP-001
  await prisma.performanceReview.createMany({
    data: [
      {
        employeeId: emp1.id,
        reviewPeriod: '2023 Annual',
        reviewDate: new Date('2023-12-20'),
        reviewType: 'Annual',
        performanceScore: 4.1,
        rating: 'Exceeds Expectations',
        reviewer: 'Pham Hoang Nam',
      },
      {
        employeeId: emp1.id,
        reviewPeriod: '2024 Annual',
        reviewDate: new Date('2024-12-18'),
        reviewType: 'Annual',
        performanceScore: 4.4,
        rating: 'Outstanding',
        reviewer: 'Pham Hoang Nam',
      },
      {
        employeeId: emp1.id,
        reviewPeriod: '2025 Mid-Year',
        reviewDate: new Date('2025-06-25'),
        reviewType: 'Mid-Year',
        performanceScore: 4.5,
        rating: 'Outstanding',
        reviewer: 'Pham Hoang Nam',
      },
    ],
  });

  // Competency Assessment for EMP-001
  const comp1 = await prisma.competencyAssessment.create({
    data: {
      employeeId: emp1.id,
      reviewPeriod: '2025 H1',
      assessmentDate: new Date('2025-06-25'),
    },
  });

  await prisma.competencyScore.createMany({
    data: [
      { assessmentId: comp1.id, competencyName: 'System Architecture', competencyCategory: 'Technical', requiredLevel: 4, actualLevel: 5, gap: 1 },
      { assessmentId: comp1.id, competencyName: 'Code Quality & Testing', competencyCategory: 'Technical', requiredLevel: 4, actualLevel: 4, gap: 0 },
      { assessmentId: comp1.id, competencyName: 'Problem Solving', competencyCategory: 'Core Values', requiredLevel: 4, actualLevel: 5, gap: 1 },
      { assessmentId: comp1.id, competencyName: 'Cross-team Communication', competencyCategory: 'Soft Skills', requiredLevel: 4, actualLevel: 4, gap: 0 },
      { assessmentId: comp1.id, competencyName: 'Mentorship & Leadership', competencyCategory: 'Leadership', requiredLevel: 3, actualLevel: 4, gap: 1 },
    ],
  });

  // Monthly Attendance for EMP-001 (2025 Jan-Jun)
  for (let m = 1; m <= 6; m++) {
    await prisma.attendanceSummary.create({
      data: {
        employeeId: emp1.id,
        year: 2025,
        month: m,
        standardWorkingDays: 22,
        actualWorkingDays: 22,
        workingHours: 176,
        paidLeaveDays: m === 3 ? 1 : 0,
        unpaidLeaveDays: 0,
        lateCount: m === 2 ? 1 : 0,
        earlyLeaveCount: 0,
        otHours: 8.5 + m * 2,
        weekdayOtHours: 6.5 + m * 1.5,
        weekendOtHours: 2.0 + m * 0.5,
        holidayOtHours: 0,
      },
    });
  }

  // 2. Tran Thi B (EMP-002) - Terminated Employee with Full Offboarding Lifecycle
  const emp2 = await prisma.employee.create({
    data: {
      employeeCode: 'EMP-002',
      fullName: 'Tran Thi B',
      email: 'tran.thi.b@company.com',
      joinDate: new Date('2022-01-10'),
      terminationDate: new Date('2024-09-30'),
      employmentStatus: 'TERMINATED',
      currentTitle: 'HR Business Partner',
      currentDepartment: 'Human Resources',
      currentManager: 'Dang Thi Mai',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    },
  });

  const e2_ev1 = await prisma.employeeEvent.create({
    data: {
      employeeId: emp2.id,
      eventType: 'RESIGNATION',
      eventDate: new Date('2024-08-15'),
      title: 'Resignation Letter Submitted',
      description: 'Employee submitted formal 45-day notice of resignation due to personal career transition.',
      status: 'COMPLETED',
    },
  });

  const e2_ev2 = await prisma.employeeEvent.create({
    data: {
      employeeId: emp2.id,
      eventType: 'EXIT_INTERVIEW',
      eventDate: new Date('2024-09-20'),
      title: 'Exit Interview Conducted',
      description: 'Exit interview form completed. Feedback focused on workload allocation and career advancement.',
      status: 'COMPLETED',
    },
  });

  const e2_ev3 = await prisma.employeeEvent.create({
    data: {
      employeeId: emp2.id,
      eventType: 'HANDOVER',
      eventDate: new Date('2024-09-28'),
      title: 'Work & Asset Handover Completed',
      description: 'Completed handover of HR BP cases to Dang Thi Mai. Laptop and security badge returned.',
      status: 'COMPLETED',
    },
  });

  const e2_ev4 = await prisma.employeeEvent.create({
    data: {
      employeeId: emp2.id,
      eventType: 'TERMINATION',
      eventDate: new Date('2024-09-30'),
      effectiveFrom: new Date('2024-09-30'),
      title: 'Official Employment Termination',
      description: 'Labour contract officially terminated upon mutual agreement.',
      oldValue: 'ACTIVE',
      newValue: 'TERMINATED',
      status: 'COMPLETED',
    },
  });

  // Offboarding Documents for EMP-002
  await prisma.document.createMany({
    data: [
      {
        employeeId: emp2.id,
        eventId: e2_ev1.id,
        documentType: 'RESIGNATION_LETTER',
        documentTitle: 'Resignation_Letter_Tran_Thi_B_2024.pdf',
        documentDate: new Date('2024-08-15'),
        fileName: 'Resignation_Letter_TranThiB.pdf',
        fileType: 'pdf',
        sourceSystem: 'SharePoint',
        sourcePath: 'SharePoint://HR/Offboarding/2024/Resignation_Letter_TranThiB.pdf',
        documentStatus: 'VALID',
      },
      {
        employeeId: emp2.id,
        eventId: e2_ev2.id,
        documentType: 'EXIT_INTERVIEW_FORM',
        documentTitle: 'Exit_Interview_Form_EMP002.pdf',
        documentDate: new Date('2024-09-20'),
        fileName: 'Exit_Interview_EMP002.pdf',
        fileType: 'pdf',
        sourceSystem: 'SharePoint',
        sourcePath: 'SharePoint://HR/Offboarding/2024/Exit_Interview_EMP002.pdf',
        documentStatus: 'VALID',
      },
      {
        employeeId: emp2.id,
        eventId: e2_ev3.id,
        documentType: 'HANDOVER_RECORD',
        documentTitle: 'Handover_Record_Assets_Tasks_EMP002.pdf',
        documentDate: new Date('2024-09-28'),
        fileName: 'Handover_Record_EMP002.pdf',
        fileType: 'pdf',
        sourceSystem: 'Local HR Folder',
        sourcePath: '\\\\NAS-HR\\Offboarding\\2024\\Handover_Record_EMP002.pdf',
        documentStatus: 'VALID',
      },
      {
        employeeId: emp2.id,
        eventId: e2_ev4.id,
        documentType: 'TERMINATION_AGREEMENT',
        documentTitle: 'Contract_Termination_Agreement_HDLD_2024_088.pdf',
        documentDate: new Date('2024-09-30'),
        effectiveDate: new Date('2024-09-30'),
        fileName: 'Termination_Agreement_088.pdf',
        fileType: 'pdf',
        sourceSystem: 'SharePoint',
        sourcePath: 'SharePoint://HR/Contracts/Terminated/Termination_Agreement_088.pdf',
        documentStatus: 'VALID',
      },
    ],
  });

  // Offboarding Case for EMP-002
  await prisma.offboardingCase.create({
    data: {
      employeeId: emp2.id,
      resignationDate: new Date('2024-08-15'),
      lastWorkingDate: new Date('2024-09-30'),
      status: 'COMPLETED',
      resignationDone: true,
      exitInterviewDone: true,
      handoverDone: true,
      finalTimesheetDone: true,
      assetReturnDone: true,
      terminationAgreementSigned: true,
      socialInsuranceDone: true,
    },
  });

  // 3. Le Hoang C (EMP-003) - Solutions Architect with Concurrent Assignment
  const emp3 = await prisma.employee.create({
    data: {
      employeeCode: 'EMP-003',
      fullName: 'Le Hoang C',
      email: 'le.hoang.c@company.com',
      joinDate: new Date('2021-06-01'),
      employmentStatus: 'ACTIVE',
      currentTitle: 'Principal Solutions Architect',
      currentDepartment: 'Cloud & Infrastructure',
      currentProject: 'Enterprise Cloud Migration',
      currentManager: 'Vu Duc Thang',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
  });

  const e3_ev1 = await prisma.employeeEvent.create({
    data: {
      employeeId: emp3.id,
      eventType: 'CONCURRENT_ASSIGNMENT',
      eventDate: new Date('2024-02-01'),
      effectiveFrom: new Date('2024-02-01'),
      effectiveTo: new Date('2025-02-01'),
      title: 'Concurrent Assignment: Interim Tech Lead (AI Taskforce)',
      description: 'Assigned 40% bandwidth as Interim Tech Lead for the AI R&D Taskforce alongside core Principal Architect duties.',
      newValue: 'Principal Architect + Concurrent AI Taskforce Lead',
      status: 'COMPLETED',
    },
  });

  await prisma.document.create({
    data: {
      employeeId: emp3.id,
      eventId: e3_ev1.id,
      documentType: 'CONCURRENT_ASSIGNMENT_DECISION',
      documentTitle: 'Decision_Concurrent_Assignment_AI_2024_011.pdf',
      documentDate: new Date('2024-01-25'),
      effectiveDate: new Date('2024-02-01'),
      fileName: 'Concurrent_Assignment_AI_011.pdf',
      fileType: 'pdf',
      sourceSystem: 'SharePoint',
      sourcePath: 'SharePoint://HR/Appointments/2024/Concurrent_Assignment_AI_011.pdf',
      documentStatus: 'VALID',
    },
  });

  // 4. Pham Minh D (EMP-004) - Decision Superseded Example
  const emp4 = await prisma.employee.create({
    data: {
      employeeCode: 'EMP-004',
      fullName: 'Pham Minh D',
      email: 'pham.minh.d@company.com',
      joinDate: new Date('2022-09-01'),
      employmentStatus: 'ACTIVE',
      currentTitle: 'Marketing Communications Lead',
      currentDepartment: 'Growth & Marketing',
      currentManager: 'Bui Thanh Huong',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    },
  });

  // Document 1 (superseded)
  const d4_orig = await prisma.document.create({
    data: {
      employeeId: emp4.id,
      documentType: 'SALARY_DECISION',
      documentTitle: 'Decision_Salary_Adjustment_2024_012.pdf',
      documentDate: new Date('2024-01-10'),
      effectiveDate: new Date('2024-02-01'),
      fileName: 'Salary_Adjust_2024_012.pdf',
      fileType: 'pdf',
      sourceSystem: 'SharePoint',
      sourcePath: 'SharePoint://HR/Salary/2024/Salary_Adjust_2024_012.pdf',
      version: '1.0',
      documentStatus: 'SUPERSEDED',
    },
  });

  // Document 2 (supersedes Document 1)
  await prisma.document.create({
    data: {
      employeeId: emp4.id,
      documentType: 'SALARY_DECISION',
      documentTitle: 'Decision_Salary_Adjustment_Amended_2024_018.pdf',
      documentDate: new Date('2024-02-15'),
      effectiveDate: new Date('2024-02-01'),
      fileName: 'Salary_Adjust_Amended_2024_018.pdf',
      fileType: 'pdf',
      sourceSystem: 'SharePoint',
      sourcePath: 'SharePoint://HR/Salary/2024/Salary_Adjust_Amended_2024_018.pdf',
      version: '2.0',
      documentStatus: 'VALID',
      parentDocumentId: d4_orig.id,
      relationshipType: 'SUPERSEDES',
    },
  });

  // 5. Vo Thi E (EMP-005) to 12. Nguyen Kim L (EMP-012)
  const names = [
    { code: 'EMP-005', name: 'Vo Thi E', title: 'Senior Product Owner', dept: 'Product Operations', status: 'ACTIVE', join: '2023-01-10' },
    { code: 'EMP-006', name: 'Doan Van F', title: 'QA Automation Engineer', dept: 'Quality Assurance', status: 'PROBATION', join: '2026-07-01' },
    { code: 'EMP-007', name: 'Bui Anh G', title: 'DevOps & Site Reliability Specialist', dept: 'Cloud & Infrastructure', status: 'ACTIVE', join: '2022-04-15' },
    { code: 'EMP-008', name: 'Hoang Nu H', title: 'Senior Data Analyst', dept: 'Data Intelligence', status: 'ACTIVE', join: '2023-05-20' },
    { code: 'EMP-009', name: 'Dang Gia I', title: 'Lead UI/UX Designer', dept: 'Product Operations', status: 'OFFBOARDING', join: '2021-11-01' },
    { code: 'EMP-010', name: 'Ngo Quoc J', title: 'Enterprise Account Executive', dept: 'Sales & Business', status: 'ACTIVE', join: '2024-03-01' },
    { code: 'EMP-011', name: 'Truong Minh K', title: 'Frontend React Engineer', dept: 'Software Engineering', status: 'ACTIVE', join: '2024-08-15' },
    { code: 'EMP-012', name: 'Nguyen Kim L', title: 'System & Security Administrator', dept: 'IT Operations', status: 'ACTIVE', join: '2020-09-01' },
  ];

  for (const item of names) {
    const createdEmp = await prisma.employee.create({
      data: {
        employeeCode: item.code,
        fullName: item.name,
        email: `${item.name.toLowerCase().replace(/\s+/g, '.')}.${item.code.toLowerCase()}@company.com`,
        joinDate: new Date(item.join),
        employmentStatus: item.status,
        currentTitle: item.title,
        currentDepartment: item.dept,
        currentManager: 'Pham Hoang Nam',
        avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.code}`,
      },
    });

    // Create contract doc for each
    const onboardingEvent = await prisma.employeeEvent.create({
      data: {
        employeeId: createdEmp.id,
        eventType: 'CONTRACT',
        eventDate: new Date(item.join),
        title: `Official Labour Contract (${item.code})`,
        description: `Labour contract signed upon joining as ${item.title}`,
        status: 'COMPLETED',
      },
    });

    await prisma.document.create({
      data: {
        employeeId: createdEmp.id,
        eventId: onboardingEvent.id,
        documentType: 'LABOUR_CONTRACT',
        documentTitle: `Labour_Contract_${item.code}.pdf`,
        documentDate: new Date(item.join),
        fileName: `Contract_${item.code}.pdf`,
        fileType: 'pdf',
        sourceSystem: 'SharePoint',
        sourcePath: `SharePoint://HR/Contracts/${item.code}/Contract_${item.code}.pdf`,
        documentStatus: 'VALID',
      },
    });

    // Add attendance summary for each
    await prisma.attendanceSummary.create({
      data: {
        employeeId: createdEmp.id,
        year: 2025,
        month: 5,
        standardWorkingDays: 22,
        actualWorkingDays: 22,
        workingHours: 176,
        paidLeaveDays: 1,
        unpaidLeaveDays: 0,
        lateCount: 0,
        earlyLeaveCount: 0,
        otHours: 12.5,
        weekdayOtHours: 10.0,
        weekendOtHours: 2.5,
        holidayOtHours: 0,
      },
    });
  }

  // Create offboarding case for EMP-009 (Dang Gia I - Offboarding in Progress)
  const emp9 = await prisma.employee.findUnique({ where: { employeeCode: 'EMP-009' } });
  if (emp9) {
    await prisma.offboardingCase.create({
      data: {
        employeeId: emp9.id,
        resignationDate: new Date('2026-08-20'),
        lastWorkingDate: new Date('2026-09-30'),
        status: 'IN_PROGRESS',
        resignationDone: true,
        exitInterviewDone: true,
        handoverDone: false,
        finalTimesheetDone: true,
        assetReturnDone: false,
        terminationAgreementSigned: false,
        socialInsuranceDone: false,
      },
    });
  }

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
