"use client";
import { Button } from "@/components/ui/button";
import { IUser } from "@/types/users";
import { Edit, MoreHorizontal, Trash, Eye } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { removeUser } from "@/actions/users/users-actions";
import { useTranslations } from "next-intl";
import { AlertModal } from "@/components/modal/alert-modal";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import UserFormAction from "@/components/forms/users-forms/editUser";

interface CellActionProps {
  data: IUser;
  toBeVerified?: boolean;
}

export const CellAction: React.FC<CellActionProps> = ({ data, toBeVerified = false }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
   const t = useTranslations("tableActions");
  const {role} = useParams();
  const onConfirm = async () => {
    const res = await removeUser({id:data.id,revalidateData:`/dashboard/${role}`});
    if (res?.error) {
      toast({
        variant: "destructive",
        title:  t("deleteFailed"),
        description: res?.error,
      });
    }
    else {
      toast({
        variant: "default",
        title: t("deletedSuccessfully"),
      });
      router.refresh();
    }

    setLoading(false);
    setOpen(false);

  };
  return (
    <>
        <div className="flex flex-end grow" key={data.id}>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <div className="flex-end grow flex gap-1 justify-center items-center ">
        <UserFormAction user={data} id={data.id} readOnly={true}/>
        <Button
          disabled={loading}
          type="button"
          variant="destructive"
          size="icon"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
        <UserFormAction user={data} id={data.id} />
      </div>
    </div>
    </>
  );
};

