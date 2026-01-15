"use client";

import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Loader,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import { fetchMarketingCycleLeads } from "@/action/lead.actions";
import { tokenManager } from "@/lib/http/token-manager";
import { Lead } from "@/schemas/lead.schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components";

export default function LeadsPage() {
  const { cycleId } = useParams();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<string>("all");

  useEffect(() => {
    const fetchLeads = async () => {
      const token = await tokenManager.getAccessToken();

      if (!token || !cycleId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetchMarketingCycleLeads(
          cycleId as string,
          token,
        );
        setLeads(response.data.items);
      } catch (error_: unknown) {
        let errorMessage = "Failed to fetch leads";

        if (
          typeof error_ === "object" &&
          error_ !== null &&
          "message" in error_ &&
          typeof (error_ as any).message === "string"
        ) {
          errorMessage = (error_ as any).message;
        }

        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, [cycleId]);

  const toggleRow = (leadId: string) => {
    setExpandedRow(expandedRow === leadId ? null : leadId);
  };

  const isToday = (date: string | Date) => {
    const today = new Date();
    const compareDate = new Date(date);
    return (
      compareDate.getDate() === today.getDate() &&
      compareDate.getMonth() === today.getMonth() &&
      compareDate.getFullYear() === today.getFullYear()
    );
  };

  const uniqueCourses = Array.from(
    new Set(
      leads.map((lead) =>
        JSON.stringify({ id: lead.course.id, name: lead.course.name }),
      ),
    ),
  ).map((course) => JSON.parse(course));

  const filteredLeads =
    selectedCourse === "all"
      ? leads
      : leads.filter((lead) => lead.course.id === selectedCourse);

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Loader className="h-6 w-6 animate-spin text-mid-blue" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto lg:px-4 lg:py-6">
      {/* Header Section */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="rounded p-1 text-gray-500 hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 md:text-xl">
              Marketing Cycle Leads
            </h1>
            <p className="text-xs text-gray-500 md:text-sm">
              View and manage leads for this marketing cycle
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label
            htmlFor="course-filter"
            className="text-sm font-medium text-gray-700 sm:whitespace-nowrap"
          >
            Filter by Course:
          </label>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger className="w-full sm:w-[250px]">
              <SelectValue placeholder="All Courses" />
            </SelectTrigger>
            <SelectContent
              className="max-h-[300px] w-[var(--radix-select-trigger-width)] max-w-[90vw]"
              position="popper"
              sideOffset={5}
            >
              <SelectItem value="all">All Courses</SelectItem>
              {uniqueCourses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden rounded-lg bg-white shadow md:block">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="border-b bg-gray-50 text-left">
                <th className="w-8 px-4 py-3"></th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-900">
                  Name
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-900">
                  Contact
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-900">
                  Course
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-900">
                  Cohort
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-900">
                  Newsletter
                </th>
                <th className="px-6 py-3 text-sm font-semibold text-gray-900">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredLeads.map((lead) => (
                <Fragment key={lead.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <button
                        onClick={() => toggleRow(lead.id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {expandedRow === lead.id ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-gray-900">
                          {lead.firstName} {lead.lastName}
                        </div>
                        {isToday(lead.createdAt) && (
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800">
                            New
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="h-4 w-4" />
                          {lead.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4" />
                          {lead.phoneNumber}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {lead.course.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {lead.cohort.name}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs font-semibold ${
                          lead.joinNewsLetter
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {lead.joinNewsLetter ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                  {expandedRow === lead.id && (
                    <tr className="bg-gray-50">
                      <td colSpan={7} className="px-6 py-4">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <div className="space-y-4">
                            <h4 className="font-medium text-gray-900">
                              Personal Information
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <User className="h-4 w-4" />
                                <span className="font-medium">Full Name:</span>
                                {lead.firstName} {lead.lastName}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Mail className="h-4 w-4" />
                                <span className="font-medium">Email:</span>
                                <a
                                  href={`mailto:${lead.email}`}
                                  className="text-blue-600 hover:underline"
                                >
                                  {lead.email}
                                </a>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Phone className="h-4 w-4" />
                                <span className="font-medium">Phone:</span>
                                <a
                                  href={`tel:${lead.phoneNumber}`}
                                  className="text-blue-600 hover:underline"
                                >
                                  {lead.phoneNumber}
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-4">
                            <h4 className="font-medium text-gray-900">
                              Course Information
                            </h4>
                            <div className="space-y-2">
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">
                                  Selected Course:
                                </span>{" "}
                                {lead.course.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">Cohort:</span>{" "}
                                {lead.cohort.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">
                                  Marketing Cycle:
                                </span>{" "}
                                {lead.marketingCycle.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">Registered:</span>{" "}
                                {new Date(lead.createdAt).toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="space-y-4 md:hidden">
        {filteredLeads.map((lead) => (
          <div key={lead.id} className="rounded-lg bg-white p-4 shadow">
            <button onClick={() => toggleRow(lead.id)} className="w-full">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 text-left">
                  <div className="mb-2 flex items-center gap-2">
                    <h6 className="font-semibold text-gray-900">
                      {lead.firstName} {lead.lastName}
                    </h6>
                    {isToday(lead.createdAt) && (
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800">
                        New
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5" />
                      <span className="break-all">{lead.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5" />
                      <span>{lead.phoneNumber}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {expandedRow === lead.id ? (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
            </button>

            {expandedRow === lead.id && (
              <div className="mt-4 space-y-3 border-t pt-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Course:</span>
                    <p className="text-gray-600">{lead.course.name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Cohort:</span>
                    <p className="text-gray-600">{lead.cohort.name}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Newsletter:
                    </span>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                        lead.joinNewsLetter
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {lead.joinNewsLetter ? "Yes" : "No"}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">
                      Registered:
                    </span>
                    <p className="text-gray-600">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-sm">
                  <span className="font-medium text-gray-700">
                    Marketing Cycle:
                  </span>
                  <p className="text-gray-600">{lead.marketingCycle.name}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
