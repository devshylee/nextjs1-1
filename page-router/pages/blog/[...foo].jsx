// export async function gtStaticProprs() {
//   const res = await fetch("https://api.github.com/repos/vercel/next.js");
//   const repo = await res.json();
//   return {
//     props: { repo },
//     revalidate: 60,
//   };
// }

import { useRouter } from "next/router";

// export default function foo({ repo }) {
//   return <>{repo}</>;
// }

export default function foo() {
  const router = useRouter();
  const { foo } = router.query;
  console.log({ foo });

  if (!foo) return null; // foo 값이 없을 때는 null 반환

  return (
    <>
      <h1>foo[1] : {foo[0]}</h1>
      <h1>foo[2] : {foo[1]}</h1>
      <h1>foo[3] : {foo[2]}</h1>
    </>
  );
}
