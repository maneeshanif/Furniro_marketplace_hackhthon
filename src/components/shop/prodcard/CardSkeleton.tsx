import { Skeleton } from "@/components/ui/skeleton"
const ProductCardSkeleton = () => (
  <div className='w-[285px] h-[446px] border-2 border-gray-200'>
    <Skeleton className="w-[285px] h-[301px]" />
    <div className='w-[285px] flex justify-center items-center h-[145px]'>
      <div className='w-[249px] flex flex-col justify-between h-[99px] space-y-2'>
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className='flex justify-between'>
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </div>
  </div>
);

export default ProductCardSkeleton