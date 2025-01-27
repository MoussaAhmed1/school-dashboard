"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FileKey2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { DialogClose } from "@radix-ui/react-dialog";
import { use, useEffect, useMemo, useRef, useState } from "react";
import Select from "react-select";
import { useToast } from "@/components/ui/use-toast";
import { fetchUserGrades, postUserGrades } from "@/actions/users/users-actions";

interface IProps {
  user_id: string;
  options: { id: string; name: string }[];
}

export default function GradesForm({ user_id, options }: IProps) {
  const t = useTranslations("pages.users");
  const tShared = useTranslations("shared");
  const dialogTitle = t("updateGrades");
  const [grades_ids, setGrades_ids] = useState<string[]>([]);
  const [oldGrades_ids, setOldGrades_ids] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const action = tShared("saveChanges");
  const { toast } = useToast();
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const closeDailog = () => {
    if (closeRef.current) {
      closeRef.current.click();
    }
  };
  useEffect(() => {
    (async () => {
      const res: { id: string }[] = await fetchUserGrades(user_id);
      setOldGrades_ids(res?.map((grade) => grade.id));
      setGrades_ids(res?.map((grade) => grade.id));
    })();
  }, [user_id]);
  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (grades_ids?.length === 0) {
      toast({
        variant: "destructive",
        title: t("selectGrade"),
      });
      return;
    }
    // alert(JSON.stringify(grades_ids)); //testing
    const res = await postUserGrades(user_id, grades_ids);
    if (res?.error) {
      toast({
        variant: "destructive",
        title: tShared("updateFailed"),
        description: res?.error,
      });
    } else {
      toast({
        variant: "default",
        title: tShared("updatedSuccessfully"),
      });
    }
    setLoading(true);
    closeDailog();
    setLoading(false);
  };

  //premessions options
  const gradesOptions = useMemo(
    () =>
      options?.map((nav) => {
        return { label: nav?.name ?? "", value: nav.id };
      }),
    [],
  );

  return (
    <Dialog>
      <DialogTrigger value={"edit"}>
        <Button type="button" variant="outline" size="icon">
          <FileKey2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:min-w-[60%]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <label htmlFor="grade" className="font-medium text-sm">
            {t("grade")} <span className="text-red-800">*</span>
          </label>
          <div className="flex-col w-full">
            <Select
              id="grade"
              isSearchable={true}
              isClearable={false}
              isMulti
              defaultValue={grades_ids?.map((grade) =>
                gradesOptions.find((option) => option.value === grade),
              )}
              onChange={(values: any) => {
                setGrades_ids(values.map((val: any) => val.value));
              }}
              options={gradesOptions}
              closeMenuOnSelect={false}
              className="w-full"
              styles={{
                control: (state) =>
                  ({ ...state, backgroundColor: "transparent" }) as any,
                multiValueLabel: (styles: any) => ({
                  ...styles,
                  color: "#4D4D4D",
                  background: "#E6E6E6",
                }),
                option: (styles: any) => {
                  return {
                    ...styles,
                    // backgroundColor:"green",
                    color: "black",
                  };
                },
              }}
            />
          </div>
          <Button disabled={loading || oldGrades_ids?.join()===grades_ids?.join()} className="ml-auto" type="submit" >
            {action}
          </Button>
        </form>
        <DialogClose asChild className="hidden">
          <Button type="button" variant="secondary" ref={closeRef}>
            {t("close")}
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
