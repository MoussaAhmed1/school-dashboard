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
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../../../ui/use-toast";
import { Card } from "@/components/ui/card";
import UserSchema from "./userSchema";

import { toFormData } from "axios";
import AvatarPreview from "@/components/shared/AvatarPreview";
import { AddSecurity } from "@/actions/users/users-actions";
import { useTranslations } from "next-intl";
import { IUser, Role } from "@/types/users";
export type UserFormValues = z.infer<typeof UserSchema>;

interface UserFormProps {
  initialData?: UserFormValues;
  id?: string;
}

export const UserForm: React.FC<UserFormProps> = ({
  initialData,
  id,
}) => {
  const pathname = usePathname();
  const [currentLang] = useState(pathname?.includes("/ar") ? "ar" : "en");
  const t = useTranslations("pages.users");
  const tShared = useTranslations('shared');
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);



  const action = initialData ? tShared("saveChanges") : tShared("create");
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(undefined);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedAvatar(URL?.createObjectURL(file));
    }
  };
  const form = useForm<UserFormValues>({
    resolver: zodResolver(UserSchema),
    // defaultValues: initialData ? defaultValues : undefined,
  });
  const { control, formState: { errors } } = form;

  useEffect(() => {
    form.setValue("role", "SECURITY");
  }, [form]);


  const onSubmit = async (data: UserFormValues) => {
    // alert(JSON.stringify(data)); //testing
    setLoading(true);
    const formData = new FormData();
    toFormData(data, formData);
    const res = await AddSecurity(formData, "security");

    if (res?.error) {
      toast({
        variant: "destructive",
        title: initialData ? tShared("updateFailed") : tShared("addFailed"),
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: initialData ? tShared("updatedSuccessfully") : tShared("addedSuccessfully"),
        description: t(`profileAddedSuccessfully`),
      });
      //TODO: redirect to dashboard
      router.push(`/dashboard/security`);
    }

    setLoading(false);
  };
  // show error messages
  // console.log(form.formState.errors);

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={t("addSecurity")} />
      </div>

      <Card className="p-10 mx-0 border-0" style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }} >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <AvatarPreview selectedAvatar={selectedAvatar} />
            <div className="md:grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("fullName")} <span className="text-red-800">*</span></FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder={t("fullName")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Gender */}
              <FormField name="gender" control={control} render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("gender")}</FormLabel>
                  <FormControl>
                    <ShadcnSelect  {...field} onValueChange={field.onChange} dir={currentLang === "ar" ? "rtl" : "ltr"}>
                      <SelectTrigger>
                        <SelectValue placeholder={t("selectGender")} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">{t("male")}</SelectItem>
                        <SelectItem value="female">{t("female")}</SelectItem>
                      </SelectContent>
                    </ShadcnSelect>
                  </FormControl>
                  {errors.gender && <FormMessage>{errors.gender.message}</FormMessage>}
                </FormItem>
              )} />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("phone")} <span className="text-red-800">*</span></FormLabel>
                    <FormControl>
                      <Input dir={"ltr"} disabled={loading} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Avatar */}
              <FormItem
                style={{
                  margin: "-2px 0",
                }}
              >
                <FormLabel className="max-w-30 mx-1">{t("avatar")} <span className="text-red-800">*</span></FormLabel>
                <Controller
                  name="avatarFile"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="file"
                      accept="image/*"
                      multiple={false}
                      onChange={(e) => {
                        field.onChange(e.target.files ? e.target.files[0] : null);
                        handleAvatarChange(e);
                      }}
                    />
                  )}
                />

                {errors?.avatarFile?.message && <FormMessage style={{ marginLeft: "5px" }}>{errors?.avatarFile?.message as any}</FormMessage>}
              </FormItem>
            </div>
            <div className="md:grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")} <span className="text-red-800">*</span></FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder={t("email")}
                        {...field}
                        type="email"
                        required
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("password")} <span className="text-red-800">*</span></FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder={t("password")}
                        type="password"
                        required
                        {...field}
                        autoComplete="new-password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading} className="ml-auto" type="submit">
              {action}
            </Button>
          </form>
        </Form>
      </Card>
    </>
  );
};
