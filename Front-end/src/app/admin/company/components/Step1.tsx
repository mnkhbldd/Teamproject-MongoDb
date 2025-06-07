import React from "react";
import { Field } from "./Field";
import { Control } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./formSchema";

export const Step1 = ({ control }: { control: Control<z.infer<typeof formSchema>> }) => {
  return (
    <div className=" flex flex-col w-full gap-2">
      <Field
        inputType={true}
        name="name"
        LabelName="Company name"
        control={control}
      />
      <Field
        inputType={false}
        name="description"
        LabelName="description"
        control={control}
      />
      <div className=" flex gap-2">
        <Field
          inputType={true}
          name="phoneNumber"
          LabelName="Phone number"
          control={control}
        />
        <Field
          inputType={true}
          name="website"
          LabelName="Social media URL"
          control={control}
        />
      </div>
      <div className="flex gap-2">
        <Field
          inputType={true}
          name="instagram"
          LabelName="Instagram"
          control={control}
        />
        <Field
          inputType={true}
          name="Facebook"
          LabelName="Facebook"
          control={control}
        />
      </div>
    </div>
  );
};
