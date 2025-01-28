import BuyerTable from "@/components/entryTable"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-white text-center mb-8">Purchase Entries</h1>
        <BuyerTable />
      </div>
    </div>
  )
}