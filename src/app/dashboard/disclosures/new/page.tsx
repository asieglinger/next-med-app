"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"
import { Textarea } from "~/components/ui/textarea"
import { Checkbox } from "~/components/ui/checkbox"
import { Shield, ArrowLeft, Plus, Trash2 } from "lucide-react"

// Define the financial interest type options
const financialInterestTypes = [
  { id: "no-compensation", label: "No Compensation" },
  { id: "compensation-salary", label: "Compensation/Salary" },
  { id: "stock-options", label: "Stock - Options" },
  { id: "stock-shares", label: "Stock - Shares" },
  { id: "royalty-arrangement", label: "Royalty Arrangement" },
  { id: "consulting-fees", label: "Consulting Fees" },
  { id: "witness-consulting-fees", label: "Witness Consulting Fees" },
  { id: "speaking-engagement", label: "Payment for Speaking Engagement" },
  { id: "employee-owner", label: "Employee / Owner" },
  { id: "food-beverage", label: "Food & Beverage" },
  { id: "gift", label: "Gift" },
  { id: "other", label: "Other" },
]

// Define the investment amount ranges
const investmentRanges = [
  { value: "0-1000", label: "$0 - $1,000" },
  { value: "1001-2500", label: "$1,001 - $2,500" },
  { value: "2501-5000", label: "$2,501 - $5,000" },
  { value: "5001-10000", label: "$5,001 - $10,000" },
  { value: "10001-25000", label: "$10,001 - $25,000" },
  { value: "25001-50000", label: "$25,001 - $50,000" },
  { value: "50001-100000", label: "$50,001 - $100,000" },
  { value: "100001-plus", label: "Over $100,000" },
]

// Define the disclosure interface
interface Disclosure {
  companyName: string
  companyType: "public" | "private" | ""
  investmentAmount: string
  relationshipEnded: "yes" | "no" | ""
  interestTypes: string[]
  explanation: string
}

// Initial empty disclosure
const emptyDisclosure: Disclosure = {
  companyName: "",
  companyType: "",
  investmentAmount: "",
  relationshipEnded: "",
  interestTypes: [],
  explanation: "",
}

export default function NewDisclosurePage() {
  // State for the initial question
  const [hasConflicts, setHasConflicts] = useState<string | null>(null)

  // State for the disclosures
  const [disclosures, setDisclosures] = useState<Disclosure[]>([{ ...emptyDisclosure }])

  // State for the confirmation checkbox
  const [confirmed, setConfirmed] = useState(false)

  // Handle the initial question response
  const handleInitialQuestion = (value: string) => {
    setHasConflicts(value)
  }

  // Add a new disclosure
  const addDisclosure = () => {
    setDisclosures([...disclosures, { ...emptyDisclosure }])
  }

  // Remove a disclosure
  const removeDisclosure = (index: number) => {
    const updatedDisclosures = [...disclosures]
    updatedDisclosures.splice(index, 1)
    setDisclosures(updatedDisclosures)

    // If no disclosures left, reset to initial question
    if (updatedDisclosures.length === 0) {
      setHasConflicts(null)
      setDisclosures([{ ...emptyDisclosure }])
    }
  }

  // Update a disclosure field
  const updateDisclosure = (index: number, field: keyof Disclosure, value: any) => {
    const updatedDisclosures = [...disclosures]
    updatedDisclosures[index] = { ...updatedDisclosures[index], [field]: value }
    setDisclosures(updatedDisclosures)
  }

  // Toggle a financial interest type
  const toggleInterestType = (index: number, typeId: string) => {
    const disclosure = disclosures[index]
    const updatedTypes = disclosure.interestTypes.includes(typeId)
      ? disclosure.interestTypes.filter((id) => id !== typeId)
      : [...disclosure.interestTypes, typeId]

    updateDisclosure(index, "interestTypes", updatedTypes)
  }

  // Handle form submission
  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Submitting disclosures:", disclosures)

    // For demo purposes, redirect to dashboard
    window.location.href = "/dashboard"
  }

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
          </nav>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <Link href="/dashboard" className="flex items-center text-sm text-gray-500 hover:text-gray-900">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="mt-4 text-3xl font-bold">New Disclosure</h1>
            <p className="text-gray-500">Disclose any financial conflicts of interest you may have.</p>
          </div>

          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Conflict of Interest Disclosure</CardTitle>
              <CardDescription>Please answer the following questions about your financial interests.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Initial question */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Do you have any conflicts of interest to disclose?</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={hasConflicts === "yes" ? "default" : "outline"}
                    className={`h-16 text-lg ${hasConflicts === "yes" ? "bg-teal-600 hover:bg-teal-700" : ""}`}
                    onClick={() => handleInitialQuestion("yes")}
                  >
                    Yes
                  </Button>
                  <Button
                    variant={hasConflicts === "no" ? "default" : "outline"}
                    className={`h-16 text-lg ${hasConflicts === "no" ? "bg-teal-600 hover:bg-teal-700" : ""}`}
                    onClick={() => handleInitialQuestion("no")}
                  >
                    No
                  </Button>
                </div>
              </div>

              {/* Show all questions if user has conflicts */}
              {hasConflicts === "yes" && (
                <div className="space-y-8 border-t pt-8">
                  {disclosures.map((disclosure, disclosureIndex) => (
                    <div key={disclosureIndex} className="space-y-8">
                      {disclosureIndex > 0 && (
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-medium">Disclosure {disclosureIndex + 1}</h3>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeDisclosure(disclosureIndex)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      )}

                      {/* Company Name */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Investment / Company Name</h3>
                        <Input
                          value={disclosure.companyName}
                          onChange={(e) => updateDisclosure(disclosureIndex, "companyName", e.target.value)}
                          placeholder="Enter company or investment name"
                        />
                      </div>

                      {/* Company Type */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Public or Private Company?</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            variant={disclosure.companyType === "public" ? "default" : "outline"}
                            className={`h-16 text-lg ${
                              disclosure.companyType === "public" ? "bg-teal-600 hover:bg-teal-700" : ""
                            }`}
                            onClick={() => updateDisclosure(disclosureIndex, "companyType", "public")}
                          >
                            Public
                          </Button>
                          <Button
                            variant={disclosure.companyType === "private" ? "default" : "outline"}
                            className={`h-16 text-lg ${
                              disclosure.companyType === "private" ? "bg-teal-600 hover:bg-teal-700" : ""
                            }`}
                            onClick={() => updateDisclosure(disclosureIndex, "companyType", "private")}
                          >
                            Private
                          </Button>
                        </div>
                      </div>

                      {/* Investment Amount */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">
                          Current Total Amount of Investment or Financial Interest
                        </h3>
                        <Select
                          value={disclosure.investmentAmount}
                          onValueChange={(value) => updateDisclosure(disclosureIndex, "investmentAmount", value)}
                        >
                          <SelectTrigger className="h-12 text-base">
                            <SelectValue placeholder="Select an amount range" />
                          </SelectTrigger>
                          <SelectContent>
                            {investmentRanges.map((range) => (
                              <SelectItem key={range.value} value={range.value}>
                                {range.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Relationship Status */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Has the Relationship Ended?</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <Button
                            variant={disclosure.relationshipEnded === "yes" ? "default" : "outline"}
                            className={`h-16 text-lg ${
                              disclosure.relationshipEnded === "yes" ? "bg-teal-600 hover:bg-teal-700" : ""
                            }`}
                            onClick={() => updateDisclosure(disclosureIndex, "relationshipEnded", "yes")}
                          >
                            Yes
                          </Button>
                          <Button
                            variant={disclosure.relationshipEnded === "no" ? "default" : "outline"}
                            className={`h-16 text-lg ${
                              disclosure.relationshipEnded === "no" ? "bg-teal-600 hover:bg-teal-700" : ""
                            }`}
                            onClick={() => updateDisclosure(disclosureIndex, "relationshipEnded", "no")}
                          >
                            No
                          </Button>
                        </div>
                      </div>

                      {/* Financial Interest Types */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Type of Financial Interest (Select All That Apply)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {financialInterestTypes.map((type) => (
                            <div
                              key={type.id}
                              className={`flex items-center p-4 border rounded-md cursor-pointer ${
                                disclosure.interestTypes.includes(type.id)
                                  ? "bg-teal-50 border-teal-600"
                                  : "hover:bg-gray-50"
                              }`}
                              onClick={() => toggleInterestType(disclosureIndex, type.id)}
                            >
                              <Checkbox
                                id={`${disclosureIndex}-${type.id}`}
                                checked={disclosure.interestTypes.includes(type.id)}
                                className="mr-3"
                              />
                              <Label htmlFor={`${disclosureIndex}-${type.id}`} className="cursor-pointer w-full">
                                {type.label}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Explanation */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Explanation</h3>
                        <Textarea
                          value={disclosure.explanation}
                          onChange={(e) => updateDisclosure(disclosureIndex, "explanation", e.target.value)}
                          placeholder="Please provide any additional details about this financial interest"
                          className="min-h-[150px]"
                        />
                      </div>
                    </div>
                  ))}

                  <Button variant="outline" onClick={addDisclosure} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Another Disclosure
                  </Button>
                </div>
              )}

              {/* Confirmation section */}
              {hasConflicts && (
                <div className="space-y-4 border-t pt-8">
                  <h3 className="text-lg font-medium">Review and Confirm</h3>

                  {hasConflicts === "no" ? (
                    <div className="rounded-lg border p-4 bg-gray-50">
                      <p>You have indicated that you have no conflicts of interest to disclose.</p>
                    </div>
                  ) : null}

                  <div
                    className={`flex items-center p-4 border rounded-md cursor-pointer w-full ${
                      confirmed ? "bg-teal-100 border-teal-600" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setConfirmed(!confirmed)}
                  >
                    <Checkbox
                      id="confirm"
                      checked={confirmed}
                      onCheckedChange={(checked) => setConfirmed(checked === true)}
                      className="mr-3"
                    />
                    <Label htmlFor="confirm" className="cursor-pointer w-full text-base">
                      I confirm that the information provided is accurate and complete to the best of my knowledge.
                    </Label>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                className="ml-auto bg-teal-600 hover:bg-teal-700"
                onClick={handleSubmit}
                disabled={
                  !hasConflicts ||
                  !confirmed ||
                  (hasConflicts === "yes" &&
                    disclosures.some(
                      (d) => !d.companyName || !d.companyType || !d.investmentAmount || !d.relationshipEnded,
                    ))
                }
              >
                Submit
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
