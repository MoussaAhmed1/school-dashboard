import { redirect } from "next/navigation";

export default async function page({ params }: { params: { lang: string } }) {
  redirect(`/${params.lang}/dashboard/pending-requests`)
}
