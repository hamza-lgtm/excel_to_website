import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AssessmentSidebar from "@/components/assessment/AssessmentSidebar";
import ProgressBar from "@/components/assessment/ProgressBar";
import QuestionForm from "@/components/assessment/QuestionForm";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home, Save } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Question {
  id: string;
  text: string;
  type: "dropdown" | "text" | "checkbox" | "header" | "completeness";
  options?: string[];
  guidance?: string;
  remarks?: string;
  isSubquestion?: boolean;
  isHeader?: boolean;
}

interface Subdomain {
  name: string;
  questions: Question[];
}

interface Domain {
  name: string;
  subdomains: Record<string, Subdomain>;
}

interface AssessmentData {
  [key: string]: Domain;
}

const assessmentData: AssessmentData = {
  "business": {
    name: "Business",
    subdomains: {
      "drivers": {
        name: "Business Drivers",
        questions: [
          {
            id: "b-drv-1",
            text: "Have you identified the main business drivers?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Example business drivers: cyber crime prevention, risk reduction, law / regulation, audit / compliance, business continuity"
          },
          {
            id: "b-drv-2",
            text: "Have you documented the main business drivers?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Documentation of business drivers is important for demonstrable business alignment"
          },
          {
            id: "b-drv-3",
            text: "Do you use business drivers in the decision making process?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            guidance: "e.g. to determine priorities or make decisions regarding the on-boarding of new services or operations",
            remarks: "e.g. to determine priorities or make decisions regarding the on-boarding of new services or operations"
          },
          {
            id: "b-drv-4",
            text: "Do you regularly check if the current service catalogue is aligned with business drivers?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            guidance: "i.e. do you check for services or operations that outside the scope of business drivers?",
            remarks: "i.e. do you check for services or operations that outside the scope of business drivers?"
          },
          {
            id: "b-drv-5",
            text: "Have the business drivers been validated with business stakeholders?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            guidance: "Business stakeholders can be C-level management",
            remarks: "Business stakeholders can be C-level management"
          },
          {
            id: "b-drv-6",
            text: "Additional comments on Business Drivers",
            type: "text"
          }
        ]
      },
      "customers": {
        name: "Customers",
        questions: [
          {
            id: "b-cus-1",
            text: "Have you identified your key customers or stakeholders?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ]
          },
          {
            id: "b-cus-2",
            text: "Please specify your customers:",
            type: "header",
            isHeader: true,
            remarks: "Use this a guideline for answering 2.1 This is also potentially useful for insights and comparison with previous assessments"
          },
          {
            id: "b-cus-2-1",
            text: "Legal",
            type: "dropdown",
            options: ["No", "Yes"],
            remarks: "Legal department, may be a stakeholder for privacy, or may request forensic investigation to the SOC",
            isSubquestion: true
          },
          {
            id: "b-cus-2-2",
            text: "Audit",
            type: "dropdown",
            options: ["No", "Yes"],
            remarks: "The audit department can be supported by logging provided by the SOC",
            isSubquestion: true
          },
          {
            id: "b-cus-2-3",
            text: "Engineering / R&D",
            type: "dropdown",
            options: ["No", "Yes"],
            remarks: "The engineering departments deal with Intellectual Property that may require additional access monitoring",
            isSubquestion: true
          },
          {
            id: "b-cus-2-4",
            text: "IT",
            type: "dropdown",
            options: ["No", "Yes"],
            remarks: "IT departments can be supported by monitoring for anomalies in their infrastructure and systems",
            isSubquestion: true
          },
          {
            id: "b-cus-2-5",
            text: "Business",
            type: "dropdown",
            options: ["No", "Yes"],
            remarks: "Business should be the most important customer, as all SOC activities ultimately support business processes",
            isSubquestion: true
          },
          {
            id: "b-cus-2-6",
            text: "External customers",
            type: "dropdown",
            options: ["No", "Yes"],
            remarks: "External customers mostly apply to managed service providers",
            isSubquestion: true
          },
          {
            id: "b-cus-2-7",
            text: "(Senior) Management",
            type: "dropdown",
            options: ["No", "Yes"],
            remarks: "Senior management may be a direct SOC customer, depending on organization hierarchy",
            isSubquestion: true
          },
          {
            id: "b-cus-2-8",
            text: "Other customers:",
            type: "text",
            remarks: "Specify any additional customers",
            isSubquestion: true
          },
          {
            id: "b-cus-3",
            text: "Have you documented the main SOC customers?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            guidance: "Formal registration of customer contact details, place in the organization, geolocation, etc.",
            remarks: "Formal registration of customer contact details, place in the organization, geolocation, etc."
          },
          {
            id: "b-cus-4",
            text: "Do you differentiate output towards these specific customers?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            guidance: "For example, are communication style and contents to Business customers different than that to IT?",
            remarks: "For example, are communication style and contents to Business customers different than that to IT?"
          },
          {
            id: "b-cus-5",
            text: "Do you have service level agreements with these customers?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            guidance: "Service level agreements are used to provide standardized services operating within known boundaries",
            remarks: "Service level agreements are used to provide standardized services operating within known boundaries"
          },
          {
            id: "b-cus-6",
            text: "Do you regularly send updates to your customers?",
            type: "dropdown",
            options: [
              "Never",
              "Sometimes",
              "Averagely",
              "Mostly",
              "Always"
            ],
            guidance: "For example: changes in service scope or delivery. Can also be reports, dashboards, etc.",
            remarks: "For example: changes in service scope or delivery. Can also be reports, dashboards, etc."
          },
          {
            id: "b-cus-7",
            text: "Do you actively measure and manage customer satisfaction?",
            type: "dropdown",
            options: [
              "Never",
              "Sometimes",
              "Averagely",
              "Mostly",
              "Always"
            ],
            guidance: "Understanding customer satisfaction will help to better align with business needs",
            remarks: "Understanding customer satisfaction will help to better align with business needs"
          },
          {
            id: "b-cus-8",
            text: "Additional comments on Customers",
            type: "text"
          }
        ]
      },
      "charter": {
        name: "Charter",
        questions: [
          {
            id: "b-cha-1",
            text: "Does the SOC have a formal charter document in place?",
            type: "dropdown",
            options: [
              "No charter",
              "Basic charter",
              "Defined charter",
              "Well-documented charter",
              "Comprehensive and regularly updated charter"
            ],
            guidance: "See 3.2 for charter document elements",
            remarks: "See 3.2 for charter document elements"
          },
          {
            id: "b-cha-2",
            text: "Please specify elements of the charter document:",
            type: "header",
            isHeader: true,
            remarks: "Use this outcome as a guideline to determine the score for 3.1"
          },
          {
            id: "b-cha-2-1",
            text: "Mission",
            type: "dropdown",
            options: ["No", "Yes"],
            remarks: "A SOC mission should be established to provide insight into the reason for existence of the SOC",
            isSubquestion: true
          },
          {
            id: "b-cha-2-2",
            text: "Vision",
            type: "dropdown",
            options: ["No", "Yes"],
            remarks: "A vision should be created to determine long-term goals for the SOC",
            isSubquestion: true
          },
          {
            id: "b-cha-2-3",
            text: "Strategy",
            type: "dropdown",
            options: ["No", "Yes"],
            remarks: "A strategy should be in place to show how to meet goals and targets set by mission and vision",
            isSubquestion: true
          },
          {
            id: "b-cha-2-4",
            text: "Service Scope",
            type: "dropdown",
            options: ["No", "Yes"],
            remarks: "Service scope is documented to provide insight into SOC service delivery",
            isSubquestion: true
          },
          {
            id: "b-cha-2-5",
            text: "Deliverables",
            type: "dropdown",
            options: ["No", "Yes"],
            remarks: "The output provided by the SOC, for example: reports, incidents, investigations, advisories, etc.",
            isSubquestion: true
          },
          {
            id: "b-cha-2-6",
            text: "Responsibilities",
            type: "dropdown",
            options: ["No", "Yes"],
            remarks: "Responsibilities of the SOC",
            isSubquestion: true
          },
          {
            id: "b-cha-2-7",
            text: "Accountability",
            type: "dropdown",
            options: ["No", "Yes"],
            remarks: "Accountability for the SOC for actions taken",
            isSubquestion: true
          },
          {
            id: "b-cha-2-8",
            text: "Operational Hours",
            type: "dropdown",
            options: ["No", "Yes"],
            remarks: "Operational hours of the SOC",
            isSubquestion: true
          },
          {
            id: "b-cha-2-9",
            text: "Stakeholders",
            type: "dropdown",
            options: ["No", "Yes"],
            remarks: "All relevant stakeholders for the SOC",
            isSubquestion: true
          },
          {
            id: "b-cha-2-10",
            text: "Objectives / Goals",
            type: "dropdown",
            options: ["No", "Yes"],
            remarks: "Objectives and goals should be concrete and measurable so that they are fit for reporting purposes",
            isSubquestion: true
          },
          {
            id: "b-cha-2-11",
            text: "Statement of success",
            type: "dropdown",
            options: ["No", "Yes"],
            remarks: "A statement of success is used to determine when the SOC is successful. Should be aligned with goals and objectives",
            isSubquestion: true
          },
          {
            id: "b-cha-3",
            text: "Is the SOC charter document regularly updated?",
            type: "dropdown",
            options: [
              "Never",
              "Sometimes",
              "Averagely",
              "Mostly",
              "Always"
            ],
            guidance: "Regularity should be matched to your own internal policy. At least yearly is recommended",
            remarks: "Regularity should be matched to your own internal policy. At least yearly is recommended"
          },
          {
            id: "b-cha-4",
            text: "Is the SOC charter document approved by the business / CISO?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            guidance: "Approval from the relevant stakeholders will aid in business support for SOC operations",
            remarks: "Approval from the relevant stakeholders will aid in business support for SOC operations"
          },
          {
            id: "b-cha-5",
            text: "Are all stakeholders familiar with the SOC charter document contents?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            guidance: "Making stakeholders aware of the contents helps in getting organizational support for security operations",
            remarks: "Making stakeholders aware of the contents helps in getting organizational support for security operations"
          },
          {
            id: "b-cha-6",
            text: "Additional comments on Charter",
            type: "text"
          }
        ]
      },
      "governance": {
        name: "Governance",
        questions: [
          {
            id: "b-gov-1",
            text: "Does the SOC have a governance process in place?",
            type: "dropdown",
           options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "A governance process is required to determine how the SOC should be managed."
          },
          {
            id: "b-gov-2",
            text: "Have all governance elements been identified?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Possible governance elements can be found under 4.3."
          },
          {
            id: "b-gov-3",
            text: "Please specify identified governance elements",
            type: "header",
            isHeader: true
          },
          {
            id: "b-gov-3-1",
            text: "Business Alignment",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Aligning SOC operations to business needs.",
            isSubquestion: true
          },
          {
            id: "b-gov-3-2",
            text: "Accountability",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "This may be part of the SOC charter document, but it does not automatically make it part of the governance process.",
            isSubquestion: true
          },
          {
            id: "b-gov-3-3",
            text: "Sponsorship",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Can be part of stakeholder management.",
            isSubquestion: true
          },
          {
            id: "b-gov-3-4",
            text: "Mandate",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "The SOC mandate should be established to enable action in crisis situations.",
            isSubquestion: true
          },
          {
            id: "b-gov-3-5",
            text: "Relationships & Third Party Management",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Managing both internal and external relationships.",
            isSubquestion: true
          },
          {
            id: "b-gov-3-6",
            text: "Vendor Engagement",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Example: Vendors actively participating in SOC vision and strategy.",
            isSubquestion: true
          },
          {
            id: "b-gov-3-7",
            text: "Service Commitment",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Example: Service level agreements (SLAs) and IT controls.",
            isSubquestion: true
          },
          {
            id: "b-gov-3-8",
            text: "Project / Program Management",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Managing individual projects within the SOC and larger program transitions.",
            isSubquestion: true
          },
          {
            id: "b-gov-3-9",
            text: "Continual Improvement",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Ongoing improvements to the SOC and its management.",
            isSubquestion: true
          },
          {
            id: "b-gov-3-10",
            text: "Span of control / federation governance",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Especially important when multiple SOCs exist within the same company.",
            isSubquestion: true
          },
          {
            id: "b-gov-3-11",
            text: "Outsourced service management",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Crucial for hybrid SOC setups; requires SLAs and oversight.",
            isSubquestion: true
          },
          {
            id: "b-gov-3-12",
            text: "SOC KPIs & Metrics",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Discussed in detail in the Process section under reporting.",
            isSubquestion: true
          },
          {
            id: "b-gov-3-13",
            text: "SOC risk management",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Identification and mitigation of risks (business, people, process, and technology).",
            isSubquestion: true
          },
          {
            id: "b-gov-3-14",
            text: "Customer Engagement / Satisfaction",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Are customers actively involved in SOC evaluations? Is their satisfaction measured?",
            isSubquestion: true
          },
          {
            id: "b-gov-3-completeness",
            text: "Completeness",
            type: "completeness",
            remarks: "Use this outcome as a guideline to determine the score for 4.2.",
            isSubquestion: true
          },
          {
            id: "b-gov-4",
            text: "Is cost management in place?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Managing costs is required to justify SOC budget allocation and ensure continuous service delivery in the future."
          },
          {
            id: "b-gov-5",
            text: "Please specify cost management elements",
            type: "header",
            isHeader: true
          },
          {
            id: "b-gov-5-1",
            text: "People cost",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Costs associated with employees, should be managed to prove FTE requirements to stakeholders.",
            isSubquestion: true
          },
          {
            id: "b-gov-5-2",
            text: "Process cost",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Costs associated with processes, should be managed to ensure delivery of process elements.",
            isSubquestion: true
          },
          {
            id: "b-gov-5-3",
            text: "Technology cost",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Costs associated with technology, should be managed to justify budget for new technology or replacement.",
            isSubquestion: true
          },
          {
            id: "b-gov-5-4",
            text: "Services cost",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Costs associated with service delivery, especially for managed service providers.",
            isSubquestion: true
          },
          {
            id: "b-gov-5-5",
            text: "Facility cost",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Costs associated with facilities used by the SOC.",
            isSubquestion: true
          },
          {
            id: "b-gov-5-6",
            text: "Budget forecasting",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Forecasting of needed budget increases should be aligned with business needs. Increased spending must be justified.",
            isSubquestion: true
          },
          {
            id: "b-gov-5-7",
            text: "Budget alignment",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Alignment of budget with business requirements and drivers to ensure balanced spending on the SOC.",
            isSubquestion: true
          },
          {
            id: "b-gov-5-8",
            text: "Return on investment",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Proving the return on investment to stakeholders to maintain continued budget allocation.",
            isSubquestion: true
          },
          {
            id: "b-gov-5-completeness",
            text: "Completeness",
            type: "completeness",
            remarks: "Use this outcome as a guideline to determine the score for 4.4.",
            isSubquestion: true
          },
          {
            id: "b-gov-6",
            text: "Are all governance elements formally documented?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Formal documentation should be stored in a quality management system."
          },
          {
            id: "b-gov-7",
            text: "Are SOC governance meetings regularly held?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Meetings at different levels (operational, tactical, strategic) should occur with defined Terms of Reference (ToR) and metrics."
          },
          {
            id: "b-gov-8",
            text: "Is the governance process regularly reviewed?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Frequency should be matched to your own internal policy. At least yearly is recommended."
          },
          {
            id: "b-gov-9",
            text: "Is the governance process aligned with all stakeholders?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Alignment will help the SOC obtain mandates, budgets, and management support."
          },
          {
            id: "b-gov-10",
            text: "Is the SOC regularly audited or subjected to external assessments?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Frequency should be matched to the SOC policy. At least yearly is recommended. 3rd-party assessments have a higher objectivity."
          },
          {
            id: "b-gov-11",
            text: "Is there an active cooperation with other SOCs (internal)?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Exchange of best practices, intelligence and defense enhances cyber defense."
          },
          {
            id: "b-gov-12",
            text: "Comments and/or Remarks",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments."
          }
        ]
      },
      "privacy_policy": {
        name: "Privacy & Policy",
        questions: [
          {
            id: "b-prv-1",
            text: "Is there an information security policy in place that supports the SOC activities?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            guidance: "Policy defines SOC activities involvement without mandate",
            remarks: "A clear security policy that supports SOC operations provides guidance and helps to enforce mandate for the SOC in the organization."
          },
          {
            id: "b-prv-2",
            text: "Has a SOC policy been established?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            guidance: "",
            remarks: "A SOC policy is a subset of the wider SOC operations and SOC management needs to define."
          },
          {
            id: "b-prv-3",
            text: "Please specify elements of the SOC policy",
            type: "header",
            isHeader: true
          },
          {
            id: "b-prv-3-1",
            text: "Code of conduct",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "How to behave in the SOC (mandatory and optional meetings, SOC culture, responsibility for non-compliance, etc.)",
            isSubquestion: true
          },
          {
            id: "b-prv-3-2",
            text: "Roles and responsibilities",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "What activities you can and are not allowed to do (RACI)",
            isSubquestion: true
          },
          {
            id: "b-prv-3-3",
            text: "Review frequency of documentation",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "What documentation is captured to review and how often the documentation needs to be reviewed",
            isSubquestion: true
          },
          {
            id: "b-prv-3-4",
            text: "SOC Information Repository and logs",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "How the SOC is secured (physical security, IT security, community safe, external documents, etc.)",
            isSubquestion: true
          },
          {
            id: "b-prv-3-5",
            text: "Knowledge exchange and maintenance",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "The means (meetings and platforms) for knowledge exchange and rules for maintenance of knowledge bases",
            isSubquestion: true
          },
          {
            id: "b-prv-3-6",
            text: "Metrics / KPIs",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Improving and high quality, what is right and wrong to measure",
            isSubquestion: true
          },
          {
            id: "b-prv-3-7",
            text: "Confidentiality",
            type: "completeness",
           
            remarks: "Handling of confidential information, classification, need to know, secure communication",
            isSubquestion: true
          },
          {
            id: "b-prv-3-8",
            text: "Working agreements",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Agreements on length of meetings, length of night-watch, transparency of completed work, etc.",
            isSubquestion: true
          },
          {
            id: "b-prv-3-completeness",
            text: "Completeness",
            type: "completeness",
            remarks: "Use this outcome as a guideline to determine the score for 5.2",
            isSubquestion: true
          },
          {
            id: "b-prv-4",
            text: "Is the SOC involved in the creation and updates of operational security policy?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Consulting the SOC in the creation of security policy will ensure that SOC variants are properly mentioned and enforceable."
          },
          {
            id: "b-prv-5",
            text: "Is a security incident response plan in place?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "It should specify the role of the SOC in incident response (who to contact, when to escalate, how to communicate, etc.)"
          },
          {
            id: "b-prv-6",
            text: "Are there SOC specific regulations or policies in place?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "A specific policy should cover everything in Paragraph 5.3 (available under completeness)"
          },
          {
            id: "b-prv-7",
            text: "Does the SOC have experience with all applicable privacy laws and regulations?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Guidelines and regulations should be accessible to ensure compliance with privacy laws and regulations"
          },
          {
            id: "b-prv-8",
            text: "Does the SOC comply with data protection regulations (e.g. GDPR)?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Compliance with data protection regulations is required to ensure the SOC is legally allowed"
          },
          {
            id: "b-prv-9",
            text: "Are specific procedures in place for dealing with privacy related investigations?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Privacy related issues require careful consideration, especially those potentially harmful to users"
          },
          {
            id: "b-prv-10",
            text: "Is the SOC aware of all information that is processed and subject to which laws/policies?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Such information includes IP addresses, customer identities, user names, host names (for potentially owned devices), etc."
          },
          {
            id: "b-prv-11",
            text: "Is a Privacy Impact Assessment (PIA) regularly conducted?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Can be used to determine the impact of monitoring on privacy, and can help discover potential violations"
          },
          {
            id: "b-prv-12",
            text: "Comments and/or Remarks",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments"
          }
        ]
      }
    }
  },
  "people": {
    name: "People",
    subdomains: {
      "employees": {
        name: "Employees",
        questions: [
          {
            id: "p-emp-1",
            text: "How many FTEs are in your SOC?",
            type: "text",
            remarks: "Include both internal and external FTEs"
          },
          {
            id: "p-emp-2",
            text: "Do you use external providers/contractors in your SOC?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "External employees can be hired from third-parties to fill in vacant positions or perform project activities"
          },
          {
            id: "p-emp-3",
            text: "What is the percentage of external FTEs?",
            type: "text",
            isSubquestion: true

          },
          {
            id: "p-emp-4",
            text: "Does the current size of the SOC meet FTE requirements?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "i.e. Is the SOC size sufficient to conduct business goals?"
          },
          {
            id: "p-emp-5",
            text: "Does the SOC need requirements for external employee FTE roles?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Note: requirements do not need to be satisfied, but answered as \"None\" if you have no external employees."
          },
          {
            id: "p-emp-6",
            text: "Does the SOC need requirements for internal to external employee ratios?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "i.e. Are there any crucial skills amongst external employees? Set importance to \"None\" if you have no external employees or critical positions may be due to skill shortages in the recruitment market."
          },
          {
            id: "p-emp-7",
            text: "Are all positions filled?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "A normalized ratio can be required to obtain new employees to a market where talent is scarce (1)"
          },
          {
            id: "p-emp-8",
            text: "Do you have a recruitment process in place?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Talent recruitment can be vital for SOC success, and when practicing Capacity Improvement"
          },
          {
            id: "p-emp-9",
            text: "Do you have a talent acquisition process in place?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Talent acquisition is the process of finding and acquiring skilled human talent for organizational needs and to meet labor requirements (2), (3)"
          },
          {
            id: "p-emp-10",
            text: "Do you actively work to create a psychologically safe environment for SOC personnel?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "A psychologically safe environment is an environment where everyone is able to speak their mind and feel valued"
          },
          {
            id: "p-emp-11",
            text: "Comments and/or Remarks",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments"
          }
        ]
      },
      "roles": {
        name: "Roles and Hierarchy",
        questions: [
          {
            id: "p-rol-1",
            text: "Do you formally differentiate roles within the SOC?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Use the notes in 2.2 to determine if you have all roles required in the SOC."
          },
          {
            id: "p-rol-2",
            text: "Which of the following roles are present in your SOC?",
            type: "header",
            isHeader: true
          },
          {
            id: "p-rol-2-1",
            text: "SOC Analyst",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Primarily responsible for Level 1 monitoring",
            isSubquestion: true
          },
          {
            id: "p-rol-2-2",
            text: "Security / Systems Engineer",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Primarily responsible for technical / functional maintenance of security systems",
            isSubquestion: true
          },
          {
            id: "p-rol-2-3",
            text: "Forensic Analyst",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Primarily responsible for in-depth analysis and investigations",
            isSubquestion: true
          },
          {
            id: "p-rol-2-4",
            text: "Security Architect",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Primarily responsible for technical architecture for security systems used within the SOC",
            isSubquestion: true
          },
          {
            id: "p-rol-2-5",
            text: "Threat Intelligence Analyst",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Primarily responsible for analysis of trends and reports",
            isSubquestion: true
          },
          {
            id: "p-rol-2-6",
            text: "Data Scientist",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Primarily responsible for big data and big analytics",
            isSubquestion: true
          },
          {
            id: "p-rol-2-7",
            text: "SOC Manager",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Primarily responsible for management of the SOC",
            isSubquestion: true
          },
          {
            id: "p-rol-2-8",
            text: "Team Leader",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Primarily responsible for management of teams, responsible for people, analysis and analytics",
            isSubquestion: true
          },
          {
            id: "p-rol-2-9",
            text: "Incident Handler",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Primarily responsible for escalating security incidents management workflow",
            isSubquestion: true
          },
          {
            id: "p-rol-2-10",
            text: "Incident Manager",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Primarily responsible for coordination and timely resolution of security incidents",
            isSubquestion: true
          },
          {
            id: "p-rol-2-11",
            text: "Penetration Tester",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Primarily responsible for testing applications and systems for security weaknesses",
            isSubquestion: true
          },
          {
            id: "p-rol-2-12",
            text: "Detection Engineer",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Primarily responsible for creating and updating detection rules",
            isSubquestion: true
          },
          {
            id: "p-rol-2-13",
            text: "Automation Engineer",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Primarily responsible for automation of repetitive SOC tasks",
            isSubquestion: true
          },
          {
            id: "p-rol-2-14",
            text: "Other roles",
            type: "text",
            remarks: "Specify any additional roles",
            isSubquestion: true
          },
          {
            id: "p-rol-2-completeness",
            text: "Completeness",
            type: "completeness",
            remarks: "Use this outcome as a guideline to determine the score for 2.1",
            isSubquestion: true
          },
          {
            id: "p-rol-3",
            text: "Do you differentiate tiers within these roles?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "If you have no tiers, and you feel this is not a restriction, select importance 'None'."
          },
          {
            id: "p-rol-4",
            text: "Are all roles sufficiently staffed?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "If you have no hierarchy, and all roles are on one level importance \"None\""
          },
          {
            id: "p-rol-5",
            text: "Is there a clear, tiered hierarchy in your SOC?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Consider the staffing levels (minimal/FTE count) as well as knowledge and experience for all roles."
          },
          {
            id: "p-rol-6",
            text: "Have you formally documented all SOC roles?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Possible documentation elements can be found in under 2.7"
          },
          {
            id: "p-rol-7",
            text: "Please specify elements in the role documentation",
            type: "header",
            isHeader: true
          },
          {
            id: "p-rol-7-1",
            text: "Role description",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "A formal description of the role",
            isSubquestion: true
          },
          {
            id: "p-rol-7-2",
            text: "Role tasks",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "A description of tasks that are part of the role",
            isSubquestion: true
          },
          {
            id: "p-rol-7-3",
            text: "Role responsibilities",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "The responsibilities of the role",
            isSubquestion: true
          },
          {
            id: "p-rol-7-4",
            text: "Role expectations",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "This is an extension of responsibilities, Example expectation: take a pro-active leading role in case of security incidents",
            isSubquestion: true
          },
          {
            id: "p-rol-7-5",
            text: "Required technical skills",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "e.g. Experience with specific technologies",
            isSubquestion: true
          },
          {
            id: "p-rol-7-6",
            text: "Required soft skills",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "e.g. communication skills, presentation skills",
            isSubquestion: true
          },
          {
            id: "p-rol-7-7",
            text: "Required educational level",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "e.g. University college, university",
            isSubquestion: true
          },
          {
            id: "p-rol-7-8",
            text: "Required or preferred certifications",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "e.g. CISSP, SANS, OSCP, etc.",
            isSubquestion: true
          },
          {
            id: "p-rol-7-completeness",
            text: "Completeness",
            type: "completeness",
            remarks: "Use this outcome as a guideline to determine the score for 2.6",
            isSubquestion: true
          },
          {
            id: "p-rol-8",
            text: "Are responsibilities for each role understood?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Responsibilities for each role should be clearly understood by all SOC personnel"
          },
          {
            id: "p-rol-9",
            text: "Have you documented career progression requirements for each of these roles?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Career progression for roles can be documented through training, certification, experience and soft skills requirements"
          },
          {
            id: "p-rol-10",
            text: "Do you regularly update the role definitions?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "To ensure to be modern and only whether to document roles is still correct to modern job duties"
          },
          {
            id: "p-rol-11",
            text: "Comments and/or Remarks",
            type: "text",
            guidance: "Specify rationale for chosen values or any additional comments"
          }
        ]
      },
      "management": {
        name: "People Management",
        questions: [
          {
            id: "p-mgt-1",
            text: "Do you have a job rotation plan in place?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Job rotation can be used to train employees on a variety of tasks and avoid burn-out/routine"
          },
          {
            id: "p-mgt-2",
            text: "Do you have a career progression process in place?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Career development, promotions, etc."
          },
          {
            id: "p-mgt-3",
            text: "Do you have a performance assessment process in place?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Performance assessments can be used to identify strengths and weaknesses, areas for personal development"
          },
          {
            id: "p-mgt-4",
            text: "Do you have team-driven KPI goals?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "e.g. background checks, stress-checks, gender diversity, etc."
          },
          {
            id: "p-mgt-5",
            text: "Have you defined team goals?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Team goals help bring focus to teams and motivate employees"
          },
          {
            id: "p-mgt-6",
            text: "Do you document and track individual team member goals?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Individual team member goals should be set to help drive the employee to full potential"
          },
          {
            id: "p-mgt-7",
            text: "Do you have a mentoring program in place?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Can also be included in the regular organization processes"
          },
          {
            id: "p-mgt-8",
            text: "Do you have a new-hire onboarding plan?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "i.e. a detailed process to quickly on-new employees that helps them get up to speed with the SOC"
          },
          {
            id: "p-mgt-9",
            text: "Are all the employees aligned on common goals?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Employees working in performance and collaboration mode are more productive than employees working in survival mode"
          },
          {
            id: "p-mgt-10",
            text: "Is there a clear escalation path for problems?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Such channels (i.e. 1 conversation, one could involve employees and help the SOC manager gain insight in personal challenges"
          },
          {
            id: "p-mgt-11",
            text: "Do you have regular 1-on-1 meetings between the line manager and the employees?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "These talks can serve as a venue for information collaboration between individuals in the team and its clear team spirit"
          },
          {
            id: "p-mgt-12",
            text: "Do you have team building activities?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Team building activities help to build team spirit"
          },
          {
            id: "p-mgt-13",
            text: "Do you perform regular benchmarking exercises with other teams (internal to the org.)?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "A multi-team synergy gives the SOC collaboration with other teams, can cover topics responding to escalation performances"
          },
          {
            id: "p-mgt-14",
            text: "Do you have a fair rewards and incentives?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Besides individual performance, team performance and rewards are also important to maintain and improve the team"
          },
          {
            id: "p-mgt-15",
            text: "Comments and/or Remarks",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments"
          }
        ]
      },
      "knowledge": {
        name: "Knowledge Management",
        questions: [
          {
            id: "p-knw-1",
            text: "Do you have a formal knowledge management process in place?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Formal knowledge management helps to optimize knowledge creation and distribution"
          },
          {
            id: "p-knw-2",
            text: "Do you have a wiki/manual in place?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "A central way consist of: SOC wiki, SOC procedures and other knowledge (documentation, expert!)"
          },
          {
            id: "p-knw-3",
            text: "Please specify elements of the knowledge matrix",
            type: "header",
            isHeader: true
          },
          {
            id: "p-knw-3-1",
            text: "All SOC employees",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "The wiki matrix should cover all SOC employees, both internal and external",
            isSubquestion: true
          },
          {
            id: "p-knw-3-2",
            text: "Hard skills",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "e.g. Ability to effectively use security tools",
            isSubquestion: true
          },
          {
            id: "p-knw-3-3",
            text: "Soft skills",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "e.g. communication skills",
            isSubquestion: true
          },
          {
            id: "p-knw-3-4",
            text: "Skill levels (novice, intermediate, expert)",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Determining and documenting skill levels helps to identify areas where limited expertise is available",
            isSubquestion: true
          },
          {
            id: "p-knw-3-completeness",
            text: "Completeness",
            type: "completeness",
            remarks: "Use this outcome as a guideline to determine the score for 4.2",
            isSubquestion: true
          },
          {
            id: "p-knw-4",
            text: "Is the knowledge matrix actively used for teams and personal improvement?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Personal improvement is essential for improvement of skills (might in team dynamics and skill distribution)"
          },
          {
            id: "p-knw-5",
            text: "Do you have a knowledge matrix in place?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ]
          },
          {
            id: "p-knw-6",
            text: "Please specify elements of the knowledge matrix",
            type: "header",
            isHeader: true
          },
          {
            id: "p-knw-6-1",
            text: "All SOC employees",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "The knowledge matrix should cover all SOC employees, both internal and external",
            isSubquestion: true
          },
          {
            id: "p-knw-6-2",
            text: "All relevant knowledge areas",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Knowledge for service delivery - technical (e.g. support), functional (i.e. configuration) and foundational (e.g. networking, encryption)",
            isSubquestion: true
          },
          {
            id: "p-knw-6-3",
            text: "Skill levels (novice, intermediate, expert)",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Determining and documenting knowledge levels helps to identify areas where limited expertise is available",
            isSubquestion: true
          },
          {
            id: "p-knw-6-completeness",
            text: "Completeness",
            type: "completeness",
            remarks: "Use this outcome as a guideline to determine the score for 4.3",
            isSubquestion: true
          },
          {
            id: "p-knw-7",
            text: "Is the knowledge matrix actively used to determine training and education needs?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "The matrix should be used as a resource to identify skill gaps that should be filled for your SOC"
          },
          {
            id: "p-knw-8",
            text: "Is the knowledge matrix regularly updated?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Regular updates are required to ensure that the knowledge matrix remains accurate to document"
          },
          {
            id: "p-knw-9",
            text: "Do you regularly assess and revise the knowledge management process?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "This refers to the knowledge management process as a whole"
          },
          {
            id: "p-knw-10",
            text: "Is there a central place to support knowledge documentation and distribution?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Such tooling can help to avoid investigation similar issues multiple times by integrating into the security monitoring process"
          },
          {
            id: "p-knw-11",
            text: "Comments and/or Remarks",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments"
          }
        ]
      },
      "training": {
        name: "Training & Education",
        questions: [
          {
            id: "p-trn-1",
            text: "Do you have a training program in place?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "A training program is used to ensure a minimal level of knowledge for employees"
          },
          {
            id: "p-trn-2",
            text: "Please specify elements of the training program",
            type: "header",
            isHeader: true
          },
          {
            id: "p-trn-2-1",
            text: "Product-specific training",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Product-specific training may be required for new technologies or complex solutions",
            isSubquestion: true
          },
          {
            id: "p-trn-2-2",
            text: "Internal company training",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "e.g. training on internal policies",
            isSubquestion: true
          },
          {
            id: "p-trn-2-3",
            text: "Role-based specific training",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "For example: security analytics training for the security analyst role",
            isSubquestion: true
          },
          {
            id: "p-trn-2-4",
            text: "Soft-skill training",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "To complement hard skills, soft skills should be trained as well",
            isSubquestion: true
          },
          {
            id: "p-trn-2-5",
            text: "Formal education",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Formal education may be university or university college degrees",
            isSubquestion: true
          },
          {
            id: "p-trn-2-completeness",
            text: "Completeness",
            type: "completeness",
            remarks: "Use this outcome as a guideline to determine the score for 5.1",
            isSubquestion: true
          },
          {
            id: "p-trn-3",
            text: "Do you have a certification program in place?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "A certification program is used to document the formal level of knowledge and skills"
          },
          {
            id: "p-trn-4",
            text: "Please specify elements of the certification program",
            type: "header",
            isHeader: true
          },
          {
            id: "p-trn-4-1",
            text: "Internal certifications",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Internal certifications may be in place to demonstrate knowledge of company processes and policies",
            isSubquestion: true
          },
          {
            id: "p-trn-4-2",
            text: "External certification track",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Certifications track external certification organizations (e.g. ISACA, (ISC)2, SANS)",
            isSubquestion: true
          },
          {
            id: "p-trn-4-3",
            text: "Re-certification track (continuous education)",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Recognized education (Ph.D may be part of this certification track)",
            isSubquestion: true
          },
          {
            id: "p-trn-4-completeness",
            text: "Completeness",
            type: "completeness",
            remarks: "Use this outcome as a guideline to determine the score for 5.3",
            isSubquestion: true
          },
          {
            id: "p-trn-5",
            text: "Is the training and certification program connected to evaluation and career progression?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "e.g. certain training and certifications may be required to be eligible for a senior level function in a more mature level function"
          },
          {
            id: "p-trn-6",
            text: "Do you have a budget for education and training?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "A dedicated budget for training and certification is required to ensure that employees can apply for some purpose"
          },
          {
            id: "p-trn-7",
            text: "Is there a reserved amount of time for education and training?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "This is an extension of education budget"
          },
          {
            id: "p-trn-8",
            text: "Do you have time for workshops for knowledge development?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Workshops are an effective way of distributing knowledge"
          },
          {
            id: "p-trn-9",
            text: "Do you regularly review and update the training and certification programs?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Training and certification must be a relevant reflection of SOC knowledge and skill requirements"
          },
          {
            id: "p-trn-10",
            text: "Comments and/or Remarks",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments"
          }
        ]
      }
    }
  },
  "process": {
    name: "Process",
    subdomains: {
      "management": {
        name: "SOC Management",
        questions: [
          {
            id: "p-mng-1",
            text: "Is there a SOC management process in place?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "A SOC management process is used to manage all aspects SOC service delivery and quality"
          },
          {
            id: "p-mng-2",
            text: "Are SOC management elements formally identified and documented?",
            type: "dropdown",
           options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Possible SOC management elements can be found in 1.3"
          },
          {
            id: "p-mng-3",
            text: "Please specify SOC management elements",
            type: "header",
            isHeader: true
          },
          {
            id: "p-mng-3-1",
            text: "Internal relationship management",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Relationship management within the organization",
            isSubquestion: true
          },
          {
            id: "p-mng-3-2",
            text: "External relationship management",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Relationship management outside of the organization",
            isSubquestion: true
          },
          {
            id: "p-mng-3-3",
            text: "Vendor management",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Relationship management with relevant vendors for SOC technologies",
            isSubquestion: true
          },
          {
            id: "p-mng-3-4",
            text: "Continuous service improvement",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "A methodology for continuously improving SOC service delivery and internal processes supporting service delivery",
            isSubquestion: true
          },
          {
            id: "p-mng-3-5",
            text: "Process development",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "The process of developing new processes or improving existing ones",
            isSubquestion: true
          },
          {
            id: "p-mng-3-6",
            text: "Process documentation and diagrams",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Any documentation on SOC processes or services. May comprise diagrams explaining relationships between processes",
            isSubquestion: true
          },
          {
            id: "p-mng-3-7",
            text: "RACI matrix",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "A description of all SOC responsibilities and stakeholders and cases in which the SOC is informed or consulted",
            isSubquestion: true
          },
          {
            id: "p-mng-3-8",
            text: "Service Catalogue",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "A description of all SOC services and service levels",
            isSubquestion: true
          },
          {
            id: "p-mng-3-9",
            text: "Service request management process",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Processes for intake, evaluation and triage/prioritization for requests for new services or customers",
            isSubquestion: true
          },
          {
            id: "p-mng-3-10",
            text: "Service off-boarding procedure",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Procedure for removing existing services and customers from service delivery",
            isSubquestion: true
          },
          {
            id: "p-mng-3-completeness",
            text: "Completeness",
            type: "dropdown",
            options: ["Incomplete"],
            remarks: "Use this outcome as a guideline to determine the score for 1.2",
            isSubquestion: true
          },
          {
            id: "p-mng-4",
            text: "Is the SOC management process documented?",
            type: "dropdown",
            options: ["Never", "Sometimes", "Averagely", "Mostly", "Always"],
            remarks: "Documentation is required to ensure repeatability of the SOC management process"
          },
          {
            id: "p-mng-5",
            text: "Is the SOC management process aligned with all stakeholders?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Alignment with stakeholders will ensure the SOC delivers services that meet customer expectations"
          },
          {
            id: "p-mng-6",
            text: "Have you implemented a continuous improvement (CI)?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Continuous improvement is a critical success for SOCs to maintain their capabilities"
          },
          {
            id: "p-mng-7",
            text: "Specify elements of the continuous improvement program",
            type: "header",
            isHeader: true
          },
          {
            id: "p-mng-7-1",
            text: "Daily progress tracking",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Daily progress tracking is used to identify planning issues, deliverable priorities and request help for certain activities",
            isSubquestion: true
          },
          {
            id: "p-mng-7-2",
            text: "Weekly retro(s)",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Weekly retro(s) is done to create a balanced improvement workload for the team",
            isSubquestion: true
          },
          {
            id: "p-mng-7-3",
            text: "Backlog management",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Managing the backlog involves prioritization of tasks and providing the backlog",
            isSubquestion: true
          },
          {
            id: "p-mng-7-4",
            text: "Ticketing system for priorities",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "The ticketing system should be used to track improvements, especially when multiple people are involved",
            isSubquestion: true
          },
          {
            id: "p-mng-7-5",
            text: "Work time prioritization",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Prioritization of work items should follow a defined prioritization method and be done by the owners of the backlog",
            isSubquestion: true
          },
          {
            id: "p-mng-7-6",
            text: "Retrospective",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Retrospect of teams, backlogs or individual work, to ensure that team members understand the task at hand",
            isSubquestion: true
          },
          {
            id: "p-mng-7-7",
            text: "Capacity for change",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Having a reserved capacity for change ensures the improvement is continuous, and not overtaken by operational tasks",
            isSubquestion: true
          },
          {
            id: "p-mng-7-completeness",
            text: "Completeness",
            type: "dropdown",
            options: ["Incomplete"],
            remarks: "Use this outcome as a guideline to determine the score for 1.6",
            isSubquestion: true
          },
          {
            id: "p-mng-8",
            text: "Have you implemented a process to integrate SOC quality assurance / QA?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Quality assurance is aspect of ensuring that processes, technology and services meet their quality requirements"
          },
          {
            id: "p-mng-9",
            text: "Please specify elements of your quality assurance program",
            type: "header",
            isHeader: true
          },
          {
            id: "p-mng-9-1",
            text: "Ticket quality assurance",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Guidance specifically tailored at the existing process or procedures",
            isSubquestion: true
          },
          {
            id: "p-mng-9-2",
            text: "Incident quality assurance",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Controls and timely refinement of incidents, including correctly following steps to keep resource effectiveness",
            isSubquestion: true
          },
          {
            id: "p-mng-9-3",
            text: "Service quality assurance",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Delivery of services in accordance with established quality criteria",
            isSubquestion: true
          },
          {
            id: "p-mng-9-4",
            text: "Process quality assurance",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Execution of processes in accordance with established quality criteria",
            isSubquestion: true
          },
          {
            id: "p-mng-9-5",
            text: "Report quality assurance",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Control and timely report activities",
            isSubquestion: true
          },
          {
            id: "p-mng-9-completeness",
            text: "Completeness",
            type: "dropdown",
            options: ["Incomplete"],
            remarks: "Use this outcome as a guideline to determine the score for 1.8",
            isSubquestion: true
          },
          {
            id: "p-mng-10",
            text: "Have you implemented a SOC architecture process?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "A SOC architecture describes how different components work together"
          },
          {
            id: "p-mng-11",
            text: "Please specify elements of the SOC architecture",
            type: "header",
            isHeader: true
          },
          {
            id: "p-mng-11-1",
            text: "SOC process architecture",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "A process architecture defines the different processes within the SOC and how they interact / integrate",
            isSubquestion: true
          },
          {
            id: "p-mng-11-2",
            text: "SOC technology architecture",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "A technology architecture outlines the different technologies used within the SOC and how they interact / integrate",
            isSubquestion: true
          },
          {
            id: "p-mng-11-3",
            text: "SOC service architecture",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "A service architecture outlines the different services used within the SOC and how they interact / integrate",
            isSubquestion: true
          },
          {
            id: "p-mng-11-4",
            text: "Architecture blueprints",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Architecture diagrams are visualizations of components and integration",
            isSubquestion: true
          },
          {
            id: "p-mng-11-5",
            text: "Architecture principles",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Architecture principles are guidelines for implementing processes, technology & services",
            isSubquestion: true
          },
          {
            id: "p-mng-11-completeness",
            text: "Completeness",
            type: "dropdown",
            options: ["Incomplete"],
            remarks: "Use this outcome as a guideline to determine the score for 1.10",
            isSubquestion: true
          },
          {
            id: "p-mng-12",
            text: "Comments and/or Remarks",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments"
          }
        ]
      },
      "operations": {
        name: "Operations & Facilities",
        questions: [
          {
            id: "p-ops-1",
            text: "Do you have a documented exercise plan?",
            type: "dropdown",
            options: [
              "No",
              "Somewhat",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "An exercise plan lists the type of exercises to be conducted, the frequency and the exercise goals"
          },
          {
            id: "p-ops-1-1",
            text: "Do you have a documented exercise plan?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "An exercise plan lists the type of exercises to be conducted, the frequency and the exercise goals",
            isSubquestion: true
          },
          {
            id: "p-ops-1-2",
            text: "Please specify types of exercises included in the plan",
            type: "header",
            isHeader: true
          },
          {
            id: "p-ops-1-2-1",
            text: "Table-top exercises",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Table-top exercises are an easy way to go through a scenario and describe if all procedures and actions are clear",
            isSubquestion: true
          },
          {
            id: "p-ops-1-2-2",
            text: "Playbook drills",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Playbook drills are executed exercises to test the accuracy, effectiveness, and efficiency of playbooks",
            isSubquestion: true
          },
          {
            id: "p-ops-1-2-3",
            text: "Digital twin",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Digital twins provide a realistic environment to test procedures, tools, and playbooks. A digital twin environment is preferred",
            isSubquestion: true
          },
          {
            id: "p-ops-1-2-4",
            text: "Capture the flag",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "A capture the flag exercise is a useful exercise for security analysts, in which they must achieve a specified goal",
            isSubquestion: true
          },
          {
            id: "p-ops-1-2-5",
            text: "Purple/blue/red team exercises",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "These are types of exercises that involve the red and blue teams for assessments, without involving client",
            isSubquestion: true
          },
          {
            id: "p-ops-1-2-6",
            text: "Public exercises (1)",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Public exercises are exercises that the organization can participate in. Often, these are large-scale exercises",
            isSubquestion: true
          },
          {
            id: "p-ops-1-2-completeness",
            text: "Completeness",
            type: "dropdown",
            options: ["Incomplete"],
            remarks: "Use this outcome as a guideline to determine the score for 2.1.1",
            isSubquestion: true
          },
          {
            id: "p-ops-1-4",
            text: "Do you perform security operations exercises regularly?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Regularity should be matched to your local maturity policy"
          },
          {
            id: "p-ops-1-5",
            text: "Are the exercises documented?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Results from exercises should be documented for future reference and identification of improvements"
          },
          {
            id: "p-ops-1-6",
            text: "Are the exercises used to improve security operations?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Results from exercises should be used to improve security operations"
          },
          {
            id: "p-ops-2",
            text: "Service delivery standardization",
            type: "header",
            isHeader: true
          },
          {
            id: "p-ops-2-1",
            text: "Do you have standard operating procedures?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Standard operating procedures are used to provide consistent service"
          },
          {
            id: "p-ops-2-2",
            text: "Do you use checklists for recurring activities?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Checklists can be used to avoid recurring activities from being overlooked"
          },
          {
            id: "p-ops-2-3",
            text: "Do you use playbooks for incident response?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Playbooks are used to standardize activities, for example, security incidents"
          },
          {
            id: "p-ops-2-4",
            text: "Do you have a SOC operational handbook?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "A SOC operational handbook contains an overview of SOC tasks, as well as rules of engagement and important behavior"
          },
          {
            id: "p-ops-2-5",
            text: "Are your standard operating procedures linked to a program?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "A linked program means that there is a clear link between the understanding of SOC processes, tools and information"
          },
          {
            id: "p-ops-3",
            text: "Process integration",
            type: "header",
            isHeader: true
          },
          {
            id: "p-ops-3-1",
            text: "Is the configuration management process integrated in the SOC?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "SOC vendors and providers should be aligned and integrated with the organization's configuration management process"
          },
          {
            id: "p-ops-3-2",
            text: "Is the change management process integrated in the SOC?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "SOC vendors and providers should be aligned and integrated with the organization's change management process"
          },
          {
            id: "p-ops-3-3",
            text: "Is the problem management process integrated in the SOC?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "SOC vendors and providers should be aligned and integrated with the organization's problem management process"
          },
          {
            id: "p-ops-3-4",
            text: "Is the incident management process integrated in the SOC?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "SOC vendors and providers should be aligned and integrated with the organization's incident management process"
          },
          {
            id: "p-ops-3-5",
            text: "Is the service management process integrated in the SOC?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "SOC vendors and providers should be aligned and integrated with the organization's service management process"
          },
          {
            id: "p-ops-4",
            text: "SOC Facilities",
            type: "header",
            isHeader: true
          },
          {
            id: "p-ops-4-1",
            text: "Do you have a dedicated physical SOC location?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "A dedicated physical location decreases likelihood of unauthorized access and provides confidentiality for security incidents"
          },
          {
            id: "p-ops-4-2",
            text: "Do you have a war room for the SOC?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "A dedicated facility for coordination of major security incidents"
          },
          {
            id: "p-ops-4-3",
            text: "Do you have a dedicated network for the SOC?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Separate vulnerability of the SOC from the organization. If this is implemented it is on a separate network"
          },
          {
            id: "p-ops-4-4",
            text: "Do you have a dedicated phone line for the SOC?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "For 24/7 SOCs, a dedicated phone line is required"
          },
          {
            id: "p-ops-4-5",
            text: "Do you have a screen privacy/privacy location?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Preventing sensitive data from being seen by visitors collected during emergencies or other operational security purposes"
          },
          {
            id: "p-ops-4-6",
            text: "Do you have a dedicated internet connection?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "A dedicated internet connection can be used for security research as well as PR"
          },
          {
            id: "p-ops-4-7",
            text: "Do you have a call center capability for the SOC?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "During communication and coordination, an important function of a SOC, call center capability may be required"
          },
          {
            id: "p-ops-4-8",
            text: "Do you have backup/redundant facilities/locations?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "e.g. multiple rooms, virtual rooms, etc."
          },
          {
            id: "p-ops-4-9",
            text: "When you established screen remote working capabilities for SOC employees?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Screen working enabled remote working (secure remote work, encrypted, etc.), secure working facilitated SOC services support and performing"
          },
          {
            id: "p-ops-5",
            text: "Documentation management",
            type: "header",
            isHeader: true
          },
          {
            id: "p-ops-5-1",
            text: "Do you have a documentation management process?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "A documentation management process is needed for SOC knowledge"
          },
          {
            id: "p-ops-5-2",
            text: "Have a lifecycle been created to optimize software distribution?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Checklists should be created to optimize software. This often should include installation breaks and will be less time"
          },
          {
            id: "p-ops-5-3",
            text: "Do you have a documentation review process?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "A shifting operational environment leads to SOC which needs to configurations, etc."
          },
          {
            id: "p-ops-5-4",
            text: "Do you have a formally described shift turnover procedure?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "i.e. a procedure for handovers on a shift and checklist/list of information regarding events, cases or tasks for further follow-up"
          },
          {
            id: "p-ops-5-5",
            text: "Do you have a documentation portal?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "This one place to look to see where all important SOC procedures for all procedures"
          },
          {
            id: "p-ops-5-6",
            text: "Are the SOC procedures aligned with other procedures within the SOC?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "i.e. if there is a formal ITSM/IT function that delegates procedures to be able to be executed within a common tool"
          },
          {
            id: "p-ops-6",
            text: "Knowledge & document management",
            type: "header",
            isHeader: true
          },
          {
            id: "p-ops-6-1",
            text: "Do you have a knowledge management system in place?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "The system should support different file types, within indexing and version management, possibly even version"
          },
          {
            id: "p-ops-6-2",
            text: "Do you have a knowledge & collaboration platform in place?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "e.g. a wiki space or sharepoint that allows collaboration and supports team efforts"
          },
          {
            id: "p-ops-7",
            text: "Is the knowledge matrix actively used to determine training and education needs?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "The matrix should be used as a resource to identify skill gaps that should be filled for your SOC"
          },
          {
            id: "p-ops-8",
            text: "Is the knowledge matrix regularly updated?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Regular updates are required to ensure that the knowledge matrix remains accurate to document"
          },
          {
            id: "p-ops-9",
            text: "Do you regularly assess and revise the knowledge management process?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "This refers to the knowledge management process as a whole"
          },
          {
            id: "p-ops-10",
            text: "Is there a central place to support knowledge documentation and distribution?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Such tooling can help to avoid investigation similar issues multiple times by integrating into the security monitoring process"
          },
          {
            id: "p-ops-11",
            text: "Comments and/or Remarks",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments"
          }
        ]
      },
      "reporting": {
        name: "Reporting & Communication",
        questions: [
          {
            id: "p-rpt-1",
            text: "Do you regularly produce reports?",
            type: "dropdown",
            options: ["Never", "Sometimes","Averagely", "Mostly", "Fully"],
            remarks: "Regular reporting is a fundamental element of SOC activities"
          },
          {
            id: "p-rpt-2",
            text: "Are these reports tailored to recipients?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "E.g. different reports for senior management, technical teams, the IT organization"
          },
          {
            id: "p-rpt-3",
            text: "Are these reports consumed by the recipients?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Reports should be part of larger governance processes"
          },
          {
            id: "p-rpt-4",
            text: "Do you have established reporting lines within the organization?",
            type: "dropdown",
            options: [
              "No",
              "Partially",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "E.g. reporting lines could be: SOC management, IT management, senior management"
          },
          {
            id: "p-rpt-5",
            text: "Do you regularly review the report templates?",
            type: "dropdown",
            options: [
              "Never",
              "Sometimes",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Report templates should be continuously improved"
          },
          {
            id: "p-rpt-6",
            text: "Do you have formal agreements with the recipients regarding reports?",
            type: "dropdown",
            options: [
              "Never",
              "Sometimes",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "For example: timelines of delivery, report contents, etc."
          },
          {
            id: "p-rpt-7",
            text: "Do you monitor different types of reports to your recipients?",
            type: "dropdown",
            options: [
              "Never",
              "Sometimes",
              "Averagely",
              "Mostly",
              "Fully"
            ],
            remarks: "Different types of reports provide insight into security operations"
          },
          {
            id: "p-rpt-8",
            text: "Please indicate report types",
            type: "header",
            isHeader: true
          },
          {
            id: "p-rpt-8-1",
            text: "Technical security reports",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "i.e. reports regarding technical issues or technical solutions to security issues",
            isSubquestion: true
          },
          {
            id: "p-rpt-8-2",
            text: "Executive reports",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "i.e. reports aimed at senior management to inform them of SOC services",
            isSubquestion: true
          },
          {
            id: "p-rpt-8-3",
            text: "Operational reports",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "i.e. reports regarding security operations in general",
            isSubquestion: true
          },
          {
            id: "p-rpt-8-4",
            text: "Incident reports",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Ad hoc reports created by incident responders. This can also be part of incident management",
            isSubquestion: true
          },
          {
            id: "p-rpt-8-5",
            text: "Newsletter or digest",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "A newsletter can be an informal way to provide updates to the organization",
            isSubquestion: true
          },
          {
            id: "p-rpt-8-6",
            text: "KPI reports",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "KPI reports are used to measure service performance",
            isSubquestion: true
          },
          {
            id: "p-rpt-8-7",
            text: "Trend reports",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Trend reports show trends over time",
            isSubquestion: true
          },
          {
            id: "p-rpt-8-8",
            text: "Real-time reporting dashboards",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Real-time reporting dashboards provide immediate insight into the current performance level",
            isSubquestion: true
          },
          {
            id: "p-rpt-8-completeness",
            text: "Completeness",
            type: "completeness",
            remarks: "Use this outcome as a guideline to determine the score for 3.7",
            isSubquestion: true
          },
          {
            id: "p-rpt-9",
            text: "Do you use different types of metrics in your reports?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            remarks: "Different types of metrics provide more insight into security operations"
          },
          {
            id: "p-rpt-10",
            text: "Please indicate metric types",
            type: "header",
            isHeader: true
          },
          {
            id: "p-rpt-10-1",
            text: "Are quantitative metrics used in reports?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Event count, false positive rate, number of service requests, etc.",
            isSubquestion: true
          },
          {
            id: "p-rpt-10-2",
            text: "Are qualitative metrics used in reports?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "i.e. risk level, customer satisfaction",
            isSubquestion: true
          },
          {
            id: "p-rpt-10-3",
            text: "Are leading metrics used in reports?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Leading metrics are metrics that indicate how the SOC activities affected the SOC, average cost per incident, etc.",
            isSubquestion: true
          },
          {
            id: "p-rpt-10-4",
            text: "Are lagging metrics used in reports?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "These for effects, time to contain, time to eradicate",
            isSubquestion: true
          },
          {
            id: "p-rpt-10-5",
            text: "Are real-time metrics used in reports?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "e.g. service availability, incident handling queue length",
            isSubquestion: true
          },
          {
            id: "p-rpt-10-6",
            text: "Are proactive and reactive metrics used in reports?",
            type: "dropdown",
            options: ["Yes", "No"],
            remarks: "Proactive metrics can help to show how the team is actively preventing incidents from occurring",
            isSubquestion: true
          },
          {
            id: "p-rpt-10-completeness",
            text: "Completeness",
            type: "completeness",
            remarks: "Use this outcome as a guideline to determine the score for 3.9",
            isSubquestion: true
          },
          {
            id: "p-rpt-11",
            text: "Advisories",
            type: "header",
            isHeader: true
          },
          {
            id: "p-rpt-11-1",
            text: "Do you provide advisories to the organization regarding threats and vulnerabilities?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Advisories are used to inform customers of security threats and vulnerabilities"
          },
          {
            id: "p-rpt-11-2",
            text: "Do you have an established process for these advisories?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "i.e. do you add contextualized content to these advisories"
          },
          {
            id: "p-rpt-11-3",
            text: "Do you confirm follow-up of these advisories?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "i.e. do you assist in coordination when required"
          },
          {
            id: "p-rpt-12",
            text: "Education and Awareness",
            type: "header",
            isHeader: true
          },
          {
            id: "p-rpt-12-1",
            text: "Do you provide education and security awareness to the organization?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "The SOC may be involved in security awareness and education to make users in the organization aware of their role in cyber security"
          },
          {
            id: "p-rpt-12-2",
            text: "Do you measure the effectiveness of security awareness efforts?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Measuring the effects is necessary for improvement of all learning activities"
          },
          {
            id: "p-rpt-13",
            text: "Communication",
            type: "header",
            isHeader: true
          },
          {
            id: "p-rpt-13-1",
            text: "Do you use communication templates?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Communication templates help to standardize and professionalize SOC communication to stakeholders"
          },
          {
            id: "p-rpt-13-2",
            text: "Do you have a communication matrix in place?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "A communication matrix can be used to decide who, how and with what to communicate"
          },
          {
            id: "p-rpt-13-3",
            text: "Is communication training provided/offered for SOC personnel?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Communication training helps SOC personnel to communicate effectively"
          },
          {
            id: "p-rpt-13-4",
            text: "Are communication skills monitored for SOC personnel?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Communication skills are important for analysts to explain their findings and recommendations"
          },
          {
            id: "p-rpt-14",
            text: "Comments and/or Remarks",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments"
          }
        ]
      },
      
      "usecase": {
        name: "Use Case Management",
        questions: [
          {
            id: "p-ucm-1",
            text: "Use Case Management",
            type: "header",
            isHeader: true
          },
          {
            id: "p-ucm-1-1",
            text: "Is there a use case management process or framework in place?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "A framework, such as MITRE ATT&CK®, can be used to guide use case lifecycle and document use cases in a standardized format"
          },
          {
            id: "p-ucm-1-2",
            text: "Are use cases formally documented?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Formal documentation may include use case documentation, technical documentation, or training of new engineers"
          },
          {
            id: "p-ucm-1-3",
            text: "Are use cases approved by relevant stakeholders?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "e.g. business stakeholders, IT stakeholders, CISOs, audit & compliance, risk management, etc."
          },
          {
            id: "p-ucm-1-4",
            text: "Is the use case management process linked to other important processes?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "e.g. integration with the threat & risk management process, which ensures the threat landscape changes"
          },
          {
            id: "p-ucm-1-5",
            text: "Are use cases created using a standardized process?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "i.e. a standardized approach to define and select from threats or business requirements"
          },
          {
            id: "p-ucm-1-6",
            text: "Are use cases regularly reviewed?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "e.g. use cases can be refined from business requirements, threat intelligence, threat management or intelligence"
          },
          {
            id: "p-ucm-1-7",
            text: "Is there a process for retiring or decommissioning use cases?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Retiring use cases is important to keep the SOC agile and responsive to the changing threat landscape. Use cases that no longer"
          },
          {
            id: "p-ucm-1-8",
            text: "Can use cases be traced from their threat implementation to high-level requirements?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Bottom-up traceability is important for contextualizing use case output and business alignment"
          },
          {
            id: "p-ucm-1-9",
            text: "Are use cases measured for improvements on effectiveness?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Metrics can be applied to use cases, addressing growth and maturity by measuring effectiveness and implementation"
          },
          {
            id: "p-ucm-1-10",
            text: "Are use cases verified or prioritized based on risk levels?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Risks can be higher threats, but also non-compliance or penalties (laws & regulations)"
          },
          {
            id: "p-ucm-1-11",
            text: "Are use cases regularly updated or deleted?",
            type: "dropdown",
            options: ["Never","Sometimes","Averagely","Mostly","Always"],
            remarks: "Use cases should be subjected to life cycle management and regular updates, so they are updated and not compromised"
          },
          {
            id: "p-ucm-2",
            text: "Using MITRE ATT&CK® Threat Intelligence",
            type: "header",
            isHeader: true
          },
          {
            id: "p-ucm-2-1",
            text: "Do you use the MITRE ATT&CK® framework to identify threats for use case purposes?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "To ensure a use case-based MITRE ATT&CK® framework helps to identify threats and implement security monitoring detection approach"
          },
          {
            id: "p-ucm-2-2",
            text: "Are monitoring rules tagged with MITRE ATT&CK® framework identifiers? [2]",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Tagging monitoring rules with MITRE ATT&CK® identifiers allows for reporting on findings or attacks techniques"
          },
          {
            id: "p-ucm-2-3",
            text: "Have you created a use case for each MITRE ATT&CK® technique that you want to detect?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "The creation of a use case for a MITRE ATT&CK® technique helps to identify relevant attack techniques"
          },
          {
            id: "p-ucm-2-4",
            text: "Have you prioritized MITRE ATT&CK® techniques for relevance? [3]",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Using organizational context (proactive) and detection mechanisms, ATT&CK® techniques can be prioritized"
          },
          {
            id: "p-ucm-2-5",
            text: "Is your case system linked to MITRE ATT&CK® framework?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Using MITRE ATT&CK® is a good way to connect attack to detection, especially even when new campaigns"
          },
          {
            id: "p-ucm-2-6",
            text: "Is threat intelligence used for the creation and updates of use cases?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Threat intelligence can provide input into security monitoring, especially when using MITRE ATT&CK® to connect both"
          },
          {
            id: "p-ucm-3",
            text: "Visibility",
            type: "header",
            isHeader: true
          },
          {
            id: "p-ucm-3-1",
            text: "Do you determine and document visibility requirements for each use case?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Data source requirements should be part of use case design"
          },
          {
            id: "p-ucm-3-2",
            text: "Do you have a process to determine if your use cases for your analysis purposes?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Measuring visibility status of use cases will help to identify use cases that require additional data sources for detection optimization"
          },
          {
            id: "p-ucm-3-3",
            text: "Do you map data source visibility to the MITRE ATT&CK® framework? [4]",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Mapping available data sources to MITRE ATT&CK® data source requirements will help identify gaps in visibility of attack techniques"
          },
          {
            id: "p-ucm-4",
            text: "Comments and/or Remarks",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments"
          }
        ]
      },
      "detection": {
        name: "Detection Engineering & Validation",
        questions: [
          {
            id: "p-det-1",
            text: "Detection Engineering",
            type: "header",
            isHeader: true
          },
          {
            id: "p-det-1-1",
            text: "Do you have a detection engineering process in place?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "A detection engineering process supports the creation and deployment of detection rules for security monitoring purposes"
          },
          {
            id: "p-det-1-2",
            text: "Is the detection engineering process formally documented?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Formal documentation supports standardization and repeatability, including training of new engineers"
          },
          {
            id: "p-det-1-3",
            text: "Are there specific roles and requirements for detection engineers?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Detection engineers have a skillset that is different from security analysts and security engineers"
          },
          {
            id: "p-det-1-4",
            text: "Is there active cooperation between the threat intelligence team and detection engineers?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "SOC analyst skill sets allow checking from detection to detection, but a high emphasis is needed to transform the relevant"
          },
          {
            id: "p-det-1-5",
            text: "Is there active cooperation between the Threat Intelligence analysts and detection engineers?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Threat intelligence is a major input into the creation or updating of detection rules"
          },
          {
            id: "p-det-1-6",
            text: "Are detection engineers involved in the detection process?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Once the detection and handling they must be communicated to the SOC analyst with a formal hand-over to production"
          },
          {
            id: "p-det-1-7",
            text: "Is there a process for reviewing the effectiveness of detection rules?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "A formal review process is needed to determine if detection rules are working as designed or require a major level of quality"
          },
          {
            id: "p-det-1-8",
            text: "Is there a formal release process in place for new detection rules?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "A working system will allow to move from development to production following formal change management procedures"
          },
          {
            id: "p-det-1-9",
            text: "Is there a formal release process in place for updates of detection rules?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "A working system will allow to move from development to production following formal change management procedures"
          },
          {
            id: "p-det-1-10",
            text: "Do you have a roll-back procedure in place in case of problems with detections?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "A roll-back procedure created covering click-live goal state. If a deployment has an adverse effect on security monitoring"
          },
          {
            id: "p-det-2",
            text: "Detection Validation",
            type: "header",
            isHeader: true
          },
          {
            id: "p-det-2-1",
            text: "Do you perform adversary emulation or simulated detection testing? [1]",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "These validation activities provides insight into how well security monitoring is able to detect certain adversaries or attack techniques"
          },
          {
            id: "p-det-2-2",
            text: "Do you test new detection rules in a test environment?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Testing in a test environment allows for validation of detection rules prior to MITRE ATT&CK®"
          },
          {
            id: "p-det-2-3",
            text: "Do you use detection analytics that integrate with MITRE ATT&CK®?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Not all use cases and rules have a relationship to MITRE ATT&CK®. Those use cases should be tested as well"
          },
          {
            id: "p-det-2-4",
            text: "Do you test detection analytics that don't integrate with MITRE ATT&CK®?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Testing both detection and response processes ensures a more complete view of SOC capabilities"
          },
          {
            id: "p-det-2-5",
            text: "Is detection validation fully integrated in the detection engineering process / pipeline?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "When deploying new or updated detections, automated detection testing should be executed as a quality gate"
          },
          {
            id: "p-det-2-6",
            text: "Is the outcome from detection validation used in input into monitoring and detection engineering?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Output should feed to optimize processes and new detection, as well as information for SOC analysts"
          },
          {
            id: "p-det-2-7",
            text: "Do you monitor the false rejection rates for false alarms?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Monitoring data ingestion is used to identify false rejection problems or inactive data sources"
          },
          {
            id: "p-det-2-8",
            text: "Do you actively monitor and improve detection coverage?",
            type: "dropdown",
            options: ["No","Partially","Averagely","Mostly","Fully"],
            remarks: "Data source coverage should be optimized to avoid blind spots in monitoring"
          },
          {
            id: "p-det-3",
            text: "Comments and/or Remarks",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments"
          }
        ]
      }
    }
  },
  "technology": {
    name: "Technology",
    subdomains: {
      "siem_tooling": {
    "name": "SIEM Tooling",
    "questions": [
      {
        id: "siem-1",
        text: "Accountability",
        type: "header",
        isHeader: true
      },

      {
        id: "siem-1-1",
        text: "Has functional ownership of the solution been formally assigned?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Functional ownership includes functional accountability.",
        remarks: "Ensures clear responsibility for the SIEM solution."
      },
      {
        id: "siem-1-2",
        text: "Has technical ownership of the solution been formally assigned?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Technical ownership includes technical accountability.",
        remarks: "Ensures technical oversight and management of the SIEM solution."
      },
      {
        id: "siem-2",
        text: "Documentation",
        type: "header",
        isHeader: true
      },
      {
        id: "siem-2-1",
        text: "Has the solution been technically documented?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "A technical description of the SIEM system components and configuration.",
        remarks: "Essential for maintenance and troubleshooting."
      },
      {
        id: "siem-2-2",
        text: "Has the solution been functionally documented?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "A description of the SIEM functional configuration (rules, filters, lists, etc.).",
        remarks: "Important for understanding and configuring the SIEM's operational aspects."
      },
      {
        id: "siem-3",
        text: "Personnel Support",
        type: "header",
        isHeader: true
      },
      {
        id: "siem-3-1",
        text: "Is there dedicated personnel for support?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Dedicated personnel should be in place to ensure that support is always available.",
        remarks: "Can also be staff with outsourced provider."
      },
      {
        id: "siem-3-2",
        text: "Is the personnel for support formally trained?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Training helps to jump start new hires and learn a proper way of working with the tool.",
        remarks: "Ensures competency in using the SIEM tool."
      },
      {
        id: "siem-3-3",
        text: "Is the personnel for support certified?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Certification demonstrates ability to handle the tooling properly.",
        remarks: "Enhances credibility and skill level of support personnel."
      },
      {
        id: "siem-3-4",
        text: "Is there a support contract for the solution?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "A support contract may cover on-site support, support availability, response times, escalation, and full access to resources.",
        remarks: "Ensures continuous support and maintenance."
      },
      {
        id: "siem-4",
        text: "Maintenance & Configuration",
        type: "header",
        isHeader: true
      },
      {
        id: "siem-4-1",
        text: "Is the system regularly maintained?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Systems should be regularly maintained to keep up with the latest features and bug fixes.",
        remarks: "Important for system health and performance."
      },
      {
        id: "siem-4-2",
        text: "Is remote maintenance on the system managed?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Remote maintenance by a third party may be part of system maintenance procedures.",
        remarks: "Ensures timely updates and fixes."
      },
      {
        id: "siem-4-3",
        text: "Are maintenance & configuration updates executed through the change management process?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Maintenance and configuration updates should follow the formal change management process.",
        remarks: "Ensures controlled and documented changes."
      },
      {
        id: "siem-4-4",
        text: "Have you established maintenance windows?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Setting maintenance windows helps to structure the maintenance process and make it more predictable.",
        remarks: "Important for planning and minimizing disruptions."
      },
      {
        id: "siem-4-5",
        text: "Is maintenance performed using authorized and trusted tooling?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Performing maintenance with authorized and trusted tooling helps to ensure security and integrity of the system.",
        remarks: "Critical for maintaining system security."
      },
      {
        id: "siem-5",
        text: "Availability & Integrity",
        type: "header",
        isHeader: true
      },
      {
        id: "siem-5-1",
        text: "Is there high availability (HA) in place for the solution?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Can be fully implemented HA, partially implemented, hot spare, etc.",
        remarks: "Ensures continuous operation and minimizes downtime."
      },
      {
        id: "siem-5-2",
        text: "Is there data backup / replication in place for the solution?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "May not be feasible for all SIEM solutions.",
        remarks: "Important for data recovery and business continuity."
      },
      {
        id: "siem-5-3",
        text: "Is there configuration backup / replication in place for the solution?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Configuration synchronization could be part of a HA setup.",
        remarks: "Ensures configuration consistency and recovery."
      },
      {
        id: "siem-5-4",
        text: "Is there a Disaster Recovery plan in place for this solution?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "A DR plan is required to restore service in case of catastrophic events.",
        remarks: "Critical for business continuity."
      },
      {
        id: "siem-5-5",
        text: "Is the Disaster Recovery plan regularly tested?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Testing the DR plan is required to ensure that it is complete, functional, and tasks and responsibilities for involved personnel are understood.",
        remarks: "Ensures DR plan effectiveness."
      },
      {
        id: "siem-5-6",
        text: "Is there a separate development / test environment for this solution?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "A separate test environment allows for testing of new configurations before deployment in production.",
        remarks: "Important for safe and controlled updates."
      },
      {
        id: "siem-6",
        text: "Access Management",
        type: "header",
        isHeader: true
      },
      {
        id: "siem-6-1",
        text: "Is access to the solution limited to authorized personnel?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "The system will contain confidential information and information that possibly impacts employee privacy.",
        remarks: "Ensures data security and privacy."
      },
      {
        id: "siem-6-2",
        text: "Are access rights regularly reviewed and revoked if required?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Revocation is part of normal employee termination. Special emergency revocation should be in place for suspected misuse.",
        remarks: "Important for maintaining access control."
      },
      {
        id: "siem-6-3",
        text: "Is a break glass procedure in place?",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "A break glass procedure and account is required to gain access to the tooling even in case of major IT outages.",
        remarks: "Critical for emergency access."
      },
      {
        id: "siem-7",
        text: "Capability",
        type: "header",
        isHeader: true
      },
      {
        id: "siem-7-1",
        text: "Specify which technological capabilities and artefacts are present and implemented:",
        type: "header",
        isHeader: true,
        remarks: "Ensures comprehensive evaluation of SIEM capabilities."
      },
      {
        id: "siem-7-1-1",
        text: "Subtle event detection",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Capability to detect slight changes in systems, applications, or network that may indicate malicious behavior.",
        remarks: "Important for early threat detection.",
        isSubquestion: true
      },
      {
        id: "siem-7-1-2",
        text: "Automated alerting",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Alerting based on different alerting mechanisms (SMS, mail, etc.).",
        remarks: "Ensures timely notification of potential issues.",
        isSubquestion: true
      },
      {
        id: "siem-7-1-3",
        text: "Alert acknowledgement",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Capability to acknowledge alerts so other analysts know the alert is being investigated.",
        remarks: "Important for coordinated response.",
        isSubquestion: true
      },
      {
        id: "siem-7-1-4",
        text: "Case management system",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "A case management system that supports SOC analyst workflows.",
        remarks: "Enhances efficiency and tracking of cases.",
        isSubquestion: true
      },
      {
        id: "siem-7-1-5",
        text: "Network model",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "A full network model in which zones and segments are defined.",
        remarks: "Important for understanding network topology.",
        isSubquestion: true
      },
      {
        id: "siem-7-1-6",
        text: "Detailed audit trail of analyst activities",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "The audit trail can be used to report on analyst activities and to uncover potential abuse of the big data solution.",
        remarks: "Ensures accountability and transparency.",
        isSubquestion: true
      },
      {
        id: "siem-7-1-7",
        text: "Historical activity detection",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Capability of detecting historical activity for recently uncovered threats.",
        remarks: "Important for retrospective analysis.",
        isSubquestion: true
      },
      {
        id: "siem-7-1-8",
        text: "Flexible and scalable architecture",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "A flexible and scalable architecture supports the SOC as it grows in size (FTE) and data (coverage).",
        remarks: "Ensures future-proofing of the SIEM solution.",
        isSubquestion: true
      },
      {
        id: "siem-7-1-9",
        text: "MITRE ATT&CK® identifier tagging",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Add MITRE ATT&CK® tags to rules / analytics for mapping purposes.",
        remarks: "Enhances threat intelligence and mapping.",
        isSubquestion: true
      },
      {
        id: "siem-7-2",
        text: "Data ingestion and processing",
        type: "header",
        isHeader: true
      },
      {
        id: "siem-7-2-1",
        text: "Aggregation",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Capability to aggregate data and optimize the event flow.",
        remarks: "Important for efficient data processing.",
        isSubquestion: true
      },
      {
        id: "siem-7-2-2",
        text: "Normalisation",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Normalization of data is required for advanced searching and comparison of events from different sources.",
        remarks: "Ensures data consistency.",
        isSubquestion: true
      },
      {
        id: "siem-7-2-3",
        text: "Correlation",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Capability to correlate multiple events.",
        remarks: "Important for identifying patterns and threats.",
        isSubquestion: true
      },
      {
        id: "siem-7-2-4",
        text: "Multi-stage correlation",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Capability to detect attacks across multiple attack stages.",
        remarks: "Enhances threat detection capabilities.",
        isSubquestion: true
      },
      {
        id: "siem-7-2-5",
        text: "Custom parsing",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Capability to create and maintain custom parsers for parsing and normalization needs.",
        remarks: "Important for handling diverse data sources.",
        isSubquestion: true
      },
      {
        id: "siem-7-2-6",
        text: "API Integration",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Both export of information / commands and import of data from API sources (such as cloud).",
        remarks: "Enhances integration and data exchange.",
        isSubquestion: true
      },
      {
        id: "siem-7-2-7",
        text: "Secure Event Transfer",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Support for secure event transfer and the actual implementation of secure transfer (e.g., regular syslog is not secure).",
        remarks: "Ensures secure data transmission.",
        isSubquestion: true
      },
      {
        id: "siem-7-2-8",
        text: "Support for multiple event transfer technologies",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "The SIEM should support event transfer technologies for all possible data sources.",
        remarks: "Ensures comprehensive data collection.",
        isSubquestion: true
      },
      {
        id: "siem-7-3",
        text: "Integration(technical process)",
        type: "header",
        isHeader: true
      },
      {
        id: "siem-7-3-1",
        text: "Asset management integration",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Integration into the asset management process for automated adding of assets to the SIEM for monitoring.",
        remarks: "Enhances asset visibility and management.",
        isSubquestion: true
      },
      {
        id: "siem-7-3-2",
        text: "Business context integration",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Integration of business context (business function, asset classification, etc.).",
        remarks: "Enhances contextual awareness.",
        isSubquestion: true
      },
      {
        id: "siem-7-3-3",
        text: "Identity context integration",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Integration of identity information into the SIEM for enhanced monitoring of users and groups.",
        remarks: "Enhances identity-based monitoring.",
        isSubquestion: true
      },
      {
        id: "siem-7-3-4",
        text: "Asset context integration",
        type: "dropdown",
        options: ["No", "Yes"],
        guidance: "Integration of asset management information into the SIEM (asset owner, asset location, etc.).",
        remarks: "Enhances asset-based monitoring.",
        isSubquestion: true
      },
      {
        id: "siem-7-3-5",
        text: "Vulnerability context integration",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Integration of vulnerability management information into SIEM assets to determine risk levels for assets.",
        remarks: "Enhances vulnerability management.",
        isSubquestion: true
      },
      {
        id: "siem-7-3-6",
        text: "Threat Intelligence integration",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Integration of threat intelligence information (observables / IoCs) into the security monitoring tooling.",
        remarks: "Enhances threat detection capabilities.",
        isSubquestion: true
      },
      {
        id: "siem-7-3-7",
        text: "Threat hunting integration",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Integration of the tooling into the threat hunting process to support threat hunting investigations.",
        remarks: "Enhances threat hunting capabilities.",
        isSubquestion: true
      },
      {
        "id": "siem-48",
        "text": "Security incident management integration",
        "type": "dropdown",
        "options": ["No", "Yes"],
        "guidance": "Integration of the security incident management process to support incident investigation.",
        remarks: "Enhances incident response capabilities.",
        isSubquestion: true
      },
      {
        id: "siem-7-3-8",
        text: "SOAR integration",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Integration with the SOAR tooling for automation purposes.",
        remarks: "Enhances automation and orchestration.",
        isSubquestion: true
      },
      {
        id: "siem-7-4",
        text: "Rule-based detection",
        type: "header",
        isHeader: true
      },
      {
        id: "siem-7-4-1",
        text: "Standard detection rules",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Use of standard content packs in the security monitoring solution.",
        remarks: "Enhances baseline detection capabilities.",
        isSubquestion: true
      },
      {
        id: "siem-7-4-2",
        text: "Custom detection rules",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Use of custom content (correlation rules, etc.) in the security monitoring solution.",
        remarks: "Enhances tailored detection capabilities.",
        isSubquestion: true
      },{
        id: "siem-7-5",
        text: "Anomaly detection",
        type: "header",
        isHeader: true
      },
      {
        id: "siem-7-5-1",
        text: "Custom detection rules",
        type: "dropdown",
        options: ["No","Partially","Averagely","Mostly","Fully"],
        guidance: "Use of custom content (correlation rules, etc.) in the security monitoring solution.",
        remarks: "Enhances tailored detection capabilities.",
        isSubquestion: true
      },
      {
        id: "siem-7-5-2",
        text: "User anomalies",
        type: "dropdown",
        options: ["No", "Yes"],
        guidance: "Anomalous pattern detection for users.",
        remarks: "Enhances user behavior monitoring.",
        isSubquestion: true
      },
      {
        id: "siem-7-5-3",
        text: "Application anomalies",
        type: "dropdown",
        options: ["No", "Yes"],
        guidance: "Anomalous pattern detection for applications.",
        remarks: "Enhances application behavior monitoring.",
        isSubquestion: true
      },
      {
        id: "siem-7-5-4",
        text: "Device anomalies",
        type: "dropdown",
        options: ["No", "Yes"],
        guidance: "Anomalous pattern detection for devices.",
        remarks: "Enhances device behavior monitoring.",
        isSubquestion: true
      },
      {
        id: "siem-7-5-5",
        text: "Network anomalies",
        type: "dropdown",
        options: ["No", "Yes"],
        guidance: "Anomalous pattern detection for network.",
        remarks: "Enhances network behavior monitoring.",
        isSubquestion: true
      },
      {
        id: "siem-7-6",
        text: "Visualization and output",
        type: "header",
        isHeader: true
      },
      {
        id: "siem-7-6-1",
        text: "Reporting",
        type: "dropdown",
        options: ["No", "Yes"],
        guidance: "Custom reports for SOC customers and SOC analysts.",
        remarks: "Enhances reporting capabilities.",
        isSubquestion: true
      },
      {
        id: "siem-7-6-2",
        text: "Dashboards",
        type: "dropdown",
        options: ["No", "Yes"],
        guidance: "Custom dashboards used by analysts and managers.",
        remarks: "Enhances data visualization.",
        isSubquestion: true
      },
      {
        id: "siem-7-6-3",
        text: "Dashboards",
        type: "dropdown",
        options: ["No", "Yes"],
        guidance: "Custom dashboards used by analysts and managers.",
        remarks: "Enhances data visualization.",
        isSubquestion: true
      },
      {
        id: "siem-7-6-4",
        text: "Data visualization techniques",
        type: "dropdown",
        options: ["No", "Yes"],
        guidance: "Graphing capabilities to support analysis.",
        remarks: "Enhances data analysis.",
        isSubquestion: true
      },
      {
        id: "siem-7-6-5",
        text: "Data drilldowns",
        type: "dropdown",
        options: ["No", "Yes"],
        guidance: "Drilldowns on graphs to quickly 'zoom in' on details of visual anomalies.",
        remarks: "Enhances detailed analysis.",
        isSubquestion: true
      },
      {
        id: "siem-7-6-6",
        text: "Central analysis console",
        type: "dropdown",
        options: ["No", "Yes"],
        guidance: "A central console used by SOC analysts.",
        remarks: "Enhances centralized monitoring.",
        isSubquestion: true
      },
      {
        id: "siem-7-6-7",
        text: "Advanced searching and querying",
        type: "dropdown",
        options: ["No", "Yes"],
        guidance: "Searching capabilities that support finding specific information based on characteristics.",
        remarks: "Enhances data querying.",
        isSubquestion: true
      },
      {
        id: "siem-7-completeness",
        text: "Completeness",
        type: "completeness",
       
        isSubquestion: true
      },
      {
        id: "siem-62",
        text: "Comments and/or Remarks",
        type: "text",
        guidance: "Space to provide any relevant context or any additional comments."
      }
    ]
  },
  "idps_tooling": {
    name: "IDPS Tooling",
    questions: [
      {
        id: "idps-1",
        text: "Accountability",
        type: "header",
        isHeader: true
      },
      {
        id: "idps-1-1",
        text: "Has functional ownership of the solution been formally assigned?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Functional ownership includes functional accountability.",
        remarks: "Ensures clear responsibility for the IDPS solution."
      },
      {
        id: "idps-1-2",
        text: "Has technical ownership of the solution been formally assigned?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Technical ownership includes technical accountability.",
        remarks: "Ensures technical oversight and management of the IDPS solution."
      },
      {
        id: "idps-2",
        text: "Documentation",
        type: "header",
        isHeader: true
      },
      {
        id: "idps-2-1",
        text: "Has the solution been technically documented?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A technical description of the IDPS system components and configuration.",
        remarks: "Essential for maintenance and troubleshooting."
      },
      {
        id: "idps-2-2",
        text: "Has the solution been functionally documented?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A description of the IDPS functional configuration (rules, alerts, thresholds, etc.).",
        remarks: "Important for understanding and configuring the IDPS's operational aspects."
      },
      {
        id: "idps-3",
        text: "Personnel & Support",
        type: "header",
        isHeader: true
      },
      {
        id: "idps-3-1",
        text: "Is there dedicated personnel for support?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Dedicated personnel should be in place to ensure that support is always available.",
        remarks: "Can also be staff with outsourced provider."
      },
      {
        id: "idps-3-2",
        text: "Is the personnel for support formally trained?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Training helps to jump start new hires and learn a proper way of working with the tool.",
        remarks: "Ensures competency in using the IDPS tool."
      },
      {
        id: "idps-3-3",
        text: "Is the personnel for support certified?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Certification demonstrates ability to handle the tooling properly.",
        remarks: "Enhances credibility and skill level of support personnel."
      },
      {
        id: "idps-3-4",
        text: "Is there a support contract for the solution?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A support contract may cover on-site support, support availability, response times, escalation, and full access to resources.",
        remarks: "Ensures continuous support and maintenance."
      },
      {
        id: "idps-4",
        text: "Maintenance & Configuration",
        type: "header",
        isHeader: true
      },
      {
        id: "idps-4-1",
        text: "Is the system regularly maintained?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Systems should be regularly maintained to keep up with the latest features and bug fixes.",
        remarks: "Important for system health and performance."
      },
      {
        id: "idps-4-2",
        text: "Is remote maintenance on the system managed?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Remote maintenance by a third party may be part of system maintenance procedures.",
        remarks: "Ensures timely updates and fixes."
      },
      {
        id: "idps-4-3",
        text: "Are maintenance & configuration updates executed through the change management process?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Maintenance and configuration updates should follow the formal change management process.",
        remarks: "Ensures controlled and documented changes."
      },
      {
        id: "idps-4-4",
        text: "Have you established maintenance windows?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Setting maintenance windows helps to structure the maintenance process and make it more predictable.",
        remarks: "Important for planning and minimizing disruptions."
      },
      {
        id: "idps-4-5",
        text: "Is maintenance performed using authorized and trusted tooling?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Performing maintenance with authorized and trusted tooling helps to ensure security and integrity of the system.",
        remarks: "Critical for maintaining system security."
      },
      {
        id: "idps-5",
        text: "Availability & Integrity",
        type: "header",
        isHeader: true
      },
      {
        id: "idps-5-1",
        text: "Is there high availability (HA) in place for the solution?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Can be fully implemented HA, partially implemented, hot spare, etc.",
        remarks: "Ensures continuous operation and minimizes downtime."
      },
      {
        id: "idps-5-2",
        text: "Is there data backup / replication in place for the solution?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Data may include logs and PCAP files.",
        remarks: "Important for data recovery and business continuity."
      },
      {
        id: "idps-5-3",
        text: "Is there configuration backup / replication in place for the solution?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Configuration synchronization could be part of a HA setup.",
        remarks: "Ensures configuration consistency and recovery."
      },
      {
        id: "idps-5-4",
        text: "Is there a Disaster Recovery plan in place for this solution?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A DR plan is required to restore service in case of catastrophic events.",
        remarks: "Critical for business continuity."
      },
      {
        id: "idps-5-5",
        text: "Is the Disaster Recovery plan regularly tested?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Testing the DR plan is required to ensure that it is complete, functional, and tasks and responsibilities for involved personnel are understood.",
        remarks: "Ensures DR plan effectiveness."
      },
      {
        id: "idps-5-6",
        text: "Is there a separate development / test environment for this solution?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A separate test environment allows for testing of new configurations before deployment in production.",
        remarks: "Important for safe and controlled updates."
      },
      {
        id: "idps-6",
        text: "Access Management",
        type: "header",
        isHeader: true
      },
      {
        id: "idps-6-1",
        text: "Is access to the solution limited to authorized personnel?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "The IDPS system will contain confidential information and possibly information that impacts employee privacy.",
        remarks: "Ensures data security and privacy."
      },
      {
        id: "idps-6-2",
        text: "Are access rights regularly reviewed and revoked if required?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Revocation is part of normal employee termination. Special emergency revocation should be in place for suspected misuse.",
        remarks: "Important for maintaining access control."
      },
      {
        id: "idps-6-3",
        text: "Is a break glass procedure in place?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A break glass procedure and account is required to gain access to the tooling even in case of major IT outages.",
        remarks: "Critical for emergency access."
      },
      {
        id: "idps-7",
        text: "Capability",
        type: "header",
        isHeader: true
      },
      {
        id: "idps-7-1",
        text: "Specify which technological capabilities and artefacts are present and implemented:",
        type: "header",
        isHeader: true,
        remarks: "Ensures comprehensive evaluation of IDPS capabilities."
      },
      {
        id: "idps-7-1-1",
        text: "Encrypted traffic analysis",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Helps to identify potentially malicious traffic in encrypted communications, using fingerprinting or certificate analysis.",
        remarks: "Important for detecting threats in encrypted traffic.",
        isSubquestion: true
      },
      {
        id: "idps-7-1-2",
        text: "IDS signature matching",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "The ability to use IDS signatures (e.g., YARA) in network monitoring.",
        remarks: "Enhances threat detection capabilities.",
        isSubquestion: true
      },
      {
        id: "idps-7-1-3",
        text: "Supervised machine learning",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Machine learning trained on a predefined data set with known good and bad traffic.",
        remarks: "Enhances detection accuracy.",
        isSubquestion: true
      },
      {
        id: "idps-7-1-4",
        text: "Unsupervised machine learning",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Machine learning trained without a predefined data set.",
        remarks: "Useful for detecting unknown threats.",
        isSubquestion: true
      },
      {
        id: "idps-7-1-5",
        text: "Traffic blocking",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "In-line appliances can block malicious traffic as part of their response capability.",
        remarks: "Important for preventing threats.",
        isSubquestion: true
      },
      {
        id: "idps-7-1-6",
        text: "Unauthorized device detection",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Detection of unauthorized devices accessing the network.",
        remarks: "Enhances network security.",
        isSubquestion: true
      },
      {
        id: "idps-7-1-7",
        text: "MITRE ATT&CK® identifier tagging",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Add MITRE ATT&CK® tags to rules / analytics for mapping and hunting purposes.",
        remarks: "Enhances threat intelligence and mapping.",
        isSubquestion: true
      },
      {
        id: "idps-7-1-8",
        text: "Deep packet inspection",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Detailed inspection of data sent across the network.",
        remarks: "Important for in-depth traffic analysis.",
        isSubquestion: true
      },
      {
        id: "idps-7-1-9",
        text: "Correlation",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Correlation of anomalies with previously detected anomalies or detection rules.",
        remarks: "Enhances threat detection capabilities.",
        isSubquestion: true
      },
      {
        id: "idps-7-2",
        text: "Data Ingestion and Processing",
        type: "header",
        isHeader: true
      },
      {
        id: "idps-7-2-1",
        text: "Full packet capture",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Full packet capture supports network forensic capabilities.",
        remarks: "Important for detailed traffic analysis.",
        isSubquestion: true
      },
      {
        id: "idps-7-2-2",
        text: "Flow data ingestion",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Flow data (such as NetFlow, IPFIX, etc.) ingestion.",
        remarks: "Enhances network traffic monitoring.",
        isSubquestion: true
      },
      {
        id: "idps-7-3",
        text: "Monitoring Capabilities",
        type: "header",
        isHeader: true
      },
      {
        id: "idps-7-3-1",
        text: "Monitoring north-south network traffic",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Monitoring capabilities for traffic crossing the perimeter.",
        remarks: "Important for detecting external threats.",
        isSubquestion: true
      },
      {
        id: "idps-7-3-2",
        text: "Monitoring east-west network traffic",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Monitoring capabilities for traffic traversing the internal network.",
        remarks: "Important for detecting internal threats.",
        isSubquestion: true
      },
      {
        id: "idps-7-3-3",
        text: "Monitoring classified network segments",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Monitoring capabilities for classified network segments.",
        remarks: "Enhances security for sensitive network areas.",
        isSubquestion: true
      },
      {
        id: "idps-7-3-4",
        text: "Monitoring cloud environments",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Monitoring capabilities for cloud connections / environments.",
        remarks: "Important for securing cloud infrastructure.",
        isSubquestion: true
      },
      {
        id: "idps-7-3-5",
        text: "Monitoring ICS/SCADA networks",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Monitoring capabilities for ICS/SCADA networks.",
        remarks: "Enhances security for industrial control systems.",
        isSubquestion: true
      },
      {
        id: "idps-7-3-6",
        text: "Monitoring DNS traffic",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Monitoring capabilities for DNS queries.",
        remarks: "Important for detecting DNS-based threats.",
        isSubquestion: true
      },
      {
        id: "idps-7-4",
        text: "Integrations (Technical & Process)",
        type: "header",
        isHeader: true
      },
      {
        id: "idps-7-4-1",
        text: "Business context integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Integration of business context (business function, asset classification, etc.).",
        remarks: "Enhances contextual awareness.",
        isSubquestion: true
      },
      {
        id: "idps-7-4-2",
        text: "Identity context integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Integration of identity information into the IDPS for enhanced monitoring of users and groups.",
        remarks: "Enhances identity-based monitoring.",
        isSubquestion: true
      },
      {
        id: "idps-7-4-3",
        text: "Threat Intelligence integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Integration of threat intelligence information (observables / IoCs) into the IDPS tooling for reputation-based monitoring.",
        remarks: "Enhances threat detection capabilities.",
        isSubquestion: true
      },
      {
        id: "idps-7-4-4",
        text: "Threat hunting integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Integration of the tooling into the threat hunting process to support threat hunting investigations.",
        remarks: "Enhances threat hunting capabilities.",
        isSubquestion: true
      },
      {
        id: "idps-7-4-5",
        text: "Security incident management integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Integration of the security incident management process to support incident investigation.",
        remarks: "Enhances incident response capabilities.",
        isSubquestion: true
      },
      {
        id: "idps-7-4-6",
        text: "SIEM integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Integration with the SIEM tooling for centralized correlation.",
        remarks: "Enhances overall security monitoring capabilities.",
        isSubquestion: true
      },
      {
        id: "idps-7-4-7",
        text: "Malware sandbox integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Detonate potential malware samples in a sandbox environment.",
        remarks: "Enhances malware analysis capabilities.",
        isSubquestion: true
      },
      {
        id: "idps-7-5",
        text: "Rule-based Detection",
        type: "header",
        isHeader: true
      },
      {
        id: "idps-7-5-1",
        text: "Standard detection rules",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Use of standard content packs in the security monitoring solution.",
        remarks: "Enhances baseline detection capabilities.",
        isSubquestion: true
      },
      {
        id: "idps-7-5-2",
        text: "Custom detection rules",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Use of custom content (correlation rules, etc.) in the security monitoring solution.",
        remarks: "Enhances tailored detection capabilities.",
        isSubquestion: true
      },
      {
        id: "idps-7-6",
        text: "Anomaly Detection",
        type: "header",
        isHeader: true
      },
      {
        id: "idps-7-6-1",
        text: "Traffic baselining",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Creation of network baselines for anomaly detection purposes.",
        remarks: "Important for detecting unusual traffic patterns.",
        isSubquestion: true
      },
      {
        id: "idps-7-6-2",
        text: "Pattern analysis",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Detection of anomalous patterns, for example in (encrypted) sessions, using machine learning.",
        remarks: "Enhances detection of sophisticated threats.",
        isSubquestion: true
      },
      {
        id: "idps-7-7",
        text: "Visualization and Output",
        type: "header",
        isHeader: true
      },
      {
        id: "idps-7-7-1",
        text: "Reporting",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Custom reports for SOC customers and SOC analysts.",
        remarks: "Enhances reporting capabilities.",
        isSubquestion: true
      },
      {
        id: "idps-7-7-2",
        text: "Dashboards",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Custom dashboards used by analysts and managers.",
        remarks: "Enhances data visualization.",
        isSubquestion: true
      },
      {
        id: "idps-7-7-3",
        text: "Data visualization techniques",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Graphing capabilities to support analysis.",
        remarks: "Enhances data analysis.",
        isSubquestion: true
      },
      {
        id: "idps-7-7-4",
        text: "Data drilldowns",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Drilldowns on graphs to quickly 'zoom in' on details of visual anomalies.",
        remarks: "Enhances detailed analysis.",
        isSubquestion: true
      },
      {
        id: "idps-7-7-5",
        text: "Central analysis console",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A central console used by SOC analysts.",
        remarks: "Enhances centralized monitoring.",
        isSubquestion: true
      },
      {
        id: "idps-7-7-6",
        text: "Advanced searching and querying",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Searching capabilities that support finding specific information based on characteristics, especially useful for network threat hunting.",
        remarks: "Enhances data querying.",
        isSubquestion: true
      },
      {
        id: "idps-7-completeness",
        text: "Completeness",
        type: "completeness",
        isSubquestion: true
      },
      {
        id: "idps-7-8",
        text: "Comments and/or Remarks",
        type: "text",
        guidance: "Space to provide any relevant context or any additional comments."
      }
    ]
  },
  "security_analytics_tooling": {
    name: "Security Analytics Tooling",
    questions: [
      {
        id: "sec-1",
        text: "Accountability",
        type: "header",
        isHeader: true
      },
      {
        id: "sec-1-1",
        text: "Has functional ownership of the solution been formally assigned?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Functional ownership includes functional accountability.",
        remarks: "Ensures clear responsibility for the security analytics solution."
      },
      {
        id: "sec-1-2",
        text: "Has technical ownership of the solution been formally assigned?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Technical ownership includes technical accountability.",
        remarks: "Ensures technical oversight and management of the security analytics solution."
      },
      {
        id: "sec-2",
        text: "Documentation",
        type: "header",
        isHeader: true
      },
      {
        id: "sec-2-1",
        text: "Has the solution been technically documented?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A technical description of the security analytics system components and configuration.",
        remarks: "Essential for maintenance and troubleshooting."
      },
      {
        id: "sec-2-2",
        text: "Has the solution been functionally documented?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A description of the EDR functional configuration (rules, alerts, thresholds, etc.).",
        remarks: "Important for understanding and configuring the EDR's operational aspects."
      },
      {
        id: "sec-3",
        text: "Personnel & Support",
        type: "header",
        isHeader: true
      },
      {
        id: "sec-3-1",
        text: "Is there dedicated personnel for support?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Dedicated personnel should be in place to ensure that support is always available. Can also be staff with outsourced provider.",
        remarks: "Ensures continuous support availability."
      },
      {
        id: "sec-3-2",
        text: "Is the personnel for support formally trained?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Training helps to jump start new hires and learn a proper way of working with the tool.",
        remarks: "Ensures competency in using the security analytics tool."
      },
      {
        id: "sec-3-3",
        text: "Is the personnel for support certified?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Certification demonstrates ability to handle the tooling properly.",
        remarks: "Enhances credibility and skill level of support personnel."
      },
      {
        id: "sec-3-4",
        text: "Is there a support contract for the solution?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A support contract may cover on-site support, support availability, response times, escalation, and full access to resources.",
        remarks: "Ensures continuous support and maintenance."
      },
      {
        id: "sec-4",
        text: "Maintenance & Configuration",
        type: "header",
        isHeader: true
      },
      {
        id: "sec-4-1",
        text: "Is the system regularly maintained?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Systems should be regularly maintained to keep up with the latest features and bug fixes.",
        remarks: "Important for system health and performance."
      },
      {
        id: "sec-4-2",
        text: "Is remote maintenance on the system managed?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Remote maintenance by a third party may be part of system maintenance procedures.",
        remarks: "Ensures timely updates and fixes."
      },
      {
        id: "sec-4-3",
        text: "Are maintenance & configuration updates executed through the change management process?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Maintenance and configuration updates should follow the formal change management process.",
        remarks: "Ensures controlled and documented changes."
      },
      {
        id: "sec-4-4",
        text: "Have you established maintenance windows?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Setting maintenance windows helps to structure the maintenance process and make it more predictable.",
        remarks: "Important for planning and minimizing disruptions."
      },
      {
        id: "sec-4-5",
        text: "Is maintenance performed using authorized and trusted tooling?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Performing maintenance with authorized and trusted tooling helps to ensure security and integrity of the system.",
        remarks: "Critical for maintaining system security."
      },
      {
        id: "sec-5",
        text: "Availability & Integrity",
        type: "header",
        isHeader: true
      },
      {
        id: "sec-5-1",
        text: "Is there high availability (HA) in place for the solution?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Can be fully implemented HA, partially implemented, hot spare, etc. May not be applicable.",
        remarks: "Ensures continuous operation and minimizes downtime."
      },
      {
        id: "sec-5-2",
        text: "Is there data backup / replication in place for the solution?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "May not be applicable to all EDR solutions.",
        remarks: "Important for data recovery and business continuity."
      },
      {
        id: "sec-5-3",
        text: "Is there configuration backup / replication in place for the solution?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Configuration synchronization could be part of a HA setup.",
        remarks: "Ensures configuration consistency and recovery."
      },
      {
        id: "sec-5-4",
        text: "Is there a Disaster Recovery plan in place for this solution?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A DR plan is required to restore service in case of catastrophic events.",
        remarks: "Critical for business continuity."
      },
      {
        id: "sec-5-5",
        text: "Is the Disaster Recovery plan regularly tested?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Testing the DR plan is required to ensure that it is complete, functional, and tasks and responsibilities for involved personnel are understood.",
        remarks: "Ensures DR plan effectiveness."
      },
      {
        id: "sec-5-6",
        text: "Is there a separate development / test environment for this solution?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A separate test environment allows for testing of new configurations before deployment in production.",
        remarks: "Important for safe and controlled updates."
      },
      {
        id: "sec-6",
        text: "Confidentiality",
        type: "header",
        isHeader: true
      },
      {
        id: "sec-6-1",
        text: "Is access to the solution limited to authorized personnel?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "The analytics system will contain confidential information and information that possibly impacts employee privacy.",
        remarks: "Ensures data security and privacy."
      },
      {
        id: "sec-6-2",
        text: "Are access rights regularly reviewed and revoked if required?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Revocation is part of normal employee termination. Special emergency revocation should be in place for suspected misuse.",
        remarks: "Important for maintaining access control."
      },
      {
        id: "sec-6-3",
        text: "Is a break glass procedure in place?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A break glass procedure and account is required to gain access to the tooling even in case of major IT outages.",
        remarks: "Critical for emergency access."
      },
      {
        id: "sec-7",
        text: "Capability",
        type: "header",
        isHeader: true
      },
      {
        id: "sec-7-1",
        text: "Specify which technological capabilities and artifacts are present and implemented:",
        type: "header",
        isHeader: true,
        remarks: "Ensures comprehensive evaluation of security analytics capabilities."
      },
      {
        id: "sec-7-1-1",
        text: "OS support",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Support for common OS's (e.g., Windows, Linux, OSX, etc.).",
        remarks: "Ensures broad compatibility.",
        isSubquestion: true
      },
      {
        id: "sec-7-1-2",
        text: "Mobile device support",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Support for mobile devices (e.g., Android, iOS).",
        remarks: "Ensures coverage for mobile endpoints.",
        isSubquestion: true
      },
      {
        id: "sec-7-1-3",
        text: "Physical, virtual & cloud deployment",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Deployment across physical and virtual devices and cloud-based workloads increases coverage and visibility.",
        remarks: "Ensures comprehensive deployment options.",
        isSubquestion: true
      },
      {
        id: "sec-7-1-4",
        text: "Vulnerability patching",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Remote patching of uncovered vulnerabilities. May be fully automated.",
        remarks: "Ensures timely vulnerability management.",
        isSubquestion: true
      },
      {
        id: "sec-7-1-5",
        text: "Forensic information preservation",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Forensic information preservation is a capability that supports security incident management and forensic investigation.",
        remarks: "Important for incident response and forensics.",
        isSubquestion: true
      },
      {
        id: "sec-7-1-6",
        text: "Historic data retention",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Historic data retention is especially important in threat hunting investigations. Multiple months of data should be retained.",
        remarks: "Ensures data availability for historical analysis.",
        isSubquestion: true
      },
      {
        id: "sec-7-1-7",
        text: "MITRE ATT&CK® identifier tagging",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Add MITRE ATT&CK® tags to rules / analytics for mapping and hunting purposes.",
        remarks: "Enhances threat intelligence and mapping.",
        isSubquestion: true
      },
      {
        id: "sec-7-1-8",
        text: "Memory analysis",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Analysis of endpoint memory.",
        remarks: "Important for in-depth threat analysis.",
        isSubquestion: true
      },
      {
        id: "sec-7-1-9",
        text: "Correlation",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Correlation of events with previously detected events or detection rules.",
        remarks: "Enhances threat detection capabilities.",
        isSubquestion: true
      },
      {
        id: "sec-7-2",
        text: "Prevention Capabilities",
        type: "header",
        isHeader: true
      },
      {
        id: "sec-7-2-1",
        text: "Exploit prevention",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Prevention of exploits being executed on the system.",
        remarks: "Enhances system security.",
        isSubquestion: true
      },
      {
        id: "sec-7-2-2",
        text: "Fileless malware protection",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Protection against malware running only in memory.",
        remarks: "Enhances protection against advanced threats.",
        isSubquestion: true
      },
      {
        id: "sec-7-2-3",
        text: "Application allowlisting",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Prevention of running unauthorized applications by means of allow listing.",
        remarks: "Enhances control over application execution.",
        isSubquestion: true
      },
      {
        id: "sec-7-2-4",
        text: "Ransomware protection",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Protection against ransomware, for example with the use of controlled access to sensitive files and folders.",
        remarks: "Enhances protection against ransomware attacks.",
        isSubquestion: true
      },
      {
        id: "sec-7-2-5",
        text: "Attack surface reduction",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Attack surface reduction can be used to decrease the likelihood of compromise.",
        remarks: "Enhances overall system security.",
        isSubquestion: true
      },
      {
        id: "sec-7-3",
        text: "Detection Capabilities",
        type: "header",
        isHeader: true
      },
      {
        id: "sec-7-3-1",
        text: "Vulnerability detection",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Detection of vulnerabilities on the local endpoint.",
        remarks: "Enhances vulnerability management.",
        isSubquestion: true
      },
      {
        id: "sec-7-3-2",
        text: "Process execution monitoring",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Detection of execution of potentially malicious processes and scripts.",
        remarks: "Enhances detection of malicious activities.",
        isSubquestion: true
      },
      {
        id: "sec-7-3-3",
        text: "File system monitoring",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Detection of file creation, deletion, and or modification (including encryption).",
        remarks: "Enhances file integrity monitoring.",
        isSubquestion: true
      },
      {
        id: "sec-7-3-4",
        text: "Task & service monitoring",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Detection of creation or modification of services and scheduled tasks.",
        remarks: "Enhances monitoring of system changes.",
        isSubquestion: true
      },
      {
        id: "sec-7-3-5",
        text: "Network connection monitoring",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Detection of potentially malicious network traffic.",
        remarks: "Enhances network security monitoring.",
        isSubquestion: true
      },
      {
        id: "sec-7-3-6",
        text: "Registry monitoring",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Detection of modifications to the system registry.",
        remarks: "Enhances system integrity monitoring.",
        isSubquestion: true
      },
      {
        id: "sec-7-3-7",
        text: "User activity monitoring",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Detection of user activity, including logon and logoff.",
        remarks: "Enhances user behavior monitoring.",
        isSubquestion: true
      },
      {
        id: "sec-7-3-8",
        text: "Configuration monitoring",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Detection of unauthorized changes to the local endpoint configuration, including modifications to registry, files, services, tasks, drivers, etc.",
        remarks: "Enhances configuration integrity monitoring.",
        isSubquestion: true
      },
      {
        id: "sec-7-3-9",
        text: "Air-gapped endpoint monitoring",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Monitoring capabilities for endpoints not connected to the corporate network.",
        remarks: "Enhances monitoring of isolated endpoints.",
        isSubquestion: true
      },
      {
        id: "sec-7-3-10",
        text: "File reputation service",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Detection of potentially malicious files using an (online) file reputation service.",
        remarks: "Enhances file threat detection.",
        isSubquestion: true
      },
      {
        id: "sec-7-3-11",
        text: "Deception techniques",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Detection of adversaries by employing deception techniques (such as honey tokens) on endpoints.",
        remarks: "Enhances threat detection capabilities.",
        isSubquestion: true
      },
      {
        id: "sec-7-4",
        text: "Remediation Capabilities",
        type: "header",
        isHeader: true
      },
      {
        id: "sec-7-4-1",
        text: "URL filtering / blocking",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Block traffic to specific URLs.",
        remarks: "Enhances web traffic control.",
        isSubquestion: true
      },
      {
        id: "sec-7-4-2",
        text: "Web content filtering",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Block specific web content.",
        remarks: "Enhances control over web content.",
        isSubquestion: true
      },
      {
        id: "sec-7-4-3",
        text: "Machine isolation",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Isolate a machine from the network.",
        remarks: "Enhances containment of compromised machines.",
        isSubquestion: true
      },
      {
        id: "sec-7-4-4",
        text: "Process termination / suspension",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Terminate or suspend a running process.",
        remarks: "Enhances control over malicious processes.",
        isSubquestion: true
      },
      {
        id: "sec-7-4-5",
        text: "File / registry key deletion",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Delete local files or registry keys (in case of Windows).",
        remarks: "Enhances removal of malicious artifacts.",
        isSubquestion: true
      },
      {
        id: "sec-7-4-6",
        text: "Forced user logoff",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Force a user to log off to terminate any user-associated processes.",
        remarks: "Enhances control over user sessions.",
        isSubquestion: true
      },
      {
        id: "sec-7-5",
        text: "Integrations",
        type: "header",
        isHeader: true
      },
      {
        id: "sec-7-5-1",
        text: "Threat Intelligence integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Integration of threat intelligence information (observables / IoCs) into the EDR tooling for reputation-based monitoring.",
        remarks: "Enhances threat detection capabilities.",
        isSubquestion: true
      },
      {
        id: "sec-7-5-2",
        text: "Vulnerability intelligence integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Integration of vulnerability intelligence information into the EDR for vulnerability monitoring purposes.",
        remarks: "Enhances vulnerability management.",
        isSubquestion: true
      },
      {
        id: "sec-7-5-3",
        text: "Threat hunting integration - TTPs",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Integration of the tooling into the threat hunting process to support threat hunting investigations on the TTP level.",
        remarks: "Enhances threat hunting capabilities.",
        isSubquestion: true
      },
      {
        id: "sec-7-5-4",
        text: "Threat hunting integration - Tools & artifacts",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Integration of the tooling into the threat hunting process to support threat hunting investigations on the Tools & artifacts level.",
        remarks: "Enhances threat hunting capabilities.",
        isSubquestion: true
      },
      {
        id: "sec-7-5-5",
        text: "Threat hunting integration - Technical indicators",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Integration of the tooling into the threat hunting process to support threat hunting investigations on the indicator level (IP, domain, hash).",
        remarks: "Enhances threat hunting capabilities.",
        isSubquestion: true
      },
      {
        id: "sec-7-5-6",
        text: "Security incident management integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Integration of the security incident management process to support incident investigation.",
        remarks: "Enhances incident response capabilities.",
        isSubquestion: true
      },
      {
        id: "sec-7-5-7",
        text: "SIEM integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Integration with the SIEM tooling for centralized correlation.",
        remarks: "Enhances overall security monitoring capabilities.",
        isSubquestion: true
      },
      {
        id: "sec-7-5-8",
        text: "Malware sandbox integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Detonate potential malware samples in a sandbox environment.",
        remarks: "Enhances malware analysis capabilities.",
        isSubquestion: true
      },
      {
        id: "sec-7-6",
        text: "Rule-based Detection",
        type: "header",
        isHeader: true
      },
      {
        id: "sec-7-6-1",
        text: "Online signature-based detection",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Signature-based malware detection requiring an active internet connection.",
        remarks: "Enhances malware detection capabilities.",
        isSubquestion: true
      },
      {
        id: "sec-7-6-2",
        text: "Offline signature-based detection",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Signature-based malware detection not requiring an active internet connection.",
        remarks: "Enhances malware detection capabilities in offline environments.",
        isSubquestion: true
      },
      {
        id: "sec-7-6-3",
        text: "Custom rules",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Creation of custom rules for the detection of specific Indicators of Attack.",
        remarks: "Enhances tailored threat detection capabilities.",
        isSubquestion: true
      },
      {
        id: "sec-7-7",
        text: "Anomaly Detection",
        type: "header",
        isHeader: true
      },
      {
        id: "sec-7-7-1",
        text: "Behavioral detection",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Detection of potentially malicious behavior using machine learning technologies.",
        remarks: "Enhances detection of sophisticated threats.",
        isSubquestion: true
      },
      {
        id: "sec-7-8",
        text: "Visualization & Output",
        type: "header",
        isHeader: true
      },
      {
        id: "sec-7-8-1",
        text: "Reporting",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Custom reports for SOC customers and SOC analysts.",
        remarks: "Enhances reporting capabilities.",
        isSubquestion: true
      },
      {
        id: "sec-7-8-2",
        text: "Dashboards",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Custom dashboards used by analysts and managers.",
        remarks: "Enhances data visualization.",
        isSubquestion: true
      },
      {
        id: "sec-7-8-3",
        text: "Data visualization techniques",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Graphing capabilities to support analysis.",
        remarks: "Enhances data analysis.",
        isSubquestion: true
      },
      {
        id: "sec-7-8-4",
        text: "Data drilldowns",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Drilldowns on graphs to quickly 'zoom in' on details of visual anomalies.",
        remarks: "Enhances detailed analysis.",
        isSubquestion: true
      },
      {
        id: "sec-7-8-5",
        text: "Central analysis console",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A central console used by SOC analysts.",
        remarks: "Enhances centralized monitoring.",
        isSubquestion: true
      },
      {
        id: "sec-7-8-6",
        text: "Advanced searching and querying",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Searching capabilities that support finding specific information based on characteristics, especially useful for endpoint threat hunting.",
        remarks: "Enhances data querying.",
        isSubquestion: true
      },
      {
        id: "sec-7-completeness",
        text: "Completeness",
        type: "completeness",
        isSubquestion: true
      },
      {
        id: "sec-7-9",
        text: "Comments and/or Remarks",
        type: "text",
        guidance: "Space to provide any relevant context or any additional comments."
      }
    ]
  },
  "automation_orchestration_tooling": {
    name: "Automation & Orchestration Tooling",
    questions: [
      {
        id: "auto-1",
        text: "Accountability",
        type: "header",
        isHeader: true
      },
      {
        id: "auto-1-1",
        text: "Has functional ownership of the solution been formally assigned?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Functional ownership includes functional accountability.",
        remarks: "Ensures clear responsibility for the automation & orchestration solution."
      },
      {
        id: "auto-1-2",
        text: "Has technical ownership of the solution been formally assigned?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Technical ownership includes technical accountability.",
        remarks: "Ensures technical oversight and management of the automation & orchestration solution."
      },
      {
        id: "auto-2",
        text: "Documentation",
        type: "header",
        isHeader: true
      },
      {
        id: "auto-2-1",
        text: "Has the solution been technically documented?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A technical description of the automation & orchestration system components and configuration.",
        remarks: "Essential for maintenance and troubleshooting."
      },
      {
        id: "auto-2-2",
        text: "Has the solution been functionally documented?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A description of the automation & orchestration system functional configuration (workflows, integrations, etc.).",
        remarks: "Important for understanding and configuring the system's operational aspects."
      },
      {
        id: "auto-3",
        text: "Personnel & Support",
        type: "header",
        isHeader: true
      },
      {
        id: "auto-3-1",
        text: "Is there dedicated personnel for support?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Dedicated personnel should be in place to ensure that support is always available. Can also be staff with outsourced provider.",
        remarks: "Ensures continuous support availability."
      },
      {
        id: "auto-3-2",
        text: "Is the personnel for support formally trained?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Training helps to jump-start new hires and learn a proper way of working with the tool.",
        remarks: "Ensures competency in using the automation & orchestration tool."
      },
      {
        id: "auto-3-3",
        text: "Is the personnel for support certified?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Certification demonstrates ability to handle the tooling properly.",
        remarks: "Enhances credibility and skill level of support personnel."
      },
      {
        id: "auto-3-4",
        text: "Is there a support contract for the solution?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A support contract may cover on-site support, support availability, response times, escalation, and full access to resources.",
        remarks: "Ensures continuous support and maintenance."
      },
      {
        id: "auto-4",
        text: "Maintenance & Configuration",
        type: "header",
        isHeader: true
      },
      {
        id: "auto-4-1",
        text: "Is the system regularly maintained?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Systems should be regularly maintained to keep up with the latest features and bug fixes.",
        remarks: "Important for system health and performance."
      },
      {
        id: "auto-4-2",
        text: "Is remote maintenance on the system managed?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Remote maintenance by a third party may be part of system maintenance procedures.",
        remarks: "Ensures timely updates and fixes."
      },
      {
        id: "auto-4-3",
        text: "Are maintenance & configuration updates executed through the change management process?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Maintenance and configuration updates should follow the formal change management process.",
        remarks: "Ensures controlled and documented changes."
      },
      {
        id: "auto-4-4",
        text: "Have you established maintenance windows?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Setting maintenance windows helps to structure the maintenance process and make it more predictable.",
        remarks: "Important for planning and minimizing disruptions."
      },
      {
        id: "auto-4-5",
        text: "Is maintenance performed using authorized and trusted tooling?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Performing maintenance with authorized and trusted tooling helps to ensure security and integrity of the system.",
        remarks: "Critical for maintaining system security."
      },
      {
        id: "auto-5",
        text: "Availability & Integrity",
        type: "header",
        isHeader: true
      },
      {
        id: "auto-5-1",
        text: "Is there high availability (HA) in place for the solution?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Can be fully implemented HA, partially implemented, hot spare, etc.",
        remarks: "Ensures continuous operation and minimizes downtime."
      },
      {
        id: "auto-5-2",
        text: "Is there data backup / replication in place for the solution?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "May not be required for this particular solution.",
        remarks: "Important for data recovery and business continuity."
      },
      {
        id: "auto-5-3",
        text: "Is there configuration backup / replication in place for the solution?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Configuration synchronization could be part of a HA setup.",
        remarks: "Ensures configuration consistency and recovery."
      },
      {
        id: "auto-5-4",
        text: "Is there a Disaster Recovery plan in place for this solution?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A DR plan is required to restore service in case of catastrophic events.",
        remarks: "Critical for business continuity."
      },
      {
        id: "auto-5-5",
        text: "Is the Disaster Recovery plan regularly tested?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Testing the DR plan is required to ensure that it is complete, functional, and tasks and responsibilities for involved personnel are understood.",
        remarks: "Ensures DR plan effectiveness."
      },
      {
        id: "auto-5-6",
        text: "Is there a separate development / test environment for this solution?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A separate test environment allows for testing of new configurations before deployment in production.",
        remarks: "Important for safe and controlled updates."
      },
      {
        id: "auto-6",
        text: "Confidentiality",
        type: "header",
        isHeader: true
      },
      {
        id: "auto-6-1",
        text: "Is access to the solution limited to authorized personnel?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "The automation system may have automated actions that can impact the usage of systems and should be restricted.",
        remarks: "Ensures data security and privacy."
      },
      {
        id: "auto-6-2",
        text: "Are access rights regularly reviewed and revoked if required?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Revocation is part of normal employee termination. Special emergency revocation should be in place for suspected misuse.",
        remarks: "Important for maintaining access control."
      },
      {
        id: "auto-6-3",
        text: "Is a break glass procedure in place?",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A break glass procedure and account is required to gain access to the tooling even in case of major IT outages.",
        remarks: "Critical for emergency access."
      },
      {
        id: "auto-7",
        text: "Capability",
        type: "header",
        isHeader: true
      },
      {
        id: "auto-7-1",
        text: "Specify which technological capabilities and artifacts are present and implemented:",
        type: "header",
        isHeader: true,
        remarks: "Ensures comprehensive evaluation of automation & orchestration capabilities."
      },
      {
        id: "auto-7-1-1",
        text: "Historical event matching",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Contextualize potential incidents using similar historical events.",
        remarks: "Enhances incident response capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-1-2",
        text: "Risk-based event prioritization",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Risk-based prioritization of security events using contextualized information.",
        remarks: "Enhances incident prioritization capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-1-3",
        text: "Ticket workflow support",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Automated ticket creation and workflow support.",
        remarks: "Enhances incident management capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-2",
        text: "Data Integrations",
        type: "header",
        isHeader: true
      },
      {
        id: "auto-7-2-1",
        text: "SIEM data integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "The automation & orchestration tool receives events from the SIEM system.",
        remarks: "Enhances incident correlation capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-2-2",
        text: "Threat intelligence integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Contextualize potential incidents using threat intelligence.",
        remarks: "Enhances threat detection capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-2-3",
        text: "Asset context integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Contextualize potential incidents using asset information.",
        remarks: "Enhances asset-based incident response capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-2-4",
        text: "Identity context integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Contextualize potential incidents using user information.",
        remarks: "Enhances user-based incident response capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-2-5",
        text: "Vulnerability management integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Contextualize potential incidents using vulnerability management information.",
        remarks: "Enhances vulnerability management capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-3",
        text: "Response Integrations",
        type: "header",
        isHeader: true
      },
      {
        id: "auto-7-3-1",
        text: "Firewall integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Automated remediation by blocking attackers on the firewall.",
        remarks: "Enhances network security capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-3-2",
        text: "NDR integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Automated remediation by blocking attackers in the network.",
        remarks: "Enhances network threat response capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-3-3",
        text: "EDR integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Automated remediation by blocking attackers on the endpoint.",
        remarks: "Enhances endpoint threat response capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-3-4",
        text: "Email protection integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Automated remediation by blocking email senders.",
        remarks: "Enhances email security capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-3-5",
        text: "Malware protection integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Automated remediation by quarantining malware and scanning endpoints for malware threats.",
        remarks: "Enhances malware protection capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-3-6",
        text: "Sandbox integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Automated delivery of malware samples to sandbox environments for extensive analysis.",
        remarks: "Enhances malware analysis capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-3-7",
        text: "Active Directory / IAM integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Automated locking and suspension of user accounts or revocation of access rights based on event outcome.",
        remarks: "Enhances identity and access management capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-3-8",
        text: "SIEM integration",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Querying SIEM to obtain information for ticket context or automated triage.",
        remarks: "Enhances incident correlation capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-4",
        text: "Playbooks",
        type: "header",
        isHeader: true
      },
      {
        id: "auto-7-4-1",
        text: "Standard playbooks",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Application of standard (out of the box) response playbooks in the SOAR.",
        remarks: "Enhances standardized incident response capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-4-2",
        text: "Customized playbooks",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Application of customized and fully response customized playbooks in the SOAR.",
        remarks: "Enhances tailored incident response capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-4-3",
        text: "Playbook automation",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Application of automation in playbooks.",
        remarks: "Enhances automated incident response capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-4-4",
        text: "Playbook development process",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "A development, refinement, and lifecycle management process for SOC playbooks for usage in SOAR.",
        remarks: "Enhances playbook management capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-5",
        text: "Visualization & Output",
        type: "header",
        isHeader: true
      },
      {
        id: "auto-7-5-1",
        text: "Reporting",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Custom reports for SOC customers and SOC analysts.",
        remarks: "Enhances reporting capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-5-2",
        text: "Dashboards",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Custom dashboards used by analysts and managers.",
        remarks: "Enhances data visualization capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-5-3",
        text: "Performance tracking",
        type: "dropdown",
        options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
        guidance: "Application of KPIs and metrics to ticket workflow.",
        remarks: "Enhances performance monitoring capabilities.",
        isSubquestion: true
      },
      {
        id: "auto-7-completeness",
        text: "Completeness",
        type: "completeness",
        isSubquestion: true
      },
      {
        id: "auto-7-6",
        text: "Comments and/or Remarks",
        type: "text",
        guidance: "Space to provide any relevant context or any additional comments."
      }
    ]
  }
    }
  },
  "services": {
    name: "Services",
    subdomains: {
      "security_monitoring": {
        name: "Security Monitoring",
        questions: [
          {
            id: "serv-1",
            text: "Security Monitoring",
            type: "header",
            isHeader: true
          },
          {
            id: "serv-1-1",
            text: "Have you formally described the security monitoring service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "A service description should be in place.",
            remarks: "Ensures clear understanding of the service scope and objectives."
          },
          {
            id: "serv-1-2",
            text: "Please specify elements of the security monitoring service document:",
            type: "header",
            isHeader: true
          },
          {
            id: "serv-1-2-1",
            text: "Key performance indicators",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Indicators to establish the performance of the service.",
            remarks: "Helps in measuring the effectiveness of the service.",
            isSubquestion: true
          },
          {
            id: "serv-1-2-2",
            text: "Quality indicators",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Indicators to establish the quality of service delivery.",
            remarks: "Helps in assessing the service quality.",
            isSubquestion: true
          },
          {
            id: "serv-1-2-3",
            text: "Service dependencies",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "A clear understanding of which people/process/technologies are required for adequate service delivery.",
            remarks: "Ensures all necessary components are considered.",
            isSubquestion: true
          },
          {
            id: "serv-1-2-4",
            text: "Service levels",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Agreements on minimum performance, capacity, availability, etc.",
            remarks: "Sets expectations for service delivery.",
            isSubquestion: true
          },
          {
            id: "serv-1-2-5",
            text: "Hours of operation",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "The operational hours for this service (e.g., 24/7).",
            remarks: "Defines the service availability.",
            isSubquestion: true
          },
          {
            id: "serv-1-2-6",
            text: "Service customers and stakeholders",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "The customers and stakeholders for this service (e.g., IT management).",
            remarks: "Identifies who benefits from the service.",
            isSubquestion: true
          },
          {
            id: "serv-1-2-7",
            text: "Purpose",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "The purpose and objectives for this service.",
            remarks: "Clarifies the intent of the service.",
            isSubquestion: true
          },
          {
            id: "serv-1-2-8",
            text: "Service input / triggers",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "The service input: what triggers this service to run?",
            remarks: "Defines the conditions under which the service operates.",
            isSubquestion: true
          },
          {
            id: "serv-1-2-9",
            text: "Service output / deliverables",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "The service output: what does the service deliver? Can be tangible (e.g., reports) or intangible (e.g., situational awareness).",
            remarks: "Specifies the outcomes of the service.",
            isSubquestion: true
          },
          {
            id: "serv-1-2-10",
            text: "Service activities",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Which activities are carried out within the scope of the service?",
            remarks: "Details the actions performed as part of the service.",
            isSubquestion: true
          },
          {
            id: "serv-1-2-11",
            text: "Service roles & responsibilities",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Which roles and responsibilities apply to this service?",
            remarks: "Defines the roles involved in service delivery.",
            isSubquestion: true
          },
          {
            id: "serv-1-3",
            text: "Is the service measured for quality?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Are the quality indicators from the previous questions used for reporting on the service?",
            remarks: "Ensures the service quality is tracked and reported."
          },
          {
            id: "serv-1-4",
            text: "Is the service measured for service delivery in accordance with service levels?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Service levels should be used to formally commit the SOC to service delivery.",
            remarks: "Ensures service delivery meets agreed standards."
          },
          {
            id: "serv-1-5",
            text: "Are customers and/or stakeholders regularly updated about the service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Changes to the service scope, delivery, etc.",
            remarks: "Keeps stakeholders informed about service changes."
          },
          {
            id: "serv-1-6",
            text: "Is there a contractual agreement between the SOC and the customers?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Contractual agreements should also cover penalties.",
            remarks: "Formalizes the service agreement and expectations."
          },
          {
            id: "serv-1-7",
            text: "Is sufficient personnel allocated to the process to ensure required service delivery?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Allocation of dedicated personnel will ensure highest service quality.",
            remarks: "Ensures adequate staffing for service delivery."
          },
          {
            id: "serv-1-8",
            text: "Is the service aligned with other relevant processes?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "e.g., alignment with configuration management, incident management, etc.",
            remarks: "Ensures the service integrates well with other processes."
          },
          {
            id: "serv-1-9",
            text: "Is there an incident resolution / service continuity process in place for this service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Service continuity is important to comply with contractual agreements, even in case of major incidents.",
            remarks: "Ensures service continuity during incidents."
          },
          {
            id: "serv-1-10",
            text: "Has a set of procedures been created for this service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Procedures support process standardization and quality. Personnel should be trained to use procedures correctly and structurally.",
            remarks: "Ensures standardized service delivery."
          },
          {
            id: "serv-1-11",
            text: "Is there an onboarding and offboarding procedure for this service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Customer onboarding and offboarding procedures support efficient service delivery and ensure customers are (dis)connected properly.",
            remarks: "Ensures smooth customer transitions."
          },
          {
            id: "serv-1-12",
            text: "Are best practices applied to the service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Best practices should be used to optimize this service.",
            remarks: "Ensures the service follows industry best practices."
          },
          {
            id: "serv-1-13",
            text: "Are use cases used in the security monitoring service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "e.g., user login brute-force, denial of service, non-compliance, etc.",
            remarks: "Helps in understanding and addressing specific scenarios."
          },
          {
            id: "serv-1-14",
            text: "Is process data gathered for prediction of service performance?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Service performance measurement requires establishment of performance goals.",
            remarks: "Ensures data-driven performance predictions."
          },
          {
            id: "serv-1-15",
            text: "Is the service continuously being improved based on improvement goals?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Improvement based on evaluation, assessment, tests, etc.",
            remarks: "Ensures continuous service improvement."
          },
          {
            id: "serv-1-16",
            text: "Please specify capabilities of the security monitoring service:",
            type: "header",
            isHeader: true
          },
          {
            id: "serv-1-16-1",
            text: "Early detection",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to detect incidents in an early stage.",
            remarks: "Enhances incident response capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-2",
            text: "Intrusion detection",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to detect intrusion attempts.",
            remarks: "Enhances security monitoring capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-3",
            text: "Exfiltration detection",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to detect information leaving the organization.",
            remarks: "Enhances data protection capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-4",
            text: "Subtle event detection",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to detect slight changes in systems, applications, or network that may indicate malicious behavior.",
            remarks: "Enhances early threat detection capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-5",
            text: "Malware detection",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to detect malware in the infrastructure.",
            remarks: "Enhances malware protection capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-6",
            text: "Anomaly detection",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to detect anomalies.",
            remarks: "Enhances threat detection capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-7",
            text: "Real-time detection",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Can also be near real-time (e.g., 15 minutes delay).",
            remarks: "Enhances real-time threat detection capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-8",
            text: "Alerting & notification",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to automatically send alerts for all security monitoring components.",
            remarks: "Enhances incident response capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-9",
            text: "False-positive reduction",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "A process for reducing the amount of false-positives.",
            remarks: "Enhances alert accuracy.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-10",
            text: "Continuous tuning",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "A continuous tuning process for the correlation rules.",
            remarks: "Ensures ongoing improvement of detection capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-11",
            text: "Coverage management",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Coverage indicates how well the service covers the assets in your environment.",
            remarks: "Ensures comprehensive monitoring.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-12",
            text: "Status monitoring",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Monitoring of the status of the system.",
            remarks: "Ensures system health and availability.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-13",
            text: "Perimeter monitoring",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Monitoring of the network perimeter for attempted intrusions and exfiltration.",
            remarks: "Enhances network security monitoring.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-14",
            text: "Host monitoring",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Monitoring of endpoints in the networks (servers, clients, etc.).",
            remarks: "Enhances endpoint security monitoring.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-15",
            text: "Network & traffic monitoring",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Monitoring of network and traffic flows and anomalies.",
            remarks: "Enhances network traffic monitoring.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-16",
            text: "Access & usage monitoring",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Monitoring of access attempts.",
            remarks: "Enhances access control monitoring.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-17",
            text: "User / identity monitoring",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Monitoring of user actions.",
            remarks: "Enhances user behavior monitoring.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-18",
            text: "Application & service monitoring",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Monitoring of applications & services.",
            remarks: "Enhances application and service monitoring.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-19",
            text: "Behavior monitoring",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Monitoring of behavior against baselines (can be host, network, and user behavior).",
            remarks: "Enhances behavior monitoring capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-20",
            text: "Database monitoring",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Monitoring of databases.",
            remarks: "Enhances database security monitoring.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-21",
            text: "Data loss monitoring",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Monitoring for loss of information.",
            remarks: "Enhances data protection capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-22",
            text: "Device loss / theft monitoring",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Monitoring for loss or theft of company assets.",
            remarks: "Enhances asset protection capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-23",
            text: "Third-party monitoring",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Monitoring of trusted third-parties to detect possible breach attempts through the supply chain.",
            remarks: "Enhances supply chain security monitoring.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-24",
            text: "Physical environment monitoring",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Monitoring of the physical environment to detect cyber security incidents.",
            remarks: "Enhances physical security monitoring.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-25",
            text: "Cloud monitoring",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Monitoring of private and public cloud environments: SAAS, IAAS, and PAAS.",
            remarks: "Enhances cloud security monitoring.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-26",
            text: "Mobile device monitoring",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Monitoring of corporate-owned mobile devices or mobile devices containing corporate information.",
            remarks: "Enhances mobile device security monitoring.",
            isSubquestion: true
          },
          {
            id: "serv-1-16-27",
            text: "OT monitoring",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Monitoring of Operational Technology environments, including ICS, SCADA, DCS, and PLC systems.",
            remarks: "Enhances OT security monitoring.",
            isSubquestion: true
          },
          {
            id: "serv-1-17",
            text: "Specify rationale for chosen values or any additional comments",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments.",
            remarks: "Use this outcome to determine the score for 1.2."
          },
          {
            id: "serv-2",
            text: "Security Incident Management",
            type: "header",
            isHeader: true
          },
          {
            id: "serv-2-1",
            text: "Have you formally described the security incident management service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "A service description should be in place.",
            remarks: "Ensures clear understanding of the service scope and objectives."
          },
          {
            id: "serv-2-2",
            text: "Please specify elements of the security incident management service document:",
            type: "header",
            isHeader: true
          },
          {
            id: "serv-2-2-1",
            text: "Key performance indicators",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Indicators to establish the performance of the service.",
            remarks: "Helps in measuring the effectiveness of the service.",
            isSubquestion: true
          },
          {
            id: "serv-2-2-2",
            text: "Quality indicators",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Indicators to establish the quality of service delivery.",
            remarks: "Helps in assessing the service quality.",
            isSubquestion: true
          },
          {
            id: "serv-2-2-3",
            text: "Service dependencies",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "A clear understanding of which people/process/technologies are required for adequate service delivery.",
            remarks: "Ensures all necessary components are considered.",
            isSubquestion: true
          },
          {
            id: "serv-2-2-4",
            text: "Service levels",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Agreements on minimum performance, capacity, availability, etc.",
            remarks: "Sets expectations for service delivery.",
            isSubquestion: true
          },
          {
            id: "serv-2-2-5",
            text: "Hours of operation",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "The operational hours for this service (e.g., 24/7).",
            remarks: "Defines the service availability.",
            isSubquestion: true
          },
          {
            id: "serv-2-2-6",
            text: "Service customers and stakeholders",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "The customers and stakeholders for this service (e.g., IT management).",
            remarks: "Identifies who benefits from the service.",
            isSubquestion: true
          },
          {
            id: "serv-2-2-7",
            text: "Purpose",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "The purpose and objectives for this service.",
            remarks: "Clarifies the intent of the service.",
            isSubquestion: true
          },
          {
            id: "serv-2-2-8",
            text: "Service input / triggers",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "The service input: what triggers this service to run?",
            remarks: "Defines the conditions under which the service operates.",
            isSubquestion: true
          },
          {
            id: "serv-2-2-9",
            text: "Service output / deliverables",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "The service output: what does the service deliver? Can be tangible (e.g., reports) or intangible (e.g., situational awareness).",
            remarks: "Specifies the outcomes of the service.",
            isSubquestion: true
          },
          {
            id: "serv-2-2-10",
            text: "Service activities",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Which activities are carried out within the scope of the service?",
            remarks: "Details the actions performed as part of the service.",
            isSubquestion: true
          },
          {
            id: "serv-2-2-11",
            text: "Service roles & responsibilities",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Which roles and responsibilities apply to this service?",
            remarks: "Defines the roles involved in service delivery.",
            isSubquestion: true
          },
          {
            id: "serv-2-3",
            text: "Is the service measured for quality?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Are the quality indicators from the previous questions used for reporting on the service?",
            remarks: "Ensures the service quality is tracked and reported."
          },
          {
            id: "serv-2-4",
            text: "Is the service measured for service delivery in accordance with service levels?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Service levels should be used to formally commit the SOC to service delivery.",
            remarks: "Ensures service delivery meets agreed standards."
          },
          {
            id: "serv-2-5",
            text: "Are customers and/or stakeholders regularly updated about the service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Changes to the service scope, delivery, etc.",
            remarks: "Keeps stakeholders informed about service changes."
          },
          {
            id: "serv-2-6",
            text: "Is there a contractual agreement between the SOC and the customers?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Contractual agreements should also cover penalties.",
            remarks: "Formalizes the service agreement and expectations."
          },
          {
            id: "serv-2-7",
            text: "Is sufficient personnel allocated to the process to ensure required service delivery?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Allocation of dedicated personnel will ensure highest service quality.",
            remarks: "Ensures adequate staffing for service delivery."
          },
          {
            id: "serv-2-8",
            text: "Is the service aligned with other relevant processes?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "e.g., alignment with configuration management, incident management, etc.",
            remarks: "Ensures the service integrates well with other processes."
          },
          {
            id: "serv-2-9",
            text: "Is there an incident resolution / service continuity process in place for this service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Service continuity is important to comply with contractual agreements, even in case of major incidents.",
            remarks: "Ensures service continuity during incidents."
          },
          {
            id: "serv-2-10",
            text: "Has a set of procedures been created for this service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Procedures support process standardization and quality. Personnel should be trained to use procedures correctly and structurally.",
            remarks: "Ensures standardized service delivery."
          },
          {
            id: "serv-2-11",
            text: "Is there an onboarding and offboarding procedure for this service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Customer onboarding and offboarding procedures support efficient service delivery and ensure customers are (dis)connected properly.",
            remarks: "Ensures smooth customer transitions."
          },
          {
            id: "serv-2-12",
            text: "Are best practices applied to the service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Best practices should be used to optimize this service.",
            remarks: "Ensures the service follows industry best practices."
          },
          {
            id: "serv-2-13",
            text: "Are use cases used in the security incident management service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "e.g., user login brute-force, denial of service, non-compliance, etc.",
            remarks: "Helps in understanding and addressing specific scenarios."
          },
          {
            id: "serv-2-14",
            text: "Is process data gathered for prediction of service performance?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Service performance measurement requires establishment of performance goals.",
            remarks: "Ensures data-driven performance predictions."
          },
          {
            id: "serv-2-15",
            text: "Is the service continuously being improved based on improvement goals?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Improvement based on evaluation, assessment, tests, etc.",
            remarks: "Ensures continuous service improvement."
          },
          {
            id: "serv-2-16",
            text: "Please specify capabilities of the security incident management service:",
            type: "header",
            isHeader: true
          },
          {
            id: "serv-2-16-1",
            text: "Incident detection",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to detect security incidents.",
            remarks: "Enhances incident detection capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-2-16-2",
            text: "Incident response",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to respond to security incidents.",
            remarks: "Enhances incident response capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-2-16-3",
            text: "Incident containment",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to contain security incidents.",
            remarks: "Enhances incident containment capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-2-16-4",
            text: "Incident eradication",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to eradicate security incidents.",
            remarks: "Enhances incident eradication capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-2-16-5",
            text: "Incident recovery",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to recover from security incidents.",
            remarks: "Enhances incident recovery capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-2-16-6",
            text: "Incident forensics",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to perform forensic analysis on security incidents.",
            remarks: "Enhances incident forensics capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-2-16-7",
            text: "Incident reporting",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to report on security incidents.",
            remarks: "Enhances incident reporting capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-2-16-8",
            text: "Incident documentation",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to document security incidents.",
            remarks: "Enhances incident documentation capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-2-16-9",
            text: "Incident tracking",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to track security incidents.",
            remarks: "Enhances incident tracking capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-2-16-10",
            text: "Incident correlation",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to correlate security incidents with other events.",
            remarks: "Enhances incident correlation capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-2-16-11",
            text: "Incident escalation",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to escalate security incidents to higher authorities.",
            remarks: "Enhances incident escalation capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-2-16-12",
            text: "Incident communication",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to communicate about security incidents with stakeholders.",
            remarks: "Enhances incident communication capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-2-16-13",
            text: "Incident closure",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to close security incidents.",
            remarks: "Enhances incident closure capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-2-16-14",
            text: "Incident lessons learned",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to document lessons learned from security incidents.",
            remarks: "Enhances continuous improvement of incident management.",
            isSubquestion: true
          },
          {
            id: "serv-2-17",
            text: "Specify rationale for chosen values or any additional comments",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments.",
            remarks: "Use this outcome to determine the score for 1.2."
          },
          {
            id: "serv-3",
            text: "Security Analysis & Forensics",
            type: "header",
            isHeader: true
          },
          {
            id: "serv-3-1",
            text: "Have you formally described the security analysis & forensics service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "A service description should be in place.",
            remarks: "Ensures clear understanding of the service scope and objectives."
          },
          {
            id: "serv-3-2",
            text: "Please specify elements of the security analysis & forensics service document:",
            type: "header",
            isHeader: true
          },
          {
            id: "serv-3-2-1",
            text: "Key performance indicators",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Indicators to establish the performance of the service.",
            remarks: "Helps in measuring the effectiveness of the service.",
            isSubquestion: true
          },
          {
            id: "serv-3-2-2",
            text: "Quality indicators",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Indicators to establish the quality of service delivery.",
            remarks: "Helps in assessing the service quality.",
            isSubquestion: true
          },
          {
            id: "serv-3-2-3",
            text: "Service dependencies",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "A clear understanding of which people/process/technologies are required for adequate service delivery.",
            remarks: "Ensures all necessary components are considered.",
            isSubquestion: true
          },
          {
            id: "serv-3-2-4",
            text: "Service levels",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Agreements on minimum performance, capacity, availability, etc.",
            remarks: "Sets expectations for service delivery.",
            isSubquestion: true
          },
          {
            id: "serv-3-2-5",
            text: "Hours of operation",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "The operational hours for this service (e.g., 24/7).",
            remarks: "Defines the service availability.",
            isSubquestion: true
          },
          {
            id: "serv-3-2-6",
            text: "Service customers and stakeholders",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "The customers and stakeholders for this service (e.g., IT management).",
            remarks: "Identifies who benefits from the service.",
            isSubquestion: true
          },
          {
            id: "serv-3-2-7",
            text: "Purpose",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "The purpose and objectives for this service.",
            remarks: "Clarifies the intent of the service.",
            isSubquestion: true
          },
          {
            id: "serv-3-2-8",
            text: "Service input / triggers",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "The service input: what triggers this service to run?",
            remarks: "Defines the conditions under which the service operates.",
            isSubquestion: true
          },
          {
            id: "serv-3-2-9",
            text: "Service output / deliverables",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "The service output: what does the service deliver? Can be tangible (e.g., reports) or intangible (e.g., situational awareness).",
            remarks: "Specifies the outcomes of the service.",
            isSubquestion: true
          },
          {
            id: "serv-3-2-10",
            text: "Service activities",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Which activities are carried out within the scope of the service?",
            remarks: "Details the actions performed as part of the service.",
            isSubquestion: true
          },
          {
            id: "serv-3-2-11",
            text: "Service roles & responsibilities",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Which roles and responsibilities apply to this service?",
            remarks: "Defines the roles involved in service delivery.",
            isSubquestion: true
          },
          {
            id: "serv-3-3",
            text: "Is the service measured for quality?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Are the quality indicators from the previous questions used for reporting on the service?",
            remarks: "Ensures the service quality is tracked and reported."
          },
          {
            id: "serv-3-4",
            text: "Is the service measured for service delivery in accordance with service levels?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Service levels should be used to formally commit the SOC to service delivery.",
            remarks: "Ensures service delivery meets agreed standards."
          },
          {
            id: "serv-3-5",
            text: "Are customers and/or stakeholders regularly updated about the service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Changes to the service scope, delivery, etc.",
            remarks: "Keeps stakeholders informed about service changes."
          },
          {
            id: "serv-3-6",
            text: "Is there a contractual agreement between the SOC and the customers?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Contractual agreements should also cover penalties.",
            remarks: "Formalizes the service agreement and expectations."
          },
          {
            id: "serv-3-7",
            text: "Is sufficient personnel allocated to the process to ensure required service delivery?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Allocation of dedicated personnel will ensure highest service quality.",
            remarks: "Ensures adequate staffing for service delivery."
          },
          {
            id: "serv-3-8",
            text: "Is the service aligned with other relevant processes?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "e.g., alignment with configuration management, incident management, etc.",
            remarks: "Ensures the service integrates well with other processes."
          },
          {
            id: "serv-3-9",
            text: "Is there an incident resolution / service continuity process in place for this service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Service continuity is important to comply with contractual agreements, even in case of major incidents.",
            remarks: "Ensures service continuity during incidents."
          },
          {
            id: "serv-3-10",
            text: "Has a set of procedures been created for this service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Procedures support process standardization and quality. Personnel should be trained to use procedures correctly and structurally.",
            remarks: "Ensures standardized service delivery."
          },
          {
            id: "serv-3-11",
            text: "Is there an onboarding and offboarding procedure for this service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Customer onboarding and offboarding procedures support efficient service delivery and ensure customers are (dis)connected properly.",
            remarks: "Ensures smooth customer transitions."
          },
          {
            id: "serv-3-12",
            text: "Are best practices applied to the service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Best practices should be used to optimize this service.",
            remarks: "Ensures the service follows industry best practices."
          },
          {
            id: "serv-3-13",
            text: "Are use cases used in the security analysis & forensics service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "e.g., user login brute-force, denial of service, non-compliance, etc.",
            remarks: "Helps in understanding and addressing specific scenarios."
          },
          {
            id: "serv-3-14",
            text: "Is process data gathered for prediction of service performance?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Service performance measurement requires establishment of performance goals.",
            remarks: "Ensures data-driven performance predictions."
          },
          {
            id: "serv-3-15",
            text: "Is the service continuously being improved based on improvement goals?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Improvement based on evaluation, assessment, tests, etc.",
            remarks: "Ensures continuous service improvement."
          },
          {
            id: "serv-3-16",
            text: "Please specify capabilities of the security analysis & forensics service:",
            type: "header",
            isHeader: true
          },
          {
            id: "serv-3-16-1",
            text: "Forensic data collection",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to collect forensic data from various sources.",
            remarks: "Enhances forensic data collection capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-3-16-2",
            text: "Forensic data preservation",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to preserve forensic data for future analysis.",
            remarks: "Enhances forensic data preservation capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-3-16-3",
            text: "Forensic data analysis",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to analyze forensic data to identify patterns and anomalies.",
            remarks: "Enhances forensic data analysis capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-3-16-4",
            text: "Forensic reporting",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to generate reports based on forensic analysis.",
            remarks: "Enhances forensic reporting capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-3-16-5",
            text: "Forensic evidence presentation",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to present forensic evidence in a clear and concise manner.",
            remarks: "Enhances forensic evidence presentation capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-3-16-6",
            text: "Forensic tool integration",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to integrate with various forensic tools for data collection and analysis.",
            remarks: "Enhances forensic tool integration capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-3-16-7",
            text: "Forensic data correlation",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to correlate forensic data with other events and data sources.",
            remarks: "Enhances forensic data correlation capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-3-16-8",
            text: "Forensic data visualization",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to visualize forensic data for better understanding and analysis.",
            remarks: "Enhances forensic data visualization capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-3-16-9",
            text: "Forensic data storage",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to store forensic data securely for future reference.",
            remarks: "Enhances forensic data storage capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-3-16-10",
            text: "Forensic data sharing",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to share forensic data with relevant stakeholders securely.",
            remarks: "Enhances forensic data sharing capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-3-16-11",
            text: "Forensic data chain of custody",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to maintain a chain of custody for forensic data to ensure its integrity and admissibility in court.",
            remarks: "Enhances forensic data chain of custody capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-3-17",
            text: "Specify rationale for chosen values or any additional comments",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments.",
            remarks: "Use this outcome to determine the score for 1.2."
          },
          {
            id: "serv-4",
            text: "Threat Intelligence",
            type: "header",
            isHeader: true
          },
          {
            id: "serv-4-1",
            text: "Have you formally described the threat intelligence service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "A service description should be in place.",
            remarks: "Ensures clear understanding of the service scope and objectives."
          },
          {
            id: "serv-4-2",
            text: "Please specify elements of the threat intelligence service document:",
            type: "header",
            isHeader: true
          },
          {
            id: "serv-4-2-1",
            text: "Key performance indicators",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Indicators to establish the performance of the service.",
            remarks: "Helps in measuring the effectiveness of the service.",
            isSubquestion: true
          },
          {
            id: "serv-4-2-2",
            text: "Quality indicators",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Indicators to establish the quality of service delivery.",
            remarks: "Helps in assessing the service quality.",
            isSubquestion: true
          },
          {
            id: "serv-4-2-3",
            text: "Service dependencies",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "A clear understanding of which people/process/technologies are required for adequate service delivery.",
            remarks: "Ensures all necessary components are considered.",
            isSubquestion: true
          },
          {
            id: "serv-4-2-4",
            text: "Service levels",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Agreements on minimum performance, capacity, availability, etc.",
            remarks: "Sets expectations for service delivery.",
            isSubquestion: true
          },
          {
            id: "serv-4-2-5",
            text: "Hours of operation",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "The operational hours for this service (e.g., 24/7).",
            remarks: "Defines the service availability.",
            isSubquestion: true
          },
          {
            id: "serv-4-2-6",
            text: "Service customers and stakeholders",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "The customers and stakeholders for this service (e.g., IT management).",
            remarks: "Identifies who benefits from the service.",
            isSubquestion: true
          },
          {
            id: "serv-4-2-7",
            text: "Purpose",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "The purpose and objectives for this service.",
            remarks: "Clarifies the intent of the service.",
            isSubquestion: true
          },
          {
            id: "serv-4-2-8",
            text: "Service input / triggers",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "The service input: what triggers this service to run?",
            remarks: "Defines the conditions under which the service operates.",
            isSubquestion: true
          },
          {
            id: "serv-4-2-9",
            text: "Service output / deliverables",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "The service output: what does the service deliver? Can be tangible (e.g., reports) or intangible (e.g., situational awareness).",
            remarks: "Specifies the outcomes of the service.",
            isSubquestion: true
          },
          {
            id: "serv-4-2-10",
            text: "Service activities",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Which activities are carried out within the scope of the service?",
            remarks: "Details the actions performed as part of the service.",
            isSubquestion: true
          },
          {
            id: "serv-4-2-11",
            text: "Service roles & responsibilities",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Which roles and responsibilities apply to this service?",
            remarks: "Defines the roles involved in service delivery.",
            isSubquestion: true
          },
          {
            id: "serv-4-3",
            text: "Is the service measured for quality?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Are the quality indicators from the previous questions used for reporting on the service?",
            remarks: "Ensures the service quality is tracked and reported."
          },
          {
            id: "serv-4-4",
            text: "Is the service measured for service delivery in accordance with service levels?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Service levels should be used to formally commit the SOC to service delivery.",
            remarks: "Ensures service delivery meets agreed standards."
          },
          {
            id: "serv-4-5",
            text: "Are customers and/or stakeholders regularly updated about the service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Changes to the service scope, delivery, etc.",
            remarks: "Keeps stakeholders informed about service changes."
          },
          {
            id: "serv-4-6",
            text: "Is there a contractual agreement between the SOC and the customers?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Contractual agreements should also cover penalties.",
            remarks: "Formalizes the service agreement and expectations."
          },
          {
            id: "serv-4-7",
            text: "Is sufficient personnel allocated to the process to ensure required service delivery?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Allocation of dedicated personnel will ensure highest service quality.",
            remarks: "Ensures adequate staffing for service delivery."
          },
          {
            id: "serv-4-8",
            text: "Is the service aligned with other relevant processes?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "e.g., alignment with configuration management, incident management, etc.",
            remarks: "Ensures the service integrates well with other processes."
          },
          {
            id: "serv-4-9",
            text: "Is there an incident resolution / service continuity process in place for this service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Service continuity is important to comply with contractual agreements, even in case of major incidents.",
            remarks: "Ensures service continuity during incidents."
          },
          {
            id: "serv-4-10",
            text: "Has a set of procedures been created for this service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Procedures support process standardization and quality. Personnel should be trained to use procedures correctly and structurally.",
            remarks: "Ensures standardized service delivery."
          },
          {
            id: "serv-4-11",
            text: "Is there an onboarding and offboarding procedure for this service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Customer onboarding and offboarding procedures support efficient service delivery and ensure customers are (dis)connected properly.",
            remarks: "Ensures smooth customer transitions."
          },
          {
            id: "serv-4-12",
            text: "Are best practices applied to the service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Best practices should be used to optimize this service.",
            remarks: "Ensures the service follows industry best practices."
          },
          {
            id: "serv-4-13",
            text: "Are use cases used in the threat intelligence service?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "e.g., user login brute-force, denial of service, non-compliance, etc.",
            remarks: "Helps in understanding and addressing specific scenarios."
          },
          {
            id: "serv-4-14",
            text: "Is process data gathered for prediction of service performance?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Service performance measurement requires establishment of performance goals.",
            remarks: "Ensures data-driven performance predictions."
          },
          {
            id: "serv-4-15",
            text: "Is the service continuously being improved based on improvement goals?",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Improvement based on evaluation, assessment, tests, etc.",
            remarks: "Ensures continuous service improvement."
          },
          {
            id: "serv-4-16",
            text: "Please specify capabilities of the threat intelligence service:",
            type: "header",
            isHeader: true
          },
          {
            id: "serv-4-16-1",
            text: "Threat intelligence collection",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to collect threat intelligence from various sources.",
            remarks: "Enhances threat intelligence collection capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-4-16-2",
            text: "Threat intelligence analysis",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to analyze threat intelligence to identify patterns and anomalies.",
            remarks: "Enhances threat intelligence analysis capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-4-16-3",
            text: "Threat intelligence sharing",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to share threat intelligence with relevant stakeholders securely.",
            remarks: "Enhances threat intelligence sharing capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-4-16-4",
            text: "Threat intelligence integration",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to integrate threat intelligence with other security tools and processes.",
            remarks: "Enhances threat intelligence integration capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-4-16-5",
            text: "Threat intelligence reporting",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to generate reports based on threat intelligence analysis.",
            remarks: "Enhances threat intelligence reporting capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-4-16-6",
            text: "Threat intelligence correlation",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to correlate threat intelligence with other events and data sources.",
            remarks: "Enhances threat intelligence correlation capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-4-16-7",
            text: "Threat intelligence visualization",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to visualize threat intelligence data for better understanding and analysis.",
            remarks: "Enhances threat intelligence visualization capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-4-16-8",
            text: "Threat intelligence storage",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to store threat intelligence data securely for future reference.",
            remarks: "Enhances threat intelligence data storage capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-4-16-9",
            text: "Threat intelligence enrichment",
            type: "dropdown",
            options: ["No", "Partially", "Averagely", "Mostly", "Fully"],
            guidance: "Capability to enrich threat intelligence data with additional context and information.",
            remarks: "Enhances threat intelligence data enrichment capabilities.",
            isSubquestion: true
          },
          {
            id: "serv-4-17",
            text: "Specify rationale for chosen values or any additional comments",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments.",
            remarks: "Use this outcome to determine the score for 1.2."
          }
        ]
      },
      "security_incident_management": {
        name: "Security Incident Management",
        questions: [
          {
            id: "sec-1",
            text: "Maturity Assessment",
            type: "header",
            isHeader: true
          },
          {
            id: "sec-1-1",
            text: "Have you adopted a maturity assessment methodology for Security Incident Management?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Specify the methodology if adopted.",
            remarks: "e.g., SOC-CMM 4CERT, SIM3, CREST, etc."
          },
          {
            id: "sec-1-1-1",
            text: "If yes, please specify the methodology",
            type: "text",
            guidance: "e.g., SOC-CMM 4CERT, SIM3, CREST, etc.",
            remarks: "Specify the methodology if adopted."
          },
          {
            id: "sec-1-1-2",
            text: "If yes, please specify the maturity level (can have up to 2 digits)",
            type: "text",
            guidance: "Please convert to a 5-point scale if required. For example: 3.6 on a 4-point scale = 4.5 on a 5-point scale",
            remarks: "The score in 2.1.2 overrules any maturity scoring in this section."
          },
          {
            id: "sec-1-2",
            text: "Have you adopted a standard for the Security Incident Management process?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "e.g. NIST 800-62r1, CERT handbook, etc.",
            remarks: "Specify the standard if adopted."
          },
          {
            id: "sec-1-3",
            text: "Have you formally described the security incident management process?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A service description should be in place.",
            remarks: "Ensures clarity in the process."
          },
          {
            id: "sec-2",
            text: "Security Incident Management Document Elements",
            type: "header",
            isHeader: true
          },
          {
            id: "sec-2-1",
            text: "Security incident definition",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A clear and unambiguous definition of a security incident.",
            remarks: "Ensures understanding of what constitutes a security incident."
          },
          {
            id: "sec-2-2",
            text: "Service levels",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "e.g. response times",
            remarks: "Defines expected response times."
          },
          {
            id: "sec-2-3",
            text: "Workflow",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The process steps that are part of the security incident management process (e.g. detection, triage, etc.).",
            remarks: "Outlines the steps in the incident management process."
          },
          {
            id: "sec-2-4",
            text: "Decision tree",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Decision tree for escalation and starting of the process.",
            remarks: "Guides decision-making during incidents."
          },
          {
            id: "sec-2-5",
            text: "Hours of operation",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "When can the security incident response process be started?",
            remarks: "Defines availability of the incident response team."
          },
          {
            id: "sec-2-6",
            text: "Service customers and stakeholders",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The customers and stakeholders for this service (e.g. IT management).",
            remarks: "Identifies who is affected by the service."
          },
          {
            id: "sec-2-7",
            text: "Purpose",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The purpose and objectives for this service.",
            remarks: "Clarifies the goals of the service."
          },
          {
            id: "sec-2-8",
            text: "Service input / triggers",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The service input: what triggers this service to run?",
            remarks: "Identifies what initiates the service."
          },
          {
            id: "sec-2-9",
            text: "Service output / deliverables",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The service output: what does the service deliver? Can be tangible (e.g. reports) or intangible (e.g. situational awareness).",
            remarks: "Defines the outcomes of the service."
          },
          {
            id: "sec-2-10",
            text: "Service activities",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Which activities are carried out within the scope of the service?",
            remarks: "Lists the activities involved in the service."
          },
          {
            id: "sec-2-11",
            text: "Service roles & responsibilities",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Which roles and responsibilities apply to this service?",
            remarks: "Defines who is responsible for what in the service."
          },
          {
            id: "sec-2-completeness",
            text: "Completeness",
            type: "completeness",
            guidance: "Use this outcome to determine the score for 2.4",
            remarks: "Assesses the completeness of the document elements."
          },
          {
            id: "sec-3",
            text: "Service Quality and Delivery",
            type: "header",
            isHeader: true
          },
          {
            id: "sec-3-1",
            text: "Is the service measured for quality?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Are the quality indicators from the previous questions used for reporting on the service?",
            remarks: "Ensures quality is tracked and reported."
          },
          {
            id: "sec-3-2",
            text: "Is the service measured for service delivery in accordance with service levels?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Service levels should be used to formally commit the SOC to service delivery.",
            remarks: "Ensures service levels are met."
          },
          {
            id: "sec-3-3",
            text: "Are customers and/or stakeholders regularly updated about the service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Changes to the service scope, delivery, etc.",
            remarks: "Keeps stakeholders informed."
          },
          {
            id: "sec-3-4",
            text: "Is there a contractual agreement between the SOC and the customers?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Contractual agreements should also cover penalties.",
            remarks: "Formalizes the service agreement."
          },
          {
            id: "sec-3-5",
            text: "Is sufficient personnel allocated to the process to ensure required service delivery?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Allocation of dedicated personnel will ensure highest service quality.",
            remarks: "Ensures adequate staffing for service delivery."
          },
          {
            id: "sec-3-6",
            text: "Is the service aligned with other relevant processes?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "e.g. alignment with configuration management, incident management, etc.",
            remarks: "Ensures consistency with other processes."
          },
          {
            id: "sec-3-7",
            text: "Is the incident response team authorized to perform (invasive) actions when required?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "This is a mandate issue. The team should have mandate beforehand to optimize incident response times.",
            remarks: "Ensures the team can act quickly."
          },
          {
            id: "sec-3-8",
            text: "Is there an onboarding and offloading procedure for this service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Customer onboarding and offloading procedures support efficient service delivery and ensure customers are (dis)connected properly.",
            remarks: "Ensures smooth transitions for customers."
          },
          {
            id: "sec-3-9",
            text: "Are best practices applied to the service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Best practices should be used to optimize this service.",
            remarks: "Ensures the service follows best practices."
          },
          {
            id: "sec-3-10",
            text: "Is the service supported by predefined workflows or scenarios?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Workflows and scenarios can be used to structure follow-up and determine expected incident progression.",
            remarks: "Provides structure to the service."
          },
          {
            id: "sec-3-11",
            text: "Is process data gathered for prediction of service performance?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Service performance measurement requires establishment of performance goals.",
            remarks: "Enables performance prediction."
          },
          {
            id: "sec-3-12",
            text: "Is the service continuously being improved based on improvement goals?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Improvement based on evaluation, (maturity) assessment, tests, etc.",
            remarks: "Ensures continuous improvement."
          },
          {
            id: "sec-4",
            text: "Capabilities and Artefacts",
            type: "header",
            isHeader: true
          },
          {
            id: "sec-4-1",
            text: "Incident logging procedure",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Part of preparation procedures.",
            remarks: "Ensures incidents are logged."
          },
          {
            id: "sec-4-2",
            text: "Incident resolution procedure",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Part of preparation procedures. Likely involves a checklist and a workflow for incident handling.",
            remarks: "Ensures incidents are resolved systematically."
          },
          {
            id: "sec-4-3",
            text: "Incident investigation procedure",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Part of preparation procedures. Includes triage procedure and investigation / analysis procedures.",
            remarks: "Ensures thorough investigation of incidents."
          },
          {
            id: "sec-4-4",
            text: "Escalation procedure",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Part of preparation procedures.",
            remarks: "Ensures incidents are escalated appropriately."
          },
          {
            id: "sec-4-5",
            text: "Evidence collection procedure",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Part of preparation procedures.",
            remarks: "Ensures evidence is collected systematically."
          },
          {
            id: "sec-4-6",
            text: "Incident containment procedures",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Part of preparation procedures. Can be based on RE&CT framework.",
            remarks: "Ensures incidents are contained effectively."
          },
          {
            id: "sec-4-7",
            text: "IR Training",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Preparation exercises to determine service effectiveness.",
            remarks: "Ensures the team is trained."
          },
          {
            id: "sec-4-8",
            text: "Table-top exercises",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Preparation exercises to determine service effectiveness.",
            remarks: "Ensures the team is prepared."
          },
          {
            id: "sec-4-9",
            text: "Red team / blue team exercises",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Preparation exercises to determine service effectiveness.",
            remarks: "Ensures the team is prepared for real incidents."
          },
          {
            id: "sec-4-10",
            text: "RACI matrix",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Matrix with Responsibility, Accountability and Consulted and Informed entities for the process.",
            remarks: "Clarifies roles and responsibilities."
          },
          {
            id: "sec-4-11",
            text: "Response authorization",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Authorization from senior management to take any action required for incident mitigation (e.g. disconnect systems).",
            remarks: "Ensures actions can be taken quickly."
          },
          {
            id: "sec-4-12",
            text: "Incident template",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Templates for security incident management registration.",
            remarks: "Ensures consistent incident reporting."
          },
          {
            id: "sec-4-13",
            text: "Incident tracking system",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A system that supports the security incident management workflow. If possible dedicated or supporting ticket confidentiality.",
            remarks: "Ensures incidents are tracked systematically."
          },
          {
            id: "sec-4-14",
            text: "False-positive reduction",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A procedure to avoid false-positives in the security incident management process.",
            remarks: "Reduces false alarms."
          },
          {
            id: "sec-4-15",
            text: "Priority assignment",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Assignment of priority to the incident, part of impact and magnitude assessment.",
            remarks: "Ensures incidents are prioritized correctly."
          },
          {
            id: "sec-4-16",
            text: "Severity assignment",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Assignment of severity to the incident, part of impact and magnitude assessment.",
            remarks: "Ensures incidents are assessed for severity."
          },
          {
            id: "sec-4-17",
            text: "Categorization",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Categorization of the incident. For example, the VERIS framework could be used for classification.",
            remarks: "Ensures incidents are categorized correctly."
          },
          {
            id: "sec-4-18",
            text: "Critical bridge",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A communication bridge for continuous alignment of employees involved in security incident management.",
            remarks: "Ensures continuous communication."
          },
          {
            id: "sec-4-19",
            text: "War room",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A dedicated facility for coordination of security incidents.",
            remarks: "Provides a space for incident coordination."
          },
          {
            id: "sec-4-20",
            text: "Communication plan & email templates",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Standardized plans and templates for communication. Includes reachability in case of emergency and outreach to customers.",
            remarks: "Ensures standardized communication."
          },
          {
            id: "sec-4-21",
            text: "Backup communication technology",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Backup communication technology in case of failure of primary means. Includes internet access, email systems and phones.",
            remarks: "Ensures communication continuity."
          },
          {
            id: "sec-4-22",
            text: "Secure communication channels",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Encrypted and secure communications (includes email and phones) that can be used during incident response.",
            remarks: "Ensures secure communication."
          },
          {
            id: "sec-4-23",
            text: "(dedicated) information sharing platform",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A platform for sharing information regarding the security incident.",
            remarks: "Ensures information is shared effectively."
          },
          {
            id: "sec-4-24",
            text: "Change management integration",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Integration with the change management process for any actions taken in the security incident management process.",
            remarks: "Ensures changes are managed properly."
          },
          {
            id: "sec-4-25",
            text: "Malware extraction & analysis",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Extraction and analysis of malware.",
            remarks: "Ensures malware is analyzed effectively."
          },
          {
            id: "sec-4-26",
            text: "On-site incident response",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Localized incident response capability.",
            remarks: "Ensures on-site response is possible."
          },
          {
            id: "sec-4-27",
            text: "Remote incident response",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Remote incident response capability.",
            remarks: "Ensures remote response is possible."
          },
          {
            id: "sec-4-28",
            text: "Third-party escalation",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Escalation process to third parties (vendors, partners, etc.).",
            remarks: "Ensures escalation to third parties is possible."
          },
          {
            id: "sec-4-29",
            text: "Evaluation template",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A template for post-incident evaluation.",
            remarks: "Ensures incidents are evaluated systematically."
          },
          {
            id: "sec-4-30",
            text: "Reporting template",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A template for reporting on the security incident.",
            remarks: "Ensures incidents are reported systematically."
          },
          {
            id: "sec-4-31",
            text: "Incident closure",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Formal closure of the incident, including debriefing sessions.",
            remarks: "Ensures incidents are closed properly."
          },
          {
            id: "sec-4-32",
            text: "Lessons learned extraction for process improvement",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Continuous improvement based on previous experiences.",
            remarks: "Ensures lessons are learned and applied."
          },
          {
            id: "sec-4-33",
            text: "External security incident support agreements",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Retainer for incident response as a service in case of major breaches.",
            remarks: "Ensures external support is available."
          },
          {
            id: "sec-4-34",
            text: "Exercises with other incident response teams",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Exercises with other IR teams, for example outsourcing partners and other teams in the sector.",
            remarks: "Ensures coordination with other teams."
          },
          {
            id: "sec-4-35",
            text: "Root Cause Analysis",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Investigation and reporting on the root cause of the incident. Required for optimizing lessons learned for the organization.",
            remarks: "Ensures root causes are identified and addressed."
          },
          {
            id: "sec-4-36",
            text: "Restore integrity verification",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Verification that backups and restored assets do not contain IoCs or backdoors used in the initial incident.",
            remarks: "Ensures integrity of restored systems."
          },
          {
            id: "sec-completeness",
            text: "Completeness",
            type: "completeness",
            guidance: "Assesses the completeness of the capabilities and artefacts.",
            remarks: "Ensures all aspects are covered."
          },
          {
            id: "sec-comments",
            text: "Comments and/or Remarks",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments."
          }
        ]
      },
      "security_analysis_forensics": {
        name: "Security Analysis & Forensics",
        questions: [
          {
            id: "sec-an-1",
            text: "Service Description",
            type: "header",
            isHeader: true
          },
          {
            id: "sec-an-1-1",
            text: "Have you formally described the security analysis & forensics service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A service description should be in place.",
            remarks: "Ensures clarity in the service scope."
          },
          {
            id: "sec-an-2",
            text: "Security Analysis Service Document Elements",
            type: "header",
            isHeader: true
          },
          {
            id: "sec-an-2-1",
            text: "Key performance indicators",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Indicators to establish the performance of the service.",
            remarks: "Ensures performance is tracked."
          },
          {
            id: "sec-an-2-2",
            text: "Quality indicators",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Indicators to establish the quality of service delivery.",
            remarks: "Ensures quality is maintained."
          },
          {
            id: "sec-an-2-3",
            text: "Service dependencies",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A clear understanding of which people/process/technologies are required for adequate service delivery.",
            remarks: "Ensures dependencies are managed."
          },
          {
            id: "sec-an-2-4",
            text: "Service levels",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Agreements on minimum performance, capacity, availability, etc.",
            remarks: "Ensures service levels are met."
          },
          {
            id: "sec-an-2-5",
            text: "Hours of operation",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The operational hours for this service (e.g. 24/7).",
            remarks: "Defines service availability."
          },
          {
            id: "sec-an-2-6",
            text: "Service customers and stakeholders",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The customers and stakeholders for this service (e.g. IT management).",
            remarks: "Identifies who is affected by the service."
          },
          {
            id: "sec-an-2-7",
            text: "Purpose",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The purpose and objectives for this service.",
            remarks: "Clarifies the goals of the service."
          },
          {
            id: "sec-an-2-8",
            text: "Service input / triggers",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The service input: what triggers this service to run?",
            remarks: "Identifies what initiates the service."
          },
          {
            id: "sec-an-2-9",
            text: "Service output / deliverables",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The service output: what does the service deliver? Can be tangible (e.g. reports) or intangible (e.g. situational awareness).",
            remarks: "Defines the outcomes of the service."
          },
          {
            id: "sec-an-2-10",
            text: "Service activities",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Which activities are carried out within the scope of the service?",
            remarks: "Lists the activities involved in the service."
          },
          {
            id: "sec-an-2-11",
            text: "Service roles & responsibilities",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Which roles and responsibilities apply to this service?",
            remarks: "Defines who is responsible for what in the service."
          },
          {
            id: "sec-an-2-completeness",
            text: "Completeness",
            type: "completeness",
            guidance: "Use this outcome to determine the score for 3.2",
            remarks: "Assesses the completeness of the document elements."
          },
          {
            id: "sec-an-3",
            text: "Service Quality and Delivery",
            type: "header",
            isHeader: true
          },
          {
            id: "sec-an-3-1",
            text: "Is the service measured for quality?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Are the quality indicators from the previous questions used for reporting on the service?",
            remarks: "Ensures quality is tracked and reported."
          },
          {
            id: "sec-an-3-2",
            text: "Is the service measured for service delivery in accordance with service levels?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Service levels should be used to formally commit the SOC to service delivery.",
            remarks: "Ensures service levels are met."
          },
          {
            id: "sec-an-3-3",
            text: "Are customers and/or stakeholders regularly updated about the service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Changes to the service scope, delivery, etc.",
            remarks: "Keeps stakeholders informed."
          },
          {
            id: "sec-an-3-4",
            text: "Is there a contractual agreement between the SOC and the customers?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Contractual agreements should also cover penalties.",
            remarks: "Formalizes the service agreement."
          },
          {
            id: "sec-an-3-5",
            text: "Is sufficient personnel allocated to the process to ensure required service delivery?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Allocation of dedicated personnel will ensure highest service quality.",
            remarks: "Ensures adequate staffing for service delivery."
          },
          {
            id: "sec-an-3-6",
            text: "Is the service aligned with other relevant processes?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "e.g. alignment with configuration management, incident management, etc.",
            remarks: "Ensures consistency with other processes."
          },
          {
            id: "sec-an-3-7",
            text: "Is there an incident resolution / service continuity process in place for this service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Service continuity is important to comply with contractual agreements, even in case of major incidents.",
            remarks: "Ensures continuity of service."
          },
          {
            id: "sec-an-3-8",
            text: "Has a set of procedures been created for this service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Procedures support process standardization and quality. Personnel should be trained to use procedures correctly and structurally.",
            remarks: "Ensures standardized procedures."
          },
          {
            id: "sec-an-3-9",
            text: "Is there an onboarding and offloading procedure for this service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Customer onboarding and offloading procedures support efficient service delivery and ensure customers are (dis)connected properly.",
            remarks: "Ensures smooth transitions for customers."
          },
          {
            id: "sec-an-3-10",
            text: "Are best practices applied to the service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Best practices should be used to optimize this service.",
            remarks: "Ensures the service follows best practices."
          },
          {
            id: "sec-an-3-11",
            text: "Is the service supported by predefined workflows or scenarios?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Use cases can be used to guide the analysis workflows.",
            remarks: "Provides structure to the service."
          },
          {
            id: "sec-an-3-12",
            text: "Is process data gathered for prediction of service performance?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Service performance measurement requires establishment of performance goals.",
            remarks: "Enables performance prediction."
          },
          {
            id: "sec-an-3-13",
            text: "Is the service continuously being improved based on improvement goals?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Improvement based on evaluation, (maturity) assessment, tests, etc.",
            remarks: "Ensures continuous improvement."
          },
          {
            id: "sec-an-4",
            text: "Capabilities and Artefacts",
            type: "header",
            isHeader: true
          },
          {
            id: "sec-an-4-1",
            text: "Event analysis",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Analysis of detailed events.",
            remarks: "Ensures detailed event analysis."
          },
          {
            id: "sec-an-4-2",
            text: "Event analysis toolkit",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A combination of internal and external tools that can be used for security event analysis purposes.",
            remarks: "Ensures tools are available for analysis."
          },
          {
            id: "sec-an-4-3",
            text: "Trend analysis",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Analysis of trends in events or incidents.",
            remarks: "Ensures trend analysis is performed."
          },
          {
            id: "sec-an-4-4",
            text: "Incident analysis",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Analysis of security incidents.",
            remarks: "Ensures incident analysis is performed."
          },
          {
            id: "sec-an-4-5",
            text: "Visual analysis",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Visualization tools for data analysis.",
            remarks: "Ensures visual analysis is possible."
          },
          {
            id: "sec-an-4-6",
            text: "Static malware analysis",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Reverse engineering and disassembly of malware.",
            remarks: "Ensures static malware analysis is performed."
          },
          {
            id: "sec-an-4-7",
            text: "Dynamic malware analysis",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Running malware in a controlled environment to determine its characteristics.",
            remarks: "Ensures dynamic malware analysis is performed."
          },
          {
            id: "sec-an-4-8",
            text: "Tradecraft analysis",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Analysis of the tradecraft of the attacker. This includes the tools, tactics, techniques, and procedures used by attackers.",
            remarks: "Ensures tradecraft analysis is performed."
          },
          {
            id: "sec-an-4-9",
            text: "Historic analysis",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Analysis of historic information based on new insights. APTs can span multiple months or years.",
            remarks: "Ensures historic analysis is performed."
          },
          {
            id: "sec-an-4-10",
            text: "Network analysis",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Analysis of network traffic patterns and packets.",
            remarks: "Ensures network analysis is performed."
          },
          {
            id: "sec-an-4-11",
            text: "Memory analysis",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Analysis of end-point memory, for example fileless malware.",
            remarks: "Ensures memory analysis is performed."
          },
          {
            id: "sec-an-4-12",
            text: "Mobile device analysis",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Capability to perform forensic analysis of mobile devices.",
            remarks: "Ensures mobile device analysis is possible."
          },
          {
            id: "sec-an-4-13",
            text: "Volatile information collection",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Collection of volatile information (such as memory; see RFC3227) requires swift response, as evidence may be lost quickly.",
            remarks: "Ensures volatile information is collected."
          },
          {
            id: "sec-an-4-14",
            text: "Remote evidence collection",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Capability to remotely collect evidence (files, disk images, memory dumps, etc.) from target systems.",
            remarks: "Ensures remote evidence collection is possible."
          },
          {
            id: "sec-an-4-15",
            text: "Forensic hardware toolkit",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Hardware toolkits will likely at least consist of write-blockers for disk imaging.",
            remarks: "Ensures hardware tools are available."
          },
          {
            id: "sec-an-4-16",
            text: "Forensic analysis software toolkit",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Software tools used in forensic analysis.",
            remarks: "Ensures software tools are available."
          },
          {
            id: "sec-an-4-17",
            text: "Dedicated analysis workstations",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Dedicated workstations loaded with specialized tools should be used to make investigations more efficient.",
            remarks: "Ensures dedicated workstations are available."
          },
          {
            id: "sec-an-4-18",
            text: "Security analysis & forensics handbook",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A handbook that describes security analysis workflows, tools, exceptions, known issues, etc.",
            remarks: "Ensures a handbook is available."
          },
          {
            id: "sec-an-4-19",
            text: "Security analysis & forensics workflows",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "An established workflow for performing security analysis.",
            remarks: "Ensures workflows are established."
          },
          {
            id: "sec-an-4-20",
            text: "Case management system",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A case management system that supports the analyst workflow.",
            remarks: "Ensures a case management system is in place."
          },
          {
            id: "sec-an-4-21",
            text: "Report templates",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Report templates for standardization of investigation reporting.",
            remarks: "Ensures standardized reporting."
          },
          {
            id: "sec-an-4-22",
            text: "Evidence seizure procedure",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Procedure for seizure of evidence in forensic analysis.",
            remarks: "Ensures evidence seizure is standardized."
          },
          {
            id: "sec-an-4-23",
            text: "Evidence transport procedure",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Procedure for trusted transport of evidence (e.g. laptops) that preserve the chain of custody.",
            remarks: "Ensures evidence transport is secure."
          },
          {
            id: "sec-an-4-24",
            text: "Chain of custody preservation procedure",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Procedures to correctly process evidence, while preserving the chain of custody.",
            remarks: "Ensures chain of custody is preserved."
          },
          {
            id: "sec-an-completeness",
            text: "Completeness",
            type: "completeness",
            guidance: "Assesses the completeness of the capabilities and artefacts.",
            remarks: "Ensures all aspects are covered."
          },
          {
            id: "sec-an-comments",
            text: "Comments and/or Remarks",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments."
          }
        ]
      }, 
      "threat_intelligence": {
        name: "Threat Intelligence",
        questions: [
          {
            id: "threat-int-1",
            text: "Service Description",
            type: "header",
            isHeader: true
          },
          {
            id: "threat-int-1-1",
            text: "Have you formally described the threat intelligence service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A service description should be in place.",
            remarks: "Ensures clarity in the service scope."
          },
          {
            id: "threat-int-2",
            text: "Threat Intelligence Service Document Elements",
            type: "header",
            isHeader: true
          },
          {
            id: "threat-int-2-1",
            text: "Key performance indicators",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Indicators to establish the performance of the service.",
            remarks: "Ensures performance is tracked."
          },
          {
            id: "threat-int-2-2",
            text: "Quality indicators",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Indicators to establish the quality of service delivery.",
            remarks: "Ensures quality is maintained."
          },
          {
            id: "threat-int-2-3",
            text: "Service dependencies",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A clear understanding of which people/process/technologies are required for adequate service delivery.",
            remarks: "Ensures dependencies are managed."
          },
          {
            id: "threat-int-2-4",
            text: "Service levels",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Agreements on minimum performance, capacity, availability, etc.",
            remarks: "Ensures service levels are met."
          },
          {
            id: "threat-int-2-5",
            text: "Hours of operation",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The operational hours for this service (e.g. 24/7).",
            remarks: "Defines service availability."
          },
          {
            id: "threat-int-2-6",
            text: "Service customers and stakeholders",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The customers and stakeholders for this service (e.g. IT management).",
            remarks: "Identifies who is affected by the service."
          },
          {
            id: "threat-int-2-7",
            text: "Purpose",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The purpose and objectives for this service.",
            remarks: "Clarifies the goals of the service."
          },
          {
            id: "threat-int-2-8",
            text: "Service input / triggers",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The service input: what triggers this service to run?",
            remarks: "Identifies what initiates the service."
          },
          {
            id: "threat-int-2-9",
            text: "Service output / deliverables",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The service output: what does the service deliver? Can be tangible (e.g. reports) or intangible (e.g. situational awareness).",
            remarks: "Defines the outcomes of the service."
          },
          {
            id: "threat-int-2-10",
            text: "Service activities",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Which activities are carried out within the scope of the service?",
            remarks: "Lists the activities involved in the service."
          },
          {
            id: "threat-int-2-11",
            text: "Service roles & responsibilities",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Which roles and responsibilities apply to this service?",
            remarks: "Defines who is responsible for what in the service."
          },
          {
            id: "threat-int-2-completeness",
            text: "Completeness",
            type: "completeness",
            guidance: "Use this outcome to determine the score for 4.2",
            remarks: "Assesses the completeness of the document elements."
          },
          {
            id: "threat-int-3",
            text: "Service Quality and Delivery",
            type: "header",
            isHeader: true
          },
          {
            id: "threat-int-3-1",
            text: "Is the service measured for quality?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Are the quality indicators from the previous questions used for reporting on the service?",
            remarks: "Ensures quality is tracked and reported."
          },
          {
            id: "threat-int-3-2",
            text: "Is the service measured for service delivery in accordance with service levels?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Service levels should be used to formally commit the SOC to service delivery.",
            remarks: "Ensures service levels are met."
          },
          {
            id: "threat-int-3-3",
            text: "Are customers and/or stakeholders regularly updated about the service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Changes to the service scope, delivery, etc.",
            remarks: "Keeps stakeholders informed."
          },
          {
            id: "threat-int-3-4",
            text: "Is there a contractual agreement between the SOC and the customers?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Contractual agreements should also cover penalties.",
            remarks: "Formalizes the service agreement."
          },
          {
            id: "threat-int-3-5",
            text: "Is sufficient personnel allocated to the process to ensure required service delivery?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Allocation of dedicated personnel will ensure highest service quality.",
            remarks: "Ensures adequate staffing for service delivery."
          },
          {
            id: "threat-int-3-6",
            text: "Is the service aligned with other relevant processes?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "e.g. the security monitoring process, and mainly the security incident management process.",
            remarks: "Ensures consistency with other processes."
          },
          {
            id: "threat-int-3-7",
            text: "Is there an incident resolution / service continuity process in place for this service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Service continuity is important to comply with contractual agreements, even in case of major incidents.",
            remarks: "Ensures continuity of service."
          },
          {
            id: "threat-int-3-8",
            text: "Has a set of procedures been created for this service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Procedures support process standardization and quality. Personnel should be trained to use procedures correctly and structurally.",
            remarks: "Ensures standardized procedures."
          },
          {
            id: "threat-int-3-9",
            text: "Is there an onboarding and offloading procedure for this service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Customer onboarding and offloading procedures support efficient service delivery and ensure customers are (dis)connected properly.",
            remarks: "Ensures smooth transitions for customers."
          },
          {
            id: "threat-int-3-10",
            text: "Are best practices applied to the service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Best practices should be used to optimize this service.",
            remarks: "Ensures the service follows best practices."
          },
          {
            id: "threat-int-3-11",
            text: "Is process data gathered for prediction of service performance?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Service performance measurement requires establishment of performance goals.",
            remarks: "Enables performance prediction."
          },
          {
            id: "threat-int-3-12",
            text: "Is the service continuously being improved based on improvement goals?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Improvement based on evaluation, (maturity) assessment, tests, etc.",
            remarks: "Ensures continuous improvement."
          },
          {
            id: "threat-int-4",
            text: "Capabilities and Artefacts",
            type: "header",
            isHeader: true
          },
          {
            id: "threat-int-4-1",
            text: "Continuous intelligence gathering",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A process for continuously gathering relevant intelligence information.",
            remarks: "Ensures continuous intelligence gathering."
          },
          {
            id: "threat-int-4-2",
            text: "Automated intelligence gathering & processing",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "An automated system that collects and processes security intelligence information.",
            remarks: "Ensures automated intelligence gathering."
          },
          {
            id: "threat-int-4-3",
            text: "Centralized collection & distribution",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A central 'hub' for distributing indicators of compromise to other systems for further processing.",
            remarks: "Ensures centralized distribution."
          },
          {
            id: "threat-int-4-4",
            text: "Intelligence collection from open / public sources",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The use of public sources in the security intelligence process.",
            remarks: "Ensures collection from public sources."
          },
          {
            id: "threat-int-4-5",
            text: "Intelligence collection from closed communities",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The use of closed trusted communities in the security intelligence process.",
            remarks: "Ensures collection from closed communities."
          },
          {
            id: "threat-int-4-6",
            text: "Intelligence collection from intelligence provider",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The use of intelligence providers as a source for the security intelligence process.",
            remarks: "Ensures collection from intelligence providers."
          },
          {
            id: "threat-int-4-7",
            text: "Intelligence collection from business partners",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The use of business partners as a source for the security intelligence process.",
            remarks: "Ensures collection from business partners."
          },
          {
            id: "threat-int-4-8",
            text: "Intelligence collection from mailing lists",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The use of mailing lists as a source for the security intelligence process.",
            remarks: "Ensures collection from mailing lists."
          },
          {
            id: "threat-int-4-9",
            text: "Intelligence collection from internal sources",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The use of internal intelligence sources for the security intelligence process.",
            remarks: "Ensures collection from internal sources."
          },
          {
            id: "threat-int-4-10",
            text: "Structured data analysis",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The capability to analyze structured information.",
            remarks: "Ensures structured data analysis."
          },
          {
            id: "threat-int-4-11",
            text: "Unstructured data analysis",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The capability to analyze unstructured information.",
            remarks: "Ensures unstructured data analysis."
          },
          {
            id: "threat-int-4-12",
            text: "Past incident analysis",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The capability of using past incidents in the threat intelligence process. e.g. connecting new IoCs to past threats.",
            remarks: "Ensures past incident analysis."
          },
          {
            id: "threat-int-4-13",
            text: "Trend analysis",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Analyzing trends in the threat intelligence IoCs observed within the company.",
            remarks: "Ensures trend analysis."
          },
          {
            id: "threat-int-4-14",
            text: "Automated alerting",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Automated alerting of sightings of observables.",
            remarks: "Ensures automated alerting."
          },
          {
            id: "threat-int-4-15",
            text: "Adversary movement tracking",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Tracking the movement of attackers to keep track of new tools, tactics, techniques, and procedures.",
            remarks: "Ensures adversary movement tracking."
          },
          {
            id: "threat-int-4-16",
            text: "Attacker identification",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Identification of adversaries based on correlating intelligence indicators and incidents.",
            remarks: "Ensures attacker identification."
          },
          {
            id: "threat-int-4-17",
            text: "Threat identification",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Identification of threats related to attacker groups.",
            remarks: "Ensures threat identification."
          },
          {
            id: "threat-int-4-18",
            text: "Threat prediction",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Prediction of threats based on the information gathered in the threat intelligence process.",
            remarks: "Ensures threat prediction."
          },
          {
            id: "threat-int-4-19",
            text: "TTP extraction",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Extraction of Tactics, Techniques, and Procedures (TTP) from observables within the infrastructure.",
            remarks: "Ensures TTP extraction."
          },
          {
            id: "threat-int-4-20",
            text: "Deduplication",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Deduplication of threat intelligence feeds to avoid duplicate events.",
            remarks: "Ensures deduplication."
          },
          {
            id: "threat-int-4-21",
            text: "Enrichment",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Enrichment of information with additional sources for a higher level of confidentiality.",
            remarks: "Ensures enrichment."
          },
          {
            id: "threat-int-4-22",
            text: "Contextualization",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Addition of context to the threat intelligence process. Context can be vulnerability context, asset criticality, etc.",
            remarks: "Ensures contextualization."
          },
          {
            id: "threat-int-4-23",
            text: "Prioritization",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Prioritization of threat intelligence based on trustworthiness of source, sector relevance, geographic relevance, timeliness, etc.",
            remarks: "Ensures prioritization."
          },
          {
            id: "threat-int-4-24",
            text: "Threat intelligence reporting",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Reporting on threat intelligence findings and activities.",
            remarks: "Ensures threat intelligence reporting."
          },
          {
            id: "threat-int-4-25",
            text: "Threat landscaping",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Creation of a landscape of current and emerging threats for strategic purposes.",
            remarks: "Ensures threat landscaping."
          },
          {
            id: "threat-int-4-26",
            text: "Forecasting",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Forecasting based on trends and incidents.",
            remarks: "Ensures forecasting."
          },
          {
            id: "threat-int-4-27",
            text: "Sharing within the company",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Sharing of information with relevant parties within the company.",
            remarks: "Ensures sharing within the company."
          },
          {
            id: "threat-int-4-28",
            text: "Sharing with the industry",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Sharing of information with relevant parties within the same industry.",
            remarks: "Ensures sharing with the industry."
          },
          {
            id: "threat-int-4-29",
            text: "Sharing outside the industry",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Sharing of information with relevant parties outside the industry.",
            remarks: "Ensures sharing outside the industry."
          },
          {
            id: "threat-int-4-30",
            text: "Sharing in standardized format (e.g. STIX)",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Sharing of information in standardized exchange formats, such as STIX.",
            remarks: "Ensures sharing in standardized format."
          },
          {
            id: "threat-int-4-31",
            text: "Management of the CTI infrastructure (Threat Intelligence Platform)",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Managing the TIP to optimally support TI efforts.",
            remarks: "Ensures management of the CTI infrastructure."
          },
          {
            id: "threat-int-completeness",
            text: "Completeness",
            type: "completeness",
            guidance: "Assesses the completeness of the capabilities and artefacts.",
            remarks: "Ensures all aspects are covered."
          },
          {
            id: "threat-int-comments",
            text: "Comments and/or Remarks",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments."
          }
        ]
      },
      "threat_hunting": {
        name: "Threat Hunting",
        questions: [
          {
            id: "threat-hunt-1",
            text: "Methodology",
            type: "header",
            isHeader: true
          },
          {
            id: "threat-hunt-1-1",
            text: "Do you use a standardized threat hunting methodology?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Can be an internally developed approach or a publicly available methodology, such as TaHiTI.",
            remarks: "Ensures a structured approach to threat hunting."
          },
          {
            id: "threat-hunt-2",
            text: "Service Description",
            type: "header",
            isHeader: true
          },
          {
            id: "threat-hunt-2-1",
            text: "Have you formally described the threat hunting service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A service description should be in place.",
            remarks: "Ensures clarity in the service scope."
          },
          {
            id: "threat-hunt-3",
            text: "Threat Hunting Service Document Elements",
            type: "header",
            isHeader: true
          },
          {
            id: "threat-hunt-3-1",
            text: "Key performance indicators",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Indicators to establish the performance of the service.",
            remarks: "Ensures performance is tracked."
          },
          {
            id: "threat-hunt-3-2",
            text: "Quality indicators",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Indicators to establish the quality of service delivery.",
            remarks: "Ensures quality is maintained."
          },
          {
            id: "threat-hunt-3-3",
            text: "Service dependencies",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A clear understanding of which people/process/technologies are required for adequate service delivery.",
            remarks: "Ensures dependencies are managed."
          },
          {
            id: "threat-hunt-3-4",
            text: "Service levels",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Agreements on minimum performance, capacity, availability, etc.",
            remarks: "Ensures service levels are met."
          },
          {
            id: "threat-hunt-3-5",
            text: "Hours of operation",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The operational hours for this service (e.g. 24/7).",
            remarks: "Defines service availability."
          },
          {
            id: "threat-hunt-3-6",
            text: "Service customers and stakeholders",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The customers and stakeholders for this service (e.g. IT management).",
            remarks: "Identifies who is affected by the service."
          },
          {
            id: "threat-hunt-3-7",
            text: "Purpose",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The purpose and objectives for this service.",
            remarks: "Clarifies the goals of the service."
          },
          {
            id: "threat-hunt-3-8",
            text: "Service input / triggers",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The service input: what triggers this service to run?",
            remarks: "Identifies what initiates the service."
          },
          {
            id: "threat-hunt-3-9",
            text: "Service output / deliverables",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The service output: what does the service deliver? Can be tangible (e.g. reports) or intangible (e.g. situational awareness).",
            remarks: "Defines the outcomes of the service."
          },
          {
            id: "threat-hunt-3-10",
            text: "Service activities",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Which activities are carried out within the scope of the service?",
            remarks: "Lists the activities involved in the service."
          },
          {
            id: "threat-hunt-3-11",
            text: "Service roles & responsibilities",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Which roles and responsibilities apply to this service?",
            remarks: "Defines who is responsible for what in the service."
          },
          {
            id: "threat-hunt-3-completeness",
            text: "Completeness",
            type: "completeness",
            guidance: "Use this outcome to determine the score for 5.3",
            remarks: "Assesses the completeness of the document elements."
          },
          {
            id: "threat-hunt-4",
            text: "Service Quality and Delivery",
            type: "header",
            isHeader: true
          },
          {
            id: "threat-hunt-4-1",
            text: "Is the service measured for quality?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Are the quality indicators from the previous questions used for reporting on the service?",
            remarks: "Ensures quality is tracked and reported."
          },
          {
            id: "threat-hunt-4-2",
            text: "Is the service measured for service delivery in accordance with service levels?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Service levels should be used to formally commit the SOC to service delivery.",
            remarks: "Ensures service levels are met."
          },
          {
            id: "threat-hunt-4-3",
            text: "Are customers and/or stakeholders regularly updated about the service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Changes to the service scope, delivery, etc.",
            remarks: "Keeps stakeholders informed."
          },
          {
            id: "threat-hunt-4-4",
            text: "Is there a contractual agreement between the SOC and the customers?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Contractual agreements should also cover penalties.",
            remarks: "Formalizes the service agreement."
          },
          {
            id: "threat-hunt-4-5",
            text: "Is sufficient personnel allocated to the process to ensure required service delivery?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Allocation of dedicated personnel will ensure highest service quality.",
            remarks: "Ensures adequate staffing for service delivery."
          },
          {
            id: "threat-hunt-4-6",
            text: "Is the service aligned with other relevant processes?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "e.g. threat intelligence, security monitoring, security incident response.",
            remarks: "Ensures consistency with other processes."
          },
          {
            id: "threat-hunt-4-7",
            text: "Is there an incident resolution / service continuity process in place for this service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Service continuity is important to comply with contractual agreements, even in case of major incidents.",
            remarks: "Ensures continuity of service."
          },
          {
            id: "threat-hunt-4-8",
            text: "Has a set of procedures been created for this service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Procedures support process standardization and quality. Personnel should be trained to use procedures correctly and structurally.",
            remarks: "Ensures standardized procedures."
          },
          {
            id: "threat-hunt-4-9",
            text: "Is there an onboarding and offloading procedure for this service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Customer onboarding and offloading procedures support efficient service delivery and ensure customers are (dis)connected properly.",
            remarks: "Ensures smooth transitions for customers."
          },
          {
            id: "threat-hunt-4-10",
            text: "Are best practices applied to the service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Best practices should be used to optimize this service.",
            remarks: "Ensures the service follows best practices."
          },
          {
            id: "threat-hunt-4-11",
            text: "Is process data gathered for prediction of service performance?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Service performance measurement requires establishment of performance goals.",
            remarks: "Enables performance prediction."
          },
          {
            id: "threat-hunt-4-12",
            text: "Is the service continuously being improved based on improvement goals?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Improvement based on evaluation, (maturity) assessment, tests, etc.",
            remarks: "Ensures continuous improvement."
          },
          {
            id: "threat-hunt-5",
            text: "Capabilities and Artefacts",
            type: "header",
            isHeader: true
          },
          {
            id: "threat-hunt-5-1",
            text: "Hash value hunting",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "'Trivial', lowest added value as these change swiftly.",
            remarks: "Ensures hash value hunting is performed."
          },
          {
            id: "threat-hunt-5-2",
            text: "IP address hunting",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "'Easy', low added value.",
            remarks: "Ensures IP address hunting is performed."
          },
          {
            id: "threat-hunt-5-3",
            text: "Domain name hunting",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "'Simple', somewhat higher added value.",
            remarks: "Ensures domain name hunting is performed."
          },
          {
            id: "threat-hunt-5-4",
            text: "Network artefact hunting",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "'Annoying', includes network flow, packet capture, proxy logs, active network connections, historic connections, ports and services.",
            remarks: "Ensures network artefact hunting is performed."
          },
          {
            id: "threat-hunt-5-5",
            text: "Host-based artefact hunting",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "'Annoying', includes users, processes, services, drivers, files, registry, hardware, memory, disk activity, network connections, etc.",
            remarks: "Ensures host-based artefact hunting is performed."
          },
          {
            id: "threat-hunt-5-6",
            text: "Adversary tools hunting",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "'Challenging', includes dual-use tools.",
            remarks: "Ensures adversary tools hunting is performed."
          },
          {
            id: "threat-hunt-5-7",
            text: "Adversary TTP hunting",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "'Tough!', requires detailed knowledge of adversaries and their modus operandi.",
            remarks: "Ensures adversary TTP hunting is performed."
          },
          {
            id: "threat-hunt-5-8",
            text: "Inbound threat hunting",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Hunting for inbound threats such as inbound connections, DNS zone transfers, inbound emails.",
            remarks: "Ensures inbound threat hunting is performed."
          },
          {
            id: "threat-hunt-5-9",
            text: "Outbound threat hunting",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Hunting for outbound threats such as C&C traffic, outbound emails.",
            remarks: "Ensures outbound threat hunting is performed."
          },
          {
            id: "threat-hunt-5-10",
            text: "Internal threat hunting",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Hunting for threats inside the organization. Hunting may focus on lateral movement or anomalous network connections.",
            remarks: "Ensures internal threat hunting is performed."
          },
          {
            id: "threat-hunt-5-11",
            text: "Outlier detection",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Using statistical methods to detect outliers, such as least frequency of occurrence.",
            remarks: "Ensures outlier detection is performed."
          },
          {
            id: "threat-hunt-5-12",
            text: "Hunting coverage",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "How well does the hunting process cover your environment? All assets & network traffic, or only partially? Scalability is key.",
            remarks: "Ensures comprehensive hunting coverage."
          },
          {
            id: "threat-hunt-5-13",
            text: "Leveraging of existing tooling",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Existing tools may include the SIEM system, firewall analysis tools, etc.",
            remarks: "Ensures leveraging of existing tooling."
          },
          {
            id: "threat-hunt-5-14",
            text: "Custom hunting scripts and tools",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Any custom scripts to assist the hunting process. May include scripts to scan end-points for particular artifacts.",
            remarks: "Ensures custom hunting scripts and tools are used."
          },
          {
            id: "threat-hunt-5-15",
            text: "Dedicated hunting platform",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Dedicated tooling for the hunting process.",
            remarks: "Ensures a dedicated hunting platform is in place."
          },
          {
            id: "threat-hunt-5-16",
            text: "Continuous hunting data collection",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Continuous collection of information can be used to alert on indicators and to preserve system state.",
            remarks: "Ensures continuous hunting data collection."
          },
          {
            id: "threat-hunt-5-17",
            text: "Historic hunting",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Hunting for indicators that may have been present on end-points in the past. Requires some sort of saved state.",
            remarks: "Ensures historic hunting is performed."
          },
          {
            id: "threat-hunt-5-18",
            text: "Automated hunting",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Fully automated hunting capability.",
            remarks: "Ensures automated hunting is performed."
          },
          {
            id: "threat-hunt-5-19",
            text: "Hunt alerting",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Automated alerting based on queries performed in the hunting process.",
            remarks: "Ensures hunt alerting is performed."
          },
          {
            id: "threat-hunt-5-20",
            text: "Vulnerability information integration",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Integration of vulnerability information into the hunting process to provide additional context.",
            remarks: "Ensures vulnerability information integration."
          },
          {
            id: "threat-hunt-5-21",
            text: "Threat intelligence integration",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Integration of threat intelligence information into the hunting process. Threat hunts should be driven by threat intelligence.",
            remarks: "Ensures threat intelligence integration."
          },
          {
            id: "threat-hunt-completeness",
            text: "Completeness",
            type: "completeness",
            guidance: "Assesses the completeness of the capabilities and artefacts.",
            remarks: "Ensures all aspects are covered."
          },
          {
            id: "threat-hunt-comments",
            text: "Comments and/or Remarks",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments."
          }
        ]
      },
      "vulnerability_management": {
        name: "Vulnerability Management",
        questions: [
          {
            id: "vuln-mgmt-1",
            text: "Service Description",
            type: "header",
            isHeader: true
          },
          {
            id: "vuln-mgmt-1-1",
            text: "Have you formally described the vulnerability management service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A service description should be in place.",
            remarks: "Ensures clarity in the service scope."
          },
          {
            id: "vuln-mgmt-2",
            text: "Vulnerability Management Service Document Elements",
            type: "header",
            isHeader: true
          },
          {
            id: "vuln-mgmt-2-1",
            text: "Key performance indicators",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Indicators to establish the performance of the service.",
            remarks: "Ensures performance is tracked."
          },
          {
            id: "vuln-mgmt-2-2",
            text: "Quality indicators",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Indicators to establish the quality of service delivery.",
            remarks: "Ensures quality is maintained."
          },
          {
            id: "vuln-mgmt-2-3",
            text: "Service dependencies",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A clear understanding of which people/process/technologies are required for adequate service delivery.",
            remarks: "Ensures dependencies are managed."
          },
          {
            id: "vuln-mgmt-2-4",
            text: "Service levels",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Agreements on minimum performance, capacity, availability, etc.",
            remarks: "Ensures service levels are met."
          },
          {
            id: "vuln-mgmt-2-5",
            text: "Hours of operation",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The operational hours for this service (e.g. 24/7).",
            remarks: "Defines service availability."
          },
          {
            id: "vuln-mgmt-2-6",
            text: "Service customers and stakeholders",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The customers and stakeholders for this service (e.g. IT management).",
            remarks: "Identifies who is affected by the service."
          },
          {
            id: "vuln-mgmt-2-7",
            text: "Purpose",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The purpose and objectives for this service.",
            remarks: "Clarifies the goals of the service."
          },
          {
            id: "vuln-mgmt-2-8",
            text: "Service input / triggers",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The service input: what triggers this service to run?",
            remarks: "Identifies what initiates the service."
          },
          {
            id: "vuln-mgmt-2-9",
            text: "Service output / deliverables",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The service output: what does the service deliver? Can be tangible (e.g. reports) or intangible (e.g. situational awareness).",
            remarks: "Defines the outcomes of the service."
          },
          {
            id: "vuln-mgmt-2-10",
            text: "Service activities",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Which activities are carried out within the scope of the service?",
            remarks: "Lists the activities involved in the service."
          },
          {
            id: "vuln-mgmt-2-11",
            text: "Service roles & responsibilities",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Which roles and responsibilities apply to this service?",
            remarks: "Defines who is responsible for what in the service."
          },
          {
            id: "vuln-mgmt-2-completeness",
            text: "Completeness",
            type: "completeness",
            guidance: "Use this outcome to determine the score for 6.2",
            remarks: "Assesses the completeness of the document elements."
          },
          {
            id: "vuln-mgmt-3",
            text: "Service Quality and Delivery",
            type: "header",
            isHeader: true
          },
          {
            id: "vuln-mgmt-3-1",
            text: "Is the service measured for quality?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Are the quality indicators from the previous questions used for reporting on the service?",
            remarks: "Ensures quality is tracked and reported."
          },
          {
            id: "vuln-mgmt-3-2",
            text: "Is the service measured for service delivery in accordance with service levels?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Service levels should be used to formally commit the SOC to service delivery.",
            remarks: "Ensures service levels are met."
          },
          {
            id: "vuln-mgmt-3-3",
            text: "Are customers and/or stakeholders regularly updated about the service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Changes to the service scope, delivery, etc.",
            remarks: "Keeps stakeholders informed."
          },
          {
            id: "vuln-mgmt-3-4",
            text: "Is there a contractual agreement between the SOC and the customers?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Contractual agreements should also cover penalties.",
            remarks: "Formalizes the service agreement."
          },
          {
            id: "vuln-mgmt-3-5",
            text: "Is sufficient personnel allocated to the process to ensure required service delivery?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Allocation of dedicated personnel will ensure highest service quality.",
            remarks: "Ensures adequate staffing for service delivery."
          },
          {
            id: "vuln-mgmt-3-6",
            text: "Is the service aligned with other relevant processes?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "e.g. the security monitoring process, and mainly the security incident management process.",
            remarks: "Ensures consistency with other processes."
          },
          {
            id: "vuln-mgmt-3-7",
            text: "Is there an incident resolution / service continuity process in place for this service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Service continuity is important to comply with contractual agreements, even in case of major incidents.",
            remarks: "Ensures continuity of service."
          },
          {
            id: "vuln-mgmt-3-8",
            text: "Has a set of procedures been created for this service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Procedures support process standardization and quality. Personnel should be trained to use procedures correctly and structurally.",
            remarks: "Ensures standardized procedures."
          },
          {
            id: "vuln-mgmt-3-9",
            text: "Is there an onboarding and offloading procedure for this service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Customer onboarding and offloading procedures support efficient service delivery and ensure customers are (dis)connected properly.",
            remarks: "Ensures smooth transitions for customers."
          },
          {
            id: "vuln-mgmt-3-10",
            text: "Are best practices applied to the service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Best practices should be used to optimize this service. Adoption of a standard like NIST 800-40r4 is part of best practices.",
            remarks: "Ensures the service follows best practices."
          },
          {
            id: "vuln-mgmt-3-11",
            text: "Is process data gathered for prediction of service performance?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Service performance measurement requires establishment of performance goals.",
            remarks: "Enables performance prediction."
          },
          {
            id: "vuln-mgmt-3-12",
            text: "Is the service continuously being improved based on improvement goals?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Improvement based on evaluation, (maturity) assessment, tests, etc.",
            remarks: "Ensures continuous improvement."
          },
          {
            id: "vuln-mgmt-4",
            text: "Capabilities and Artefacts",
            type: "header",
            isHeader: true
          },
          {
            id: "vuln-mgmt-4-1",
            text: "Network mapping",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The capability to map the entire network.",
            remarks: "Ensures network mapping is performed."
          },
          {
            id: "vuln-mgmt-4-2",
            text: "Vulnerability identification",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Capability of identification of vulnerabilities on all types of assets: systems, network components, databases, etc.",
            remarks: "Ensures vulnerability identification is performed."
          },
          {
            id: "vuln-mgmt-4-3",
            text: "Risk identification",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Identification of the risk associated with each of these vulnerabilities.",
            remarks: "Ensures risk identification is performed."
          },
          {
            id: "vuln-mgmt-4-4",
            text: "Risk acceptance",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Vulnerabilities that are not mitigated must be formally accepted and documented as such.",
            remarks: "Ensures risk acceptance is documented."
          },
          {
            id: "vuln-mgmt-4-5",
            text: "Security baseline scanning",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Scanning of systems for compliance to a security baseline (e.g. CIS baselines).",
            remarks: "Ensures security baseline scanning is performed."
          },
          {
            id: "vuln-mgmt-4-6",
            text: "Authenticated scanning",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Scanning of systems using credentials for higher confidence and additional vulnerabilities.",
            remarks: "Ensures authenticated scanning is performed."
          },
          {
            id: "vuln-mgmt-4-7",
            text: "Incident management integration",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Integration of the vulnerability management process with the incident management process.",
            remarks: "Ensures incident management integration."
          },
          {
            id: "vuln-mgmt-4-8",
            text: "Asset management integration",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Integration of the vulnerability management process with the asset management process.",
            remarks: "Ensures asset management integration."
          },
          {
            id: "vuln-mgmt-4-9",
            text: "Configuration management integration",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Integration of the vulnerability management process with the configuration management process.",
            remarks: "Ensures configuration management integration."
          },
          {
            id: "vuln-mgmt-4-10",
            text: "Patch management integration",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Integration of the vulnerability management process with the patch management process.",
            remarks: "Ensures patch management integration."
          },
          {
            id: "vuln-mgmt-4-11",
            text: "Trend identification",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Identification of vulnerability trends across the whole population of systems.",
            remarks: "Ensures trend identification is performed."
          },
          {
            id: "vuln-mgmt-4-12",
            text: "Enterprise vulnerability repository",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A repository or database that holds all vulnerability information. Can be used for analysis.",
            remarks: "Ensures an enterprise vulnerability repository is in place."
          },
          {
            id: "vuln-mgmt-4-13",
            text: "Enterprise application inventory",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "An inventory of all applications used in the enterprise and the vulnerability status for each of those applications.",
            remarks: "Ensures an enterprise application inventory is maintained."
          },
          {
            id: "vuln-mgmt-4-14",
            text: "Vulnerability Management procedures",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Procedures supporting the vulnerability management process.",
            remarks: "Ensures vulnerability management procedures are in place."
          },
          {
            id: "vuln-mgmt-4-15",
            text: "Scanning policy tuning",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Continuous tuning of the scanning policy to include new threats and vulnerabilities.",
            remarks: "Ensures scanning policy tuning is performed."
          },
          {
            id: "vuln-mgmt-4-16",
            text: "Detailed Vulnerability Reporting",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Detailed reporting of vulnerable assets and mitigation strategies.",
            remarks: "Ensures detailed vulnerability reporting is performed."
          },
          {
            id: "vuln-mgmt-4-17",
            text: "Management Reporting",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A management report that contains an overview of the vulnerability status in the organization.",
            remarks: "Ensures management reporting is performed."
          },
          {
            id: "vuln-mgmt-4-18",
            text: "Scheduled scanning",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A scheduling engine that allows for scanning at predefined times and insight into all available scans.",
            remarks: "Ensures scheduled scanning is performed."
          },
          {
            id: "vuln-mgmt-4-19",
            text: "Ad-hoc specific scanning",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "e.g. capability to scan for specific vulnerabilities. May require consent and other processes to be in place.",
            remarks: "Ensures ad-hoc specific scanning is performed."
          },
          {
            id: "vuln-mgmt-4-20",
            text: "Vulnerability information gathering & analysis",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Gathering & analyzing information from internal and external sources, including external researchers, bulletins, and other feeds.",
            remarks: "Ensures vulnerability information gathering & analysis is performed."
          },
          {
            id: "vuln-mgmt-completeness",
            text: "Completeness",
            type: "completeness",
            guidance: "Assesses the completeness of the capabilities and artefacts.",
            remarks: "Ensures all aspects are covered."
          },
          {
            id: "vuln-mgmt-comments",
            text: "Comments and/or Remarks",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments."
          }
        ]
      },
      "log_management": {
        name: "Log Management",
        questions: [
          {
            id: "log-mgmt-1",
            text: "Service Description",
            type: "header",
            isHeader: true
          },
          {
            id: "log-mgmt-1-1",
            text: "Have you formally described the log management service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A service description should be in place.",
            remarks: "Ensures clarity in the service scope."
          },
          {
            id: "log-mgmt-2",
            text: "Log Management Service Document Elements",
            type: "header",
            isHeader: true
          },
          {
            id: "log-mgmt-2-1",
            text: "Key performance indicators",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Indicators to establish the performance of the service.",
            remarks: "Ensures performance is tracked."
          },
          {
            id: "log-mgmt-2-2",
            text: "Quality indicators",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Indicators to establish the quality of service delivery.",
            remarks: "Ensures quality is maintained."
          },
          {
            id: "log-mgmt-2-3",
            text: "Service dependencies",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A clear understanding of which people/process/technologies are required for adequate service delivery.",
            remarks: "Ensures dependencies are managed."
          },
          {
            id: "log-mgmt-2-4",
            text: "Service levels",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Agreements on minimum performance, capacity, availability, etc.",
            remarks: "Ensures service levels are met."
          },
          {
            id: "log-mgmt-2-5",
            text: "Hours of operation",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The operational hours for this service (e.g. 24/7).",
            remarks: "Defines service availability."
          },
          {
            id: "log-mgmt-2-6",
            text: "Service customers and stakeholders",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The customers and stakeholders for this service (e.g. IT management).",
            remarks: "Identifies who is affected by the service."
          },
          {
            id: "log-mgmt-2-7",
            text: "Purpose",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The purpose and objectives for this service.",
            remarks: "Clarifies the goals of the service."
          },
          {
            id: "log-mgmt-2-8",
            text: "Service input / triggers",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The service input: what triggers this service to run?",
            remarks: "Identifies what initiates the service."
          },
          {
            id: "log-mgmt-2-9",
            text: "Service output / deliverables",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The service output: what does the service deliver? Can be tangible (e.g. reports) or intangible (e.g. situational awareness).",
            remarks: "Defines the outcomes of the service."
          },
          {
            id: "log-mgmt-2-10",
            text: "Service activities",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Which activities are carried out within the scope of the service?",
            remarks: "Lists the activities involved in the service."
          },
          {
            id: "log-mgmt-2-11",
            text: "Service roles & responsibilities",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Which roles and responsibilities apply to this service?",
            remarks: "Defines who is responsible for what in the service."
          },
          {
            id: "log-mgmt-2-completeness",
            text: "Completeness",
            type: "completeness",
            guidance: "Use this outcome to determine the score for 7.2",
            remarks: "Assesses the completeness of the document elements."
          },
          {
            id: "log-mgmt-3",
            text: "Service Quality and Delivery",
            type: "header",
            isHeader: true
          },
          {
            id: "log-mgmt-3-1",
            text: "Is the service measured for quality?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Are the quality indicators from the previous questions used for reporting on the service?",
            remarks: "Ensures quality is tracked and reported."
          },
          {
            id: "log-mgmt-3-2",
            text: "Is the service measured for service delivery in accordance with service levels?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Service levels should be used to formally commit the SOC to service delivery.",
            remarks: "Ensures service levels are met."
          },
          {
            id: "log-mgmt-3-3",
            text: "Are customers and/or stakeholders regularly updated about the service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Changes to the service scope, delivery, etc.",
            remarks: "Keeps stakeholders informed."
          },
          {
            id: "log-mgmt-3-4",
            text: "Is there a contractual agreement between the SOC and the customers?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Contractual agreements should also cover penalties.",
            remarks: "Formalizes the service agreement."
          },
          {
            id: "log-mgmt-3-5",
            text: "Is sufficient personnel allocated to the process to ensure required service delivery?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Allocation of dedicated personnel will ensure highest service quality.",
            remarks: "Ensures adequate staffing for service delivery."
          },
          {
            id: "log-mgmt-3-6",
            text: "Is the service aligned with other relevant processes?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "e.g. the security monitoring process, and mainly the security incident management process.",
            remarks: "Ensures consistency with other processes."
          },
          {
            id: "log-mgmt-3-7",
            text: "Is there an incident resolution / service continuity process in place for this service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Service continuity is important to comply with contractual agreements, even in case of major incidents.",
            remarks: "Ensures continuity of service."
          },
          {
            id: "log-mgmt-3-8",
            text: "Has a set of procedures been created for this service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Procedures support process standardization and quality. Personnel should be trained to use procedures correctly and structurally.",
            remarks: "Ensures standardized procedures."
          },
          {
            id: "log-mgmt-3-9",
            text: "Is there an onboarding and offloading procedure for this service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Customer onboarding and offloading procedures support efficient service delivery and ensure customers are (dis)connected properly.",
            remarks: "Ensures smooth transitions for customers."
          },
          {
            id: "log-mgmt-3-10",
            text: "Are best practices applied to the service?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Best practices should be used to optimize this service.",
            remarks: "Ensures the service follows best practices."
          },
          {
            id: "log-mgmt-3-11",
            text: "Is process data gathered for prediction of service performance?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Service performance measurement requires establishment of performance goals.",
            remarks: "Enables performance prediction."
          },
          {
            id: "log-mgmt-3-12",
            text: "Is the service continuously being improved based on improvement goals?",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Improvement based on evaluation, (maturity) assessment, tests, etc.",
            remarks: "Ensures continuous improvement."
          },
          {
            id: "log-mgmt-4",
            text: "Capabilities and Artefacts",
            type: "header",
            isHeader: true
          },
          {
            id: "log-mgmt-4-1",
            text: "End-point log collection",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Collection of logs from servers and clients.",
            remarks: "Ensures end-point log collection is performed."
          },
          {
            id: "log-mgmt-4-2",
            text: "Application log collection",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Collection of application logs.",
            remarks: "Ensures application log collection is performed."
          },
          {
            id: "log-mgmt-4-3",
            text: "Database log collection",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Collection of database logs.",
            remarks: "Ensures database log collection is performed."
          },
          {
            id: "log-mgmt-4-4",
            text: "Network flow data collection",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Collection of netflow (or equivalent) information.",
            remarks: "Ensures network flow data collection is performed."
          },
          {
            id: "log-mgmt-4-5",
            text: "Network device log collection",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Collection of logs from network devices (switches, routers, etc.).",
            remarks: "Ensures network device log collection is performed."
          },
          {
            id: "log-mgmt-4-6",
            text: "Security device log collection",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Collection of logs from security devices (firewall, remote access gateways, etc.).",
            remarks: "Ensures security device log collection is performed."
          },
          {
            id: "log-mgmt-4-7",
            text: "Centralized aggregation and storage",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A central physical or logical entity for processing and aggregating collected logging.",
            remarks: "Ensures centralized aggregation and storage."
          },
          {
            id: "log-mgmt-4-8",
            text: "Multiple retention periods",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "e.g. short period for large-quantity logging (proxy logging), long period for security logging.",
            remarks: "Ensures multiple retention periods are supported."
          },
          {
            id: "log-mgmt-4-9",
            text: "Secure log transfer",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Support for encryption and (client or server) authentication.",
            remarks: "Ensures secure log transfer is supported."
          },
          {
            id: "log-mgmt-4-10",
            text: "Support for multiple log formats",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Support for different log formats (plain text, XML, Windows Event Log, etc.).",
            remarks: "Ensures support for multiple log formats."
          },
          {
            id: "log-mgmt-4-11",
            text: "Support for multiple transfer techniques",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "e.g. syslog, WMI, etc.",
            remarks: "Ensures support for multiple transfer techniques."
          },
          {
            id: "log-mgmt-4-12",
            text: "Data normalization",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "i.e. assignment of severity, category, priority.",
            remarks: "Ensures data normalization is performed."
          },
          {
            id: "log-mgmt-4-13",
            text: "Log searching and filtering",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "The capability to search in large quantities of logging using search expressions and filter expressions.",
            remarks: "Ensures log searching and filtering is supported."
          },
          {
            id: "log-mgmt-4-14",
            text: "Alerting",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Basic alerting functions based on log contents or normalized information (severity, etc.).",
            remarks: "Ensures alerting is supported."
          },
          {
            id: "log-mgmt-4-15",
            text: "Reporting and dashboards",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Reports and dashboards for visualization of log information.",
            remarks: "Ensures reporting and dashboards are available."
          },
          {
            id: "log-mgmt-4-16",
            text: "Log tampering detection",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Detection of tampering with the logging information. This can be part of techniques applied to cover tracks.",
            remarks: "Ensures log tampering detection is supported."
          },
          {
            id: "log-mgmt-4-17",
            text: "Log collection policy",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A policy that enforces log collection from all systems.",
            remarks: "Ensures a log collection policy is in place."
          },
          {
            id: "log-mgmt-4-18",
            text: "Logging policy",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "Policy to enforce the generation of a minimum set of operational and security logs (e.g. authentication, authorization).",
            remarks: "Ensures a logging policy is in place."
          },
          {
            id: "log-mgmt-4-19",
            text: "Data retention policy",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A policy that defines how long logging should (or may) be stored.",
            remarks: "Ensures a data retention policy is in place."
          },
          {
            id: "log-mgmt-4-20",
            text: "Privacy and sensitive data handling policy",
            type: "dropdown",
            options: ["No", "Yes"],
            guidance: "A policy that describes how to deal with sensitive information that may exist in the security monitoring systems.",
            remarks: "Ensures a privacy and sensitive data handling policy is in place."
          },
          {
            id: "log-mgmt-completeness",
            text: "Completeness",
            type: "completeness",
            guidance: "Assesses the completeness of the capabilities and artefacts.",
            remarks: "Ensures all aspects are covered."
          },
          {
            id: "log-mgmt-comments",
            text: "Comments and/or Remarks",
            type: "text",
            guidance: "Space to provide any relevant context or any additional comments."
          }
        ]
      }
    }
  }
};

const AssessmentPage = () => {
  const { domain, subdomain } = useParams<{ domain?: string; subdomain?: string }>();
  const navigate = useNavigate();
  
  const [progress, setProgress] = useState<Record<string, Record<string, boolean>>>({});
  const [currentDomain, setCurrentDomain] = useState<string | undefined>(domain);
  const [currentSubdomain, setCurrentSubdomain] = useState<string | undefined>(subdomain);

  useEffect(() => {
    if (!domain && !subdomain) {
      const firstDomain = Object.keys(assessmentData)[0];
      const firstSubdomain = Object.keys(assessmentData[firstDomain].subdomains)[0];
      navigate(`/assessment/${firstDomain}/${firstSubdomain}`);
    } else {
      setCurrentDomain(domain);
      setCurrentSubdomain(subdomain);
    }
  }, [domain, subdomain, navigate]);

  const totalSections = Object.keys(assessmentData).reduce(
    (total, domainKey) => total + Object.keys(assessmentData[domainKey].subdomains).length,
    0
  );
  
  const completedSections = Object.values(progress).reduce(
    (total, domainProgress) => total + Object.values(domainProgress).filter(Boolean).length,
    0
  );

  const handleCompleteSection = (domain: string, subdomain: string) => {
    setProgress((prevProgress) => ({
      ...prevProgress,
      [domain]: {
        ...(prevProgress[domain] || {}),
        [subdomain]: true,
      },
    }));
    
    const domains = Object.keys(assessmentData);
    const currentDomainIndex = domains.indexOf(domain);
    
    const subdomains = Object.keys(assessmentData[domain].subdomains);
    const currentSubdomainIndex = subdomains.indexOf(subdomain);
    
    if (currentSubdomainIndex < subdomains.length - 1) {
      const nextSubdomain = subdomains[currentSubdomainIndex + 1];
      navigate(`/assessment/${domain}/${nextSubdomain}`);
    } 
    else if (currentDomainIndex < domains.length - 1) {
      const nextDomain = domains[currentDomainIndex + 1];
      const firstSubdomainOfNextDomain = Object.keys(assessmentData[nextDomain].subdomains)[0];
      navigate(`/assessment/${nextDomain}/${firstSubdomainOfNextDomain}`);
    }
    else {
      toast.success("Assessment completed! View your results.");
      navigate("/results");
    }
  };

  const renderContent = () => {
    if (!currentDomain || !currentSubdomain) {
      return (
        <div className="p-8 text-center">
          <p className="text-gray-500 mb-4">Please select a domain and subdomain to begin.</p>
        </div>
      );
    }

    const domainData = assessmentData[currentDomain as keyof typeof assessmentData];
    if (!domainData) {
      return (
        <div className="p-8 text-center">
          <p className="text-red-500 mb-4">Domain not found.</p>
          <Button asChild variant="outline">
            <Link to="/assessment">Go to Assessment</Link>
          </Button>
        </div>
      );
    }

    const subdomainData = domainData.subdomains[currentSubdomain as keyof typeof domainData.subdomains];
    if (!subdomainData) {
      return (
        <div className="p-8 text-center">
          <p className="text-red-500 mb-4">Subdomain not found.</p>
          <Button asChild variant="outline">
            <Link to={`/assessment/${currentDomain}`}>Go to {domainData.name}</Link>
          </Button>
        </div>
      );
    }

    const domains = Object.keys(assessmentData);
    const currentDomainIndex = domains.indexOf(currentDomain);
    const subdomains = Object.keys(assessmentData[currentDomain].subdomains);
    const currentSubdomainIndex = subdomains.indexOf(currentSubdomain);
    
    let nextUrl;
    if (currentSubdomainIndex < subdomains.length - 1) {
      const nextSubdomain = subdomains[currentSubdomainIndex + 1];
      nextUrl = `/assessment/${currentDomain}/${nextSubdomain}`;
    } else if (currentDomainIndex < domains.length - 1) {
      const nextDomain = domains[currentDomainIndex + 1];
      const firstSubdomainOfNextDomain = Object.keys(assessmentData[nextDomain].subdomains)[0];
      nextUrl = `/assessment/${nextDomain}/${firstSubdomainOfNextDomain}`;
    } else {
      nextUrl = "/results";
    }

    return (
      <div className="px-8 py-6">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-assessment-blue-700">
              {domainData.name}: {subdomainData.name}
            </h2>
            <Button variant="ghost" asChild className="text-gray-500">
              <Link to="/dashboard">
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Link>
            </Button>
          </div>
          <ProgressBar 
            value={completedSections} 
            max={totalSections} 
            className="mb-6"
          />
        </div>
        
        <QuestionForm 
          questions={subdomainData.questions}
          domain={currentDomain}
          subdomain={currentSubdomain}
          onComplete={handleCompleteSection}
          nextUrl={nextUrl}
        />
      </div>
    );
  };

  const getPageTitle = () => {
    if (!currentDomain || !currentSubdomain) return "Assessment";
    
    const domainData = assessmentData[currentDomain as keyof typeof assessmentData];
    if (!domainData) return "Assessment";
    
    const subdomainData = domainData.subdomains[currentSubdomain as keyof typeof domainData.subdomains];
    if (!subdomainData) return domainData.name;
    
    return `${domainData.name}: ${subdomainData.name}`;
  };

  return (
    <div className="min-h-screen flex">
      <AssessmentSidebar progress={progress} />
      
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b px-8 py-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="mr-2">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <h1 className="text-xl font-bold text-assessment-blue-600">{getPageTitle()}</h1>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {renderContent()}
        </main>
        
        <footer className="bg-white border-t px-8 py-4 flex justify-between items-center">
          <Button variant="outline" onClick={() => navigate("/dashboard")}>
            Exit
          </Button>
          <Button variant="outline" className="ml-auto mr-2">
            <Save className="h-4 w-4 mr-2" />
            Save Progress
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default AssessmentPage;
