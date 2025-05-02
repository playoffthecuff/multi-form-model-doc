"use client"

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function TestForm() {
  const form = useForm();

	return <Form {...form}>
    <form>
      
    </form>
  </Form>;
}
