import Link from "next/link";

export default function NavBar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/about">about</Link>
      <Link href="/blog">blog</Link>
      <Link href="/blog">slug</Link>
      <Link href="/rest-api">axios</Link>
      <Link href="/temp">temp</Link>
    </nav>
  );
}
