import { getIntroduction } from "@/lib/actions/introduction";
import IntroContent from "./intro-content";

export default async function Intro() {
  const introduction = await getIntroduction();
  return <IntroContent introduction={introduction} />;
}
