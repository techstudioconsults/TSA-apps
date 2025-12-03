"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Input,
  Textarea,
  Label,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@workspace/ui/components";
import { CustomButton, Wrapper } from "@workspace/ui/lib";
import { toast } from "sonner";
import {
  useCourseByIdQuery,
  useUpdateCourseMutation,
} from "@/lib/react-query/courses";

type FormState = {
  title: string;
  description: string;
  durationWeeks: string;
  level: string;
  price: string;
};

export default function EditCoursePage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id") || "";

  const { data, isLoading } = useCourseByIdQuery(id, { enabled: !!id });
  const { mutateAsync, isPending } = useUpdateCourseMutation(id);

  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    durationWeeks: "",
    level: "beginner",
    price: "",
  });

  useEffect(() => {
    if (data) {
      setForm({
        title: (data as any).title ?? "",
        description: (data as any).description ?? "",
        durationWeeks: String((data as any).durationWeeks ?? ""),
        level: (data as any).level ?? "beginner",
        price: String((data as any).price ?? ""),
      });
    }
  }, [data]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await mutateAsync({
        title: form.title.trim(),
        description: form.description.trim(),
        durationWeeks: Number(form.durationWeeks) || 0,
        level: form.level,
        price: Number(form.price) || 0,
      } as any);
      toast.success("Course updated successfully");
      router.push("/courses");
    } catch (err) {
      toast.error("Failed to update course");
    }
  };

  const update = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  if (!id) {
    return (
      <Wrapper className="max-w-3xl py-6">
        <Card>
          <CardHeader>
            <CardTitle>Missing course id</CardTitle>
          </CardHeader>
          <CardContent>
            Provide an `id` in the query string, e.g. /courses/edit?id=123
          </CardContent>
          <CardFooter>
            <CustomButton variant="secondary" href="/courses">
              Back to Courses
            </CustomButton>
          </CardFooter>
        </Card>
      </Wrapper>
    );
  }

  return (
    <Wrapper className="max-w-3xl py-6">
      <form onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Edit Course</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="text-sm text-muted-foreground">Loading...</div>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => update("title", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => update("description", e.target.value)}
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="durationWeeks">Duration (weeks)</Label>
                    <Input
                      id="durationWeeks"
                      type="number"
                      min={0}
                      value={form.durationWeeks}
                      onChange={(e) => update("durationWeeks", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Level</Label>
                    <Select
                      value={form.level}
                      onValueChange={(val) => update("level", val)}
                    >
                      <SelectTrigger>
                        <Input readOnly value={form.level} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      min={0}
                      step={0.01}
                      value={form.price}
                      onChange={(e) => update("price", e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <CustomButton
              type="button"
              variant="secondary"
              onClick={() => router.push("/courses")}
            >
              Cancel
            </CustomButton>
            <CustomButton type="submit" variant="primary" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </CustomButton>
          </CardFooter>
        </Card>
      </form>
    </Wrapper>
  );
}
import React from "react";

const EditCourses = () => {
  return <div>EditCourses</div>;
};

export default EditCourses;
