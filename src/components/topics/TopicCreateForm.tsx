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
          <Button className="w-full sm:w-auto text-sm sm:text-base">
            New Topic
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] mx-4 sm:mx-0">
          <form action={action} className="grid gap-4">
            <DialogHeader>
              <DialogTitle className="text-lg">Create a Topic</DialogTitle>
              <DialogDescription className="text-sm">
                Write a new topic to start discussion. Click save when
                you&apos;re done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name" className="text-sm">
                  Name
                </Label>
                <Input id="name" name="name" className="text-sm" />
              </div>
              {formState.errors.name && (
                <p className="text-xs sm:text-sm text-red-600">
                  {formState.errors.name}
                </p>
              )}
              <div className="grid gap-3">
                <Label htmlFor="description" className="text-sm">
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  className="text-sm min-h-[80px]"
                />
              </div>
              {formState.errors.description && (
                <p className="text-xs sm:text-sm text-red-600">
                  {formState.errors.description}
                </p>
              )}

              {formState.errors.formError && (
                <div className="border border-red-600 bg-red-200 p-2 rounded text-sm">
                  {formState.errors.formError}
                </div>
              )}
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <DialogClose asChild>
                <Button variant="outline" className="text-sm">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="text-sm">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default TopicCreateForm;
