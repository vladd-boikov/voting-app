import {ContestantList} from "@/src/components/ContestantList/ContestantList";
import {contestants} from "@/src/utils/constants";
import {Header} from "@/src/components/Header/Header";
import {simulateDelay} from "@/src/utils/helpers";

export default async function Home() {
    await simulateDelay(1000)

  return (
      <main className="px-8 pb-8">
          <Header/>
          <ContestantList contestants={contestants}/>
      </main>
  );
}
