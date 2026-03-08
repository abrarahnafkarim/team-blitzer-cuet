import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PurpleCardDemo() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Stitch Example Card</CardTitle>
        <CardDescription>
          A simple card to demonstrate the purple button integration.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          This is an example React component. Imagine this was AI-generated via
          the Google Stitch design agent and imported into your codebase!
        </p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button className="bg-purple-600 hover:bg-purple-700 text-white">
          Purple Action
        </Button>
      </CardFooter>
    </Card>
  );
}
