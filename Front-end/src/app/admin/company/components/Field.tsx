import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Control } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./formSchema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Field = ({
  control,
  name,
  LabelName,
  inputType,
  isFileInput = false,
}: {
  control: Control<z.infer<typeof formSchema>>;
  name: keyof z.infer<typeof formSchema>;
  LabelName: string;
  inputType?: boolean;
  isFileInput?: boolean;
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value, ref, ...field } }) => (
        <FormItem className="flex-col flex items-start w-full">
          <FormLabel className="text-[#e3e8ffe6]">{LabelName}</FormLabel>
          <FormControl>
            {isFileInput ? (
              <Input
                type="file"
                onChange={(e) => {
                  onChange(e.target.files);
                }}
                onBlur={onBlur}
                ref={ref}
                className="text-white file:text-white file:bg-blue-600 file:border-0 file:rounded-md file:px-4 file:py-2"
              />
            ) : inputType ? (
              <Input
                className={`text-white focus-visible:ring-0 ${
                  value?.length >= 2 &&
                  "focus-visible:border-[#18BA51] border-solid border border-[#e3e8ffe6]"
                }`}
                type="text"
                placeholder="Enter your name here"
                value={value as string}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                {...field}
              />
            ) : (
              <Textarea
                className={`text-white focus-visible:ring-0 ${
                  value?.length >= 2 &&
                  "focus-visible:border-[#18BA51] border-solid border border-[#e3e8ffe6]"
                }`}
                placeholder="Enter your name here"
                value={value as string}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                {...field}
              />
            )}
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
