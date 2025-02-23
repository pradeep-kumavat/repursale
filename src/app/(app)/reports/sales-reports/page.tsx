import SalesTable from "@/components/SalesTable"
export default function Sales() {
  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white text-center mb-8">Sales Records</h1>
        <SalesTable/>
      </div>
    </div>
  )
}