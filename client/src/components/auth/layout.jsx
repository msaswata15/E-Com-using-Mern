import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div
        className="hidden lg:flex items-center justify-center w-1/2 px-12 bg-cover bg-right bg-no-repeat"
        style={{
          backgroundImage: "url('https://img.freepik.com/free-photo/this-is-same-shoes_329181-1769.jpg')",
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backgroundBlendMode: 'overlay',
          backdropFilter: 'blur(4px)', // Blur effect for a subtle backdrop
        }}
      >
        <div className="max-w-md space-y-8 text-center text-white">
          <h1 className="text-6xl font-extrabold tracking-tight leading-snug">
            Welcome to eCommExpress
          </h1>
          
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-6 py-12 sm:px-8 lg:px-12">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
