import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <div className="bg-gradient-to-tr from-blue-700 to-oragn-200 relative h-screen">


    <div className="absolute inset-0 flex flex-col justify-center items-center w-5/6 max-w-lg mx-auto text-center">
      
      
        <div className="space-y-8">
          <h1 className="font-primary font-extrabold text-white text-3xl sm:text-4xl md:text-5xl md:leading-tight">
          JARURAT CARE
          <span className="text-palette-primary">
            </span>
          </h1>
          <p className="font-secondary text-palette-light text-base md:text-lg lg:text-xl">
          Providing support, guidance, hope and personalized care for cancer patients and their families. Here to ensure you never face your journey alone.          </p>
        </div>
  
    </div>
  </div>
    );
}
