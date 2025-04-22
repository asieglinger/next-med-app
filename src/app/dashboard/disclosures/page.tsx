import Link from "next/link"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Shield, Plus, FileText } from "lucide-react"

export default function DisclosuresPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-teal-600" />
              <span className="text-xl font-bold">MedCred</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
              Dashboard
            </Link>
            <Link href="/dashboard/disclosures" className="text-sm font-medium hover:underline underline-offset-4">
              My Disclosures
            </Link>
            <Link href="/dashboard/profile" className="text-sm font-medium hover:underline underline-offset-4">
              Profile
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">My Disclosures</h1>
            <Link href="/dashboard/disclosures/new">
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Plus className="mr-2 h-4 w-4" />
                New Disclosure
              </Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Conflict of Interest Disclosures</CardTitle>
              <CardDescription>View and manage your conflict of interest disclosures</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium mb-2">No disclosures yet</h3>
                <p className="text-sm text-gray-500 max-w-md mb-6">
                  You haven't created any conflict of interest disclosures yet. Create your first disclosure to get
                  started.
                </p>
                <Link href="/dashboard/disclosures/new">
                  <Button className="bg-teal-600 hover:bg-teal-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Disclosure
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
