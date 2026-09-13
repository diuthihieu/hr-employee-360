-- People360 - PostgreSQL / Supabase Relational Database Schema

CREATE TABLE employees (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_code VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    join_date DATE NOT NULL,
    termination_date DATE,
    employment_status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    current_title VARCHAR(255) NOT NULL,
    current_department VARCHAR(255) NOT NULL,
    current_project VARCHAR(255),
    current_manager VARCHAR(255),
    avatar_url TEXT,
    location VARCHAR(100) DEFAULT 'Ho Chi Minh City',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE employee_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    effective_from DATE,
    effective_to DATE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    old_value VARCHAR(255),
    new_value VARCHAR(255),
    status VARCHAR(50) DEFAULT 'COMPLETED',
    source_record_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    event_id UUID REFERENCES employee_events(id) ON DELETE SET NULL,
    document_type VARCHAR(100) NOT NULL,
    document_title VARCHAR(255) NOT NULL,
    document_date DATE NOT NULL,
    effective_date DATE,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(50) NOT NULL,
    source_system VARCHAR(100) NOT NULL,
    source_path TEXT NOT NULL,
    source_url TEXT,
    version VARCHAR(20) DEFAULT '1.0',
    document_status VARCHAR(50) DEFAULT 'VALID',
    parent_document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
    relationship_type VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE training_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    course_code VARCHAR(50) NOT NULL,
    course_name VARCHAR(255) NOT NULL,
    training_type VARCHAR(100) NOT NULL,
    start_date DATE NOT NULL,
    completion_date DATE NOT NULL,
    learning_hours NUMERIC(6,2) NOT NULL,
    learning_hours_inside_working_time NUMERIC(6,2) NOT NULL,
    learning_hours_outside_working_time NUMERIC(6,2) NOT NULL,
    score NUMERIC(5,2),
    result VARCHAR(50) NOT NULL,
    certificate_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE performance_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    review_period VARCHAR(50) NOT NULL,
    review_date DATE NOT NULL,
    review_type VARCHAR(50) NOT NULL,
    performance_score NUMERIC(4,2) NOT NULL,
    rating VARCHAR(100) NOT NULL,
    reviewer VARCHAR(255) NOT NULL,
    document_id UUID REFERENCES documents(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE competency_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    review_period VARCHAR(50) NOT NULL,
    assessment_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE competency_scores (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    assessment_id UUID NOT NULL REFERENCES competency_assessments(id) ON DELETE CASCADE,
    competency_name VARCHAR(100) NOT NULL,
    competency_category VARCHAR(100) NOT NULL,
    required_level INT NOT NULL,
    actual_level INT NOT NULL,
    gap INT NOT NULL
);

CREATE TABLE attendance_summaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    year INT NOT NULL,
    month INT NOT NULL,
    standard_working_days INT NOT NULL,
    actual_working_days NUMERIC(4,1) NOT NULL,
    working_hours NUMERIC(6,2) NOT NULL,
    paid_leave_days NUMERIC(4,1) NOT NULL,
    unpaid_leave_days NUMERIC(4,1) NOT NULL,
    late_count INT NOT NULL,
    early_leave_count INT NOT NULL,
    ot_hours NUMERIC(6,2) NOT NULL,
    weekday_ot_hours NUMERIC(6,2) NOT NULL,
    weekend_ot_hours NUMERIC(6,2) NOT NULL,
    holiday_ot_hours NUMERIC(6,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE offboarding_cases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    employee_id UUID NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    resignation_date DATE NOT NULL,
    last_working_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'IN_PROGRESS',
    resignation_done BOOLEAN DEFAULT FALSE,
    exit_interview_done BOOLEAN DEFAULT FALSE,
    handover_done BOOLEAN DEFAULT FALSE,
    final_timesheet_done BOOLEAN DEFAULT FALSE,
    asset_return_done BOOLEAN DEFAULT FALSE,
    termination_agreement_signed BOOLEAN DEFAULT FALSE,
    social_insurance_done BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
