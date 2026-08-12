import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg(process.env.DATABASE_URL as string)
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  // Clean up existing data
  await prisma.offer.deleteMany()
  await prisma.placementDrive.deleteMany()
  await prisma.company.deleteMany()
  await prisma.student.deleteMany()
  await prisma.program.deleteMany()
  await prisma.department.deleteMany()
  await prisma.institution.deleteMany()
  await prisma.academicYear.deleteMany()

  // Create Institution
  const institution = await prisma.institution.create({
    data: { name: 'Demo University' },
  })

  // Create Department
  const department = await prisma.department.create({
    data: { name: 'Computer Science', institutionId: institution.id },
  })

  // Create Programs
  const btech = await prisma.program.create({
    data: { name: 'B.Tech CSE', departmentId: department.id },
  })
  const mca = await prisma.program.create({
    data: { name: 'MCA', departmentId: department.id },
  })

  // Create Academic Year
  const academicYear = await prisma.academicYear.create({
    data: { year: '2023-2024' },
  })

  // Create Companies
  const companies = []
  const companyNames = ['TCS', 'Infosys', 'Amazon', 'Microsoft', 'Google', 'Wipro', 'Cognizant', 'IBM']
  for (const name of companyNames) {
    const company = await prisma.company.create({
      data: {
        name,
        industry: 'IT Services / Product',
        location: 'Bangalore',
      },
    })
    companies.push(company)
  }

  // Create Placement Drives
  const drives = []
  for (const company of companies) {
    const drive = await prisma.placementDrive.create({
      data: {
        name: `${company.name} Campus Drive 2024`,
        companyId: company.id,
        driveDate: new Date(),
        academicYearId: academicYear.id,
        jobRole: 'Software Engineer',
        status: 'COMPLETED',
      },
    })
    drives.push(drive)
  }

  // Create Students (50 students)
  const students = []
  for (let i = 1; i <= 50; i++) {
    const student = await prisma.student.create({
      data: {
        registerNumber: `REG${i.toString().padStart(4, '0')}`,
        name: `Student ${i}`,
        email: `student${i}@demo.edu`,
        programId: i <= 35 ? btech.id : mca.id, // 35 BTech, 15 MCA
        academicYearId: academicYear.id,
        eligibilityStatus: i <= 40 ? 'ELIGIBLE' : 'NOT_ELIGIBLE', // 40 eligible
      },
    })
    students.push(student)
  }

  // Create Offers
  // Distribute ~40 offers. Let's make some students have multiple offers, but at most 1 accepted.
  // We'll give 25 students a single accepted offer.
  // We'll give 5 students one accepted and one declined offer.
  // We'll give 5 students one declined offer only.

  const eligibleStudents = students.filter(s => s.eligibilityStatus === 'ELIGIBLE')
  
  // 25 students with 1 accepted offer
  for (let i = 0; i < 25; i++) {
    const student = eligibleStudents[i]
    const drive = drives[i % drives.length]
    await prisma.offer.create({
      data: {
        studentId: student.id,
        companyId: drive.companyId,
        placementDriveId: drive.id,
        ctc: Math.floor(Math.random() * 18) + 4, // 4 to 22
        offerStatus: 'ACCEPTED',
        joiningStatus: 'JOINED',
        placementStatus: 'PLACED',
      },
    })
  }

  // 5 students with 1 accepted and 1 declined offer
  for (let i = 25; i < 30; i++) {
    const student = eligibleStudents[i]
    const drive1 = drives[i % drives.length]
    const drive2 = drives[(i + 1) % drives.length]
    
    await prisma.offer.create({
      data: {
        studentId: student.id,
        companyId: drive1.companyId,
        placementDriveId: drive1.id,
        ctc: 4,
        offerStatus: 'DECLINED',
      },
    })
    
    await prisma.offer.create({
      data: {
        studentId: student.id,
        companyId: drive2.companyId,
        placementDriveId: drive2.id,
        ctc: Math.floor(Math.random() * 15) + 8, // 8 to 22
        offerStatus: 'ACCEPTED',
        joiningStatus: 'PENDING',
        placementStatus: 'PLACED',
      },
    })
  }

  // 5 students with 1 declined offer only
  for (let i = 30; i < 35; i++) {
    const student = eligibleStudents[i]
    const drive = drives[i % drives.length]
    await prisma.offer.create({
      data: {
        studentId: student.id,
        companyId: drive.companyId,
        placementDriveId: drive.id,
        ctc: 5,
        offerStatus: 'DECLINED',
        placementStatus: 'UNPLACED',
      },
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
