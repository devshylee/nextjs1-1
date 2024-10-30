import Image from "next/image";
import foo from "/public/images/test1.png";

export default function About() {
  return (
    <>
      <h1>About</h1>
      <h3>About...</h3>
      <Image
        src="/images/test2.png"
        alt="lighthouse"
        width={300}
        height={200}
      ></Image>

      <Image src={foo} alt="lighthouse" width={300} height={200}></Image>

      <Image
        src="https://cdn.pixabay.com/photo/2024/04/18/10/04/lock-8704819_640.jpg"
        alt="lighthouse"
        width={600}
        height={300}
      ></Image>
      <Image
        src="https://cdn.pixabay.com/photo/2024/04/18/10/04/lock-8704819_1280.jpg"
        alt="lighthouse"
        width={600}
        height={300}
      ></Image>
    </>
  );
}
