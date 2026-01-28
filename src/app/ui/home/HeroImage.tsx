import { heroimage } from "@/app/page.module.css";

export default function HeroImage() {
  return (<div className={heroimage}>
    <img
      src="/images/hero-image.png"
      width="9"
      height="4"
    />
    <div><h1>About Us</h1></div>
  </div>)
}