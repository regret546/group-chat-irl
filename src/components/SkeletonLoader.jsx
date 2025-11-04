import { motion } from 'framer-motion';

// Skeleton for navbar
export const NavbarSkeleton = () => (
  <div className="w-full grid place-items-center bg-dark">
    <nav className="flex justify-between items-center w-full md:w-[80%] px-[1rem] md:px-[2rem] py-[1.5rem]">
      <div className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] bg-gray-700 rounded animate-pulse" />
      <div className="hidden md:flex gap-8 items-center">
        <div className="flex gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-20 bg-gray-700 rounded animate-pulse" />
          ))}
        </div>
        <div className="h-10 w-24 bg-gray-700 rounded animate-pulse" />
      </div>
      <div className="md:hidden w-8 h-8 bg-gray-700 rounded animate-pulse" />
    </nav>
  </div>
);

// Skeleton for home section
export const HomeSectionSkeleton = () => (
  <section className="bg-primary grid place-items-center py-[1rem] md:py-[2rem]">
    <div className="flex-col md:flex-row md:flex justify-center p-[1rem] md:p-[2rem] pb-0 relative w-full md:w-[80%]">
      <div className="w-full md:w-1/2 flex pb-[2rem]">
        <div className="w-full md:w-[85%]">
          <div className="w-full h-64 bg-gray-300 rounded animate-pulse mb-4" />
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-4 bg-gray-300 rounded animate-pulse" style={{ width: `${Math.random() * 20 + 80}%` }} />
            ))}
          </div>
          <div className="h-12 w-32 bg-gray-300 rounded animate-pulse mt-4" />
        </div>
      </div>
      <div className="w-full md:w-1/2 flex justify-center md:justify-end">
        <div className="w-full h-64 md:h-96 max-w-[900px] bg-gray-300 rounded animate-pulse" />
      </div>
    </div>
  </section>
);

// Skeleton for latest episode section
export const LatestSectionSkeleton = () => (
  <section className="latest w-full grid justify-items-center min-h-[500px] bg-dark pb-[2rem] py-4">
    <div className="p-4 w-full md:w-[80%] grid justify-items-center gap-[2rem] md:gap-[3rem]">
      <div className="w-[180px] md:w-[200px] h-[45px] md:h-[50px] bg-gray-700 rounded animate-pulse" />
      
      {/* Mobile Layout Skeleton */}
      <div className="flex flex-col md:hidden gap-4 w-full items-center px-4">
        <div className="w-[280px] h-[280px] bg-gray-700 rounded animate-pulse" />
        <div className="h-6 w-3/4 bg-gray-700 rounded animate-pulse" />
        <div className="w-full space-y-3">
          <div className="h-2 bg-gray-700 rounded animate-pulse" />
          <div className="h-2 bg-gray-700 rounded animate-pulse" />
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse" />
          <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse" />
          <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Desktop Layout Skeleton */}
      <div className="hidden md:flex flex-col lg:flex-row gap-6 w-full items-start">
        <div className="w-full lg:w-[400px] h-[250px] lg:h-[300px] bg-gray-700 rounded animate-pulse flex-shrink-0" />
        <div className="w-full flex flex-col gap-4">
          <div className="h-8 w-3/4 bg-gray-700 rounded animate-pulse" />
          <div className="w-full space-y-3">
            <div className="h-2 bg-gray-700 rounded animate-pulse" />
            <div className="h-2 bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="flex items-center justify-center gap-6">
            <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse" />
            <div className="w-16 h-16 bg-gray-700 rounded-full animate-pulse" />
            <div className="w-12 h-12 bg-gray-700 rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Skeleton for previous episodes section
export const PreviousSectionSkeleton = () => (
  <section className="previous bg-primary grid justify-items-center p-4 pb-[3rem]">
    <div className="grid justify-items-center w-full md:w-[80%]">
      <div className="h-8 w-64 bg-gray-300 rounded animate-pulse mb-2" />
      <div className="h-10 w-80 bg-gray-300 rounded animate-pulse mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full mt-[2rem]">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-dark p-[1.5rem] md:p-[2rem] grid gap-4 justify-items-center">
            <div className="w-full h-48 bg-gray-700 rounded animate-pulse" />
            <div className="flex justify-between w-full">
              <div className="h-4 w-24 bg-gray-700 rounded animate-pulse" />
              <div className="h-4 w-16 bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="h-6 w-full bg-gray-700 rounded animate-pulse" />
            <div className="w-full h-12 bg-gray-700 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// Skeleton for reviews section
export const ReviewsSectionSkeleton = () => (
  <div className="bg-dark py-4 grid place-items-center px-4">
    <div className="h-12 w-80 bg-gray-700 rounded animate-pulse mb-8" />
    <div className="relative flex flex-col items-center justify-center h-[450px] md:h-[500px] w-full md:w-[80%]">
      <div className="w-[280px] md:w-[300px] h-[280px] md:h-[300px] bg-gray-700 rounded-md animate-pulse" />
      <div className="absolute bottom-6 flex gap-4 md:gap-6">
        <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse" />
        <div className="w-10 h-10 bg-gray-700 rounded-full animate-pulse" />
      </div>
    </div>
  </div>
);

// Skeleton for footer
export const FooterSkeleton = () => (
  <div className="bg-primary text-dark grid place-items-center">
    <div className="flex flex-col md:flex-row justify-evenly items-center w-full md:w-[80%] gap-6 md:gap-0 py-6 md:py-8">
      <div className="w-[100px] md:w-[150px] h-[100px] md:h-[150px] bg-gray-300 rounded animate-pulse" />
      <div className="grid gap-2 text-center md:text-left">
        <div className="h-6 w-24 bg-gray-300 rounded animate-pulse mb-2" />
        <div className="flex gap-4 justify-center md:justify-start">
          <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
          <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
        </div>
      </div>
      <div className="text-center md:text-left">
        <div className="h-6 w-20 bg-gray-300 rounded animate-pulse mb-2" />
        <div className="space-y-2">
          <div className="h-4 w-16 bg-gray-300 rounded animate-pulse" />
          <div className="h-4 w-20 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>
    </div>
    <div className="bg-dark w-full grid place-items-center py-4">
      <div className="h-4 w-64 bg-gray-700 rounded animate-pulse" />
    </div>
  </div>
);

// Main skeleton loader for homepage
export const HomePageSkeleton = () => (
  <div className="h-screen w-full overflow-x-hidden">
    <NavbarSkeleton />
    <HomeSectionSkeleton />
    <LatestSectionSkeleton />
    <PreviousSectionSkeleton />
    <ReviewsSectionSkeleton />
    <FooterSkeleton />
  </div>
);

