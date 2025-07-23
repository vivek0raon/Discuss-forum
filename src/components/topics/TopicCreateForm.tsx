"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { createTopics } from "@/actions/create-topic";
import { useActionState } from "react";

const TopicCreateForm = () => {
  const [formState, action] = useActionState(createTopics, { errors: {} });
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button className="p-2">New topic</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form action={action} className="grid gap-4">
            <DialogHeader>
              <DialogTitle>Create a Topic</DialogTitle>
              <DialogDescription>
                Write a new topic to start discussion. Click save when
                you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" />
              </div>
              {formState.errors.name && (
                <p className="text-sm text-red-600">{formState.errors.name}</p>
              )}
              <div className="grid gap-3">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" />
              </div>
              {formState.errors.description && (
                <p className="text-sm text-red-600">
                  {formState.errors.description}
                </p>
              )}

              {formState.errors.formError && (
                <div className="border border-red-600 bg-red-200 p-2 rounded">
                  {formState.errors.formError}
                </div>
              )}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default TopicCreateForm;
