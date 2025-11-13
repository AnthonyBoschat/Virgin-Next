import s from "./styles.module.scss"
import AppTitle from "./_components/Title";
import AppStatus from "./_components/Status";
import { initStatuses } from "./actions/status";
import { prisma } from "@/lib/prisma";
import AppAuth from "./_components/Auth";


export default async function Home() {


  await initStatuses();
  const statuses = await prisma.status.findMany();

  return (
    <div className={s.page}>
      <div className={s.container}>
        <div className={s.virgin}>
          <AppTitle/>
          <AppStatus statuses={statuses}/>
        </div>
        <div className={s.auth}>
          <AppAuth/>
        </div>
      </div>
    </div>
  );
}