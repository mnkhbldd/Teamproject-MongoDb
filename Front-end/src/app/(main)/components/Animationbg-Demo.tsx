import { ThreeDCardDemo } from "./Card3d";

export const Animatedbg = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-800">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-black animate-gradient-shift"></div>

        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px, 80px 80px",
            animation: "movePattern 20s linear infinite",
          }}
        ></div>

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "100px 100px",
            animation: "moveGrid 30s linear infinite",
          }}
        ></div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/89 rounded-full animate-float-tiny"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/90 rounded-full animate-float-tiny-delayed"></div>
        <div className="absolute bottom-1/3 left-1/5 w-1 h-1 bg-white/70 rounded-full animate-float-tiny-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-white/79 rounded-full animate-float-tiny"></div>
        <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-white/49 rounded-full animate-float-tiny-delayed"></div>
        <div className="absolute top-3/4 right-1/6 w-1 h-1 bg-white/89 rounded-full animate-float-tiny-slow"></div>

        <div className="absolute top-1/5 right-1/5 w-2 h-2 bg-white/80 rounded-full animate-pulse-subtle"></div>
        <div className="absolute bottom-1/5 left-1/3 w-2 h-2 bg-white/60 rounded-full animate-pulse-subtle-delayed"></div>
        <div className="absolute top-2/3 right-2/3 w-2 h-2 bg-white/70 rounded-full animate-pulse-subtle"></div>

        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-slide-subtle"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent animate-slide-subtle-delayed"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center space-y-6 max-w-3xl">
          <ThreeDCardDemo />
        </div>
      </div>
    </div>
  );
};
