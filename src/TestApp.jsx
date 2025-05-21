import React from 'react'

function TestApp() {
  return (
    <div>
      <div className="test-bg">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Test Component (Regular CSS)</h1>
        <p style={{ marginTop: '1rem' }}>This is using regular CSS classes.</p>
      </div>

      <div className="p-8 bg-blue-500 text-white mt-4">
        <h1 className="text-3xl font-bold">Test Component (Tailwind)</h1>
        <p className="mt-4">This is a test component to check if Tailwind CSS is working.</p>
      </div>
    </div>
  )
}

export default TestApp
