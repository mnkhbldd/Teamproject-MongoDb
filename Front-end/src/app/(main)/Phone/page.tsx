import { BackgroundBeamsWithCollision } from "@/components/background-beams-with-collision";
import { Gsap } from "@/components/Gsap";
import { TextGenerateEffect } from "@/components/text-generate-effect";

const Phone = () => {
  return (
    <div className="w-screen h-full bg-slate-900">
      <BackgroundBeamsWithCollision>
        <div className="flex flex-col items-center">
          <div className="w-full h-full flex items-center justify-center">
            <Gsap />
          </div>
        </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
};

export default Phone;
