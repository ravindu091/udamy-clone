export default function AuthLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="h-full flex items-center justify-center bg-sky-200">
        {children}
        <p className="text-2xl text-gray-600 absolute bottom-0 right-0 px-6 py-4`">Learn Sl</p>
      </div>
    );
  }