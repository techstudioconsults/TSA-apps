"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { useCreateCourseMutation } from "@/lib/react-query/courses";

type FormState = {
  title: string;
  description: string;
  durationWeeks: string;
  level: string;
  price: string;
};

export default function CreateCoursePage() {
  const router = useRouter();
  const { mutateAsync: createCourse, isPending } = useCreateCourseMutation();

  const [form, setForm] = useState<FormState>({
    title: "",
    description: "",
    durationWeeks: "",
    level: "beginner",
    price: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createCourse({
        title: form.title.trim(),
        description: form.description.trim(),
        durationWeeks: Number(form.durationWeeks) || 0,
        level: form.level,
        price: Number(form.price) || 0,
      });
      toast.success("Course created successfully");
      router.push("/courses");
    } catch (err) {
      toast.error("Failed to create course");
    }
  };

  const update = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <Wrapper className="max-w-3xl py-6">
      <form onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Create Course</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g., Full-Stack Engineering"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Brief course overview"
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
                  placeholder="12"
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
                    <SelectItem value="intermediate">Intermediate</SelectItem>
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
                  placeholder="500"
                />
              </div>
            </div>
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
              {isPending ? "Creating..." : "Create Course"}
            </CustomButton>
          </CardFooter>
        </Card>
      </form>
    </Wrapper>
  );
}
