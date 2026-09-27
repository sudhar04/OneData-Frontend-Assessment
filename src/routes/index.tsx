import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: JobPortal,
})

function JobPortal() {
  return (
    <div>
      <h1>OneData Job Portal</h1>
      <p>Frontend Developer Assessment</p>
    </div>
  )
}