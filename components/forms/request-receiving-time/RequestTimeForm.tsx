"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card } from "@/components/ui/card";

import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import CustomTimePicker from "@/components/shared/timepicker/TimePicker";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useToast } from "@/components/ui/use-toast";
import { updateWorkTimes } from "@/actions/users/users-actions";

const WorkTimesInfoSchema = z.object({
  id: z.string().min(1, "id is required"),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
  is_active: z.boolean().optional(),
});
export type WorkTimesInfoFormValues = z.infer<typeof WorkTimesInfoSchema>;

interface DoctorFormProps {
  initialData?: WorkTimesInfoFormValues;
  day: any;
}

export const WorkTimesInfoForm: React.FC<DoctorFormProps> = ({
  initialData,
  day
}) => {
  const { toast } = useToast();
  const pathname = usePathname();
  const [currentLang] = useState(pathname?.includes("/ar") ? "ar" : "en");
  const t = useTranslations("pages.users");
  const tShared = useTranslations("shared");
  const [loading, setLoading] = useState(false);
  const action = tShared("save");
  const defaultValues = {
    ...initialData,
  };
  const form = useForm<WorkTimesInfoFormValues>({
    resolver: zodResolver(WorkTimesInfoSchema),
    defaultValues,
  });
  const {
    control,
    formState: { errors },
  } = form;


  const onSubmit = async (data: any) => {
    // alert(JSON.stringify(data)); //testing
    setLoading(true);
    const res = await updateWorkTimes({ data });
    if (res?.error) {
      toast({
        variant: "destructive",
        title: tShared("updatFailed"),
        description: res?.error,
      });
    } else {
      toast({
        variant: "default",
        title: tShared("updatedSuccessfully"),
      });
    }

    setLoading(false);
  };
  //show error messages
  // console.log(form.formState.errors);
  return (
    <Card
      className="px-0 mx-0 border-0 w-full shadow-none md:p-5 py-3"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <>
            {/* availablity */}
            <div className="flex flex-row flex-wrap space-x-5 gap-7 ">
              <div className="max-w-[10%] min-w-[6%] -my-2">
                <FormField
                  name={`is_active`}
                  control={control}
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>{day?.name}</FormLabel>
                      <FormControl>
                        <Switch
                           checked={field.value}
                           onCheckedChange={field.onChange}
                          dir="ltr"
                        />
                      </FormControl>
                      {errors.is_active && (
                        <FormMessage>{errors.is_active.message}</FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              {/* TimePicker */}
              {
                <div className="flex flex-wrap space-x-5 gap-4 -my-4.5">
                  <div>
                    <FormLabel className="max-w-30 mx-1">
                      {t("startTime")} <span className="text-red-800">*</span>
                    </FormLabel>
                    <CustomTimePicker
                      val={
                        form.getValues(`start_time`) ??
                        undefined
                      }
                      setval={(val) => {
                        form.clearErrors(`start_time`);
                        form.setValue("start_time",val );
                      }}
                    />
                  </div>
                  <div>
                    <FormLabel className="max-w-30 mx-1">
                      {t("endTime")} <span className="text-red-800">*</span>
                    </FormLabel>
                    <CustomTimePicker
                     val={
                      form.getValues(`end_time`) ??
                      undefined
                    }
                    setval={(val) => {
                      form.clearErrors(`end_time`);
                      form.setValue("end_time",val );
                    }}
                    />
                  </div>
                </div>
              }
          <Button disabled={loading} className="my-2.5" type="submit">
            {action}
          </Button>
            </div>

          </>
        </form>
      </Form>
    </Card>
  );
};
