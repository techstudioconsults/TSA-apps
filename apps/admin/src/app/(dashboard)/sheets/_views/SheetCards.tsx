"use client";

import { Icons } from "@workspace/ui/icons";
import { CustomButton, EmptyState, ErrorEmptyState } from "@workspace/ui/lib";
import { Calendar } from "lucide-react";
import { useSheetsQuery } from "@/services/sheets/sheet.queries";
import { formatDate } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@workspace/ui/components";

// Function to format the date

const SheetCards = () => {
  const { data: sheetData, isLoading, error, refetch } = useSheetsQuery({});

  const sheets = sheetData?.data.items || [];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 2xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card
            key={i}
            className="animate-pulse flex flex-col justify-between min-h-[274px] border-none shadow-none"
          >
            <CardHeader>
              <div className="h-4 w-1/2 rounded bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 w-full rounded bg-muted" />
                <div className="size-3/4 rounded bg-muted" />
                <div className="h-3 w-2/4 rounded bg-muted" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-4">
              <div className="h-8 w-24 rounded bg-muted" />
              <div className="h-8 w-24 rounded bg-muted" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <ErrorEmptyState onRetry={refetch} />;
  }

  if (sheets.length === 0) {
    return (
      <EmptyState
        icon={
          <Icons.empty className="size-10 p-1.5 bg-primary/10 rounded-md text-primary" />
        }
        title="Sheets not found"
        description={"No sheets available."}
        className="bg-background"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sheets.map((sheet) => (
        <div
          key={sheet.id}
          className="group relative overflow-hidden rounded-xl p-6 shadow"
        >
          {/* Decorative gradient overlay */}
          {/* <div className='absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-full blur-3xl -z-0 group-hover:scale-150 transition-transform duration-500' /> */}

          <div className="relative z-10">
            {/* Header */}
            <div className="mb-4 flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800">
                    {sheet.month} {sheet.year}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-900 transition-colors line-clamp-2">
                  {sheet.title}
                </h3>
              </div>
              <CustomButton
                icon={
                  <Icons.ellipsis className="h-5 w-5 text-gray-600 hover:text-indigo-900" />
                }
                size="icon"
                className=""
                isIconOnly
              />
            </div>

            {/* Metadata */}
            <div className="space-y-3 mb-5">
              <div className="flex items-center gap-2 text-gray-600">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                  <Calendar className="h-4 w-4 text-indigo-600" />
                </div>
                <span className="text-sm font-medium">
                  Created {formatDate(sheet.createdAt, `MMM dd, yyyy`)}
                </span>
              </div>

              {/* <div className='flex items-center gap-2 text-gray-600'>
                <div className='flex items-center justify-center w-8 h-8 rounded-lg bg-purple-50 group-hover:bg-purple-100 transition-colors'>
                  <User className='h-4 w-4 text-purple-600' />
                </div>
                <span className='text-sm font-medium'>Admin</span>
              </div> */}
            </div>

            {/* Action Button */}
            <a
              href={sheet.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <CustomButton
                isRightIconVisible
                icon={<Icons.arrowRight className="h-4 w-4" />}
                className="w-full"
                variant="primary"
              >
                View Sheet
              </CustomButton>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SheetCards;
