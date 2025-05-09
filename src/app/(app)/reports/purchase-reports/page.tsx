import PurchaseTable from "@/components/PurchaseTable"

export default function Purchase() {
  return (
    <div className="min-h-screen bg-gray-950 py-8 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white tracking-wide border-b-2 border-blue-400 pb-2 inline-block">
          Purchase Records
        </h1>
        <PurchaseTable/>
      </div>
    </div>
  )
}