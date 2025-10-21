export interface Project {
  id: number
  title: string
  department: string
  ward: string
  status: 'Completed' | 'Ongoing' | 'Pending' | 'Not Started'
  budget: number
  financialYear: string
  contractor: string
  description: string
}
